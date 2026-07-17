# Fluxline Ecosystem — Integration Architecture (v1)

> Canonical copy. The same document ships in all four repos:
> `fluxline-pro-next` (fluxline.pro) · `fluxline-pro-cms` (cms.fluxline.pro) ·
> `fluxline-pro-storefront-app` (store.fluxline.pro) ·
> `fluxline-pro-user-account` (account.fluxline.pro).

## 1. System boundaries

| System | Host | Role | Backend |
| --- | --- | --- | --- |
| **Fluxline.pro** | fluxline.pro | Public site, marketing, identity surface | Azure Functions (classic model, `api/`) via SWA |
| **CMS** | cms.fluxline.pro | Courses, lessons, how-to guides, dashboard, achievements | Azure Functions (classic model, `api/`) via SWA |
| **Storefront** | store.fluxline.pro | Catalog, checkout, entitlements, fulfillment | Next.js API routes (hybrid SWA) — the only Stripe owner |
| **Account** | account.fluxline.pro | Identity hub: profile, settings, progress, achievements, subscription | Azure Functions (classic model, `api/`) via SWA |
| **Sanity** | (content lake) | Source of truth for editorial content: courses, lessons, guides, product copy | — |
| **Azure Table Storage** | one shared storage account per env (TEST / PROD) | Relationships + operational state (see §3) | — |
| **Entra External ID** | one tenant, one shared app registration | Sign-in (Microsoft / Google / LinkedIn) + API tokens | — |

Every cross-system call is an HTTPS call to a Functions/API endpoint with a
Bearer token. No app reads another app's private storage except through the
documented shared tables (§3).

## 2. Identity

- **One Entra External ID app registration** shared by all four apps → true
  SSO via the Entra session cookie.
- The registration exposes the API scope **`api://fluxline-identity`**. All
  frontends acquire access tokens with scope
  `api://fluxline-identity/.default`; `openid profile email` are login scopes
  only and are NOT valid for API calls.
- **`oid` is the universal user key.** It is stable across app registrations;
  `sub` is pairwise and must not be used as a storage key. Backends accept
  `oid` with `sub` as a last-resort fallback.
- Every backend validates tokens the same way: RS256 signature via the tenant
  JWKS, issuer + audience checks. Shared env contract:
  - `ENTRA_TENANT_ID` (required)
  - `ENTRA_API_AUDIENCE` (default `api://fluxline-identity`, comma-separated
    list allowed)
  - `ENTRA_ISSUER`, `ENTRA_JWKS_URI` (CIAM overrides, e.g.
    `https://<tenant>.ciamlogin.com/<tenantId>/v2.0` and
    `https://<tenant>.ciamlogin.com/<tenantId>/discovery/v2.0/keys`)
  - Storefront also accepts its legacy `EXTERNAL_ID_TENANT_ID` /
    `EXTERNAL_ID_CLIENT_ID` as fallbacks.
- **Cross-subdomain login hint:** account.fluxline.pro writes the non-secret
  `fluxline_auth_status` cookie on `.fluxline.pro` (display name, expiry —
  never a token). Sibling apps use it to decide whether to attempt MSAL
  `ssoSilent` and to render signed-in UI hints. It is not a security boundary.
- Tokens are NEVER passed through `localStorage` across origins (that never
  worked — localStorage is per-origin). Each app acquires its own token via
  MSAL against the shared registration.

## 3. Data layers

**Sanity — content source of truth.** Courses, lessons, how-to guides,
product marketing copy. Everything else references Sanity documents by
`slug` / `_id` (`contentRef`), never copies content.

**Azure Table Storage — relationships + operational state** (one shared
storage account per environment; `AZURE_STORAGE_CONNECTION_STRING` in the
classic Functions apps, `STORAGE_ACCOUNT_NAME`/`KEY` in the storefront):

| Table | PK / RK | Owner (writes) | Readers |
| --- | --- | --- | --- |
| `Users` | oid / `profile` | account | account |
| `UserSettings` | oid / `settings` | account | account |
| `Progress` | oid / `progress` | account | account, cms |
| `Achievements` | oid / `achievements` | account | account, cms |
| `UserIdentitySnapshot` | oid / `snapshot` | account | account |
| `Entitlements` | oid / itemId | **storefront** (Stripe fulfillment) | all apps |
| `Orders` | oid / Stripe session id | **storefront** | storefront, account |
| `Events` | oid / reverse-ticks+uuid | all apps (best-effort) | account (activity feed, debugging) |

Entitlement rows carry `ContentRef` (JSON: `{kind, slug, sanityDocumentId}`)
so the CMS can gate content without a catalog copy.

**Cosmos DB — phase 2.** The blueprint reserves Cosmos for user↔content
relationship queries at scale ("which users can access course X"). No Cosmos
account exists in the current environment, so v1 keeps relationships in Table
Storage behind the store modules (`entitlementsStore`, progress/achievements
handlers). Migration path (§8): stand up Cosmos (serverless), containers
`users` (pk `/userId`) and `relationships` (pk `/userId`, docs
`{userId, kind: 'entitlement'|'courseProgress'|'achievement', refId, ...}`),
dual-write from the same store modules, backfill from Tables, then flip reads.
The API contracts do not change.

## 4. API surface (v1)

All request/response bodies validate against the shared contracts
(`lib/contracts.js` in the classic Functions apps,
`src/lib/contracts/index.ts` in the storefront):
`User · AccountProfile · Entitlement · CatalogItem · Order · CheckoutSession ·
Course · Lesson · Achievement · ProgressRecord · IntegrationEvent`.

### account.fluxline.pro/api — user-data hub (CORS-open to all Fluxline origins)
| Endpoint | Methods | Notes |
| --- | --- | --- |
| `/api/profile`, `/api/profile-avatar`, `/api/profile-social` | GET/PUT, POST, GET | existing; PUT validated |
| `/api/settings` | GET/PUT | PUT strict-validated (mass-assignment fixed) |
| `/api/progress` | GET/PUT | PUT validated; emits `progress.updated` |
| `/api/achievements` | GET/**POST** | POST unlocks one achievement (idempotent); emits `achievement.unlocked` — this is the CMS→Account sync path |
| `/api/entitlements` | GET | **new** — full entitlement list (contract shape) |
| `/api/purchases` | GET | **new** — order history from `Orders` |
| `/api/subscription` | GET | existing single-plan summary |
| `/api/auth-status`, `/api/auth-session`, `/api/identity-snapshot`, `/api/delete-account` | — | existing; delete emits `account.deleted` |

### store.fluxline.pro/api — commerce (owns Stripe)
| Endpoint | Methods | Notes |
| --- | --- | --- |
| `/api/stripe/create-checkout-session` | POST | zod-validated body; `userId` = **oid**; emits `checkout.session_created` |
| `/api/stripe/create-portal-session` | POST | unchanged |
| `/api/stripe/webhook` | POST | fulfillment writes Entitlements/Orders keyed by oid, stamps `ContentRef`, emits `entitlement.granted/revoked`, `order.recorded` |
| `/api/entitlements`, `/api/orders` | GET | keyed by oid |

### cms.fluxline.pro/api — content gate
| Endpoint | Methods | Notes |
| --- | --- | --- |
| `/api/entitlements` | GET | **new** — user's entitlements (shared table read) |
| `/api/content-access` | GET | **new** — `?kind=course&slug=x` (or `sanityDocumentId`/`itemId`) → `{allowed, reason}` server-side gate for `requiresAuth` content |
| existing contact / youtube / auth gate / ping | — | unchanged |

CMS reads/writes **progress & achievements via the account API**
(cross-origin, already CORS-allow-listed) — single owner, no duplicated write
paths.

### fluxline.pro/api — public site
| Endpoint | Methods | Notes |
| --- | --- | --- |
| `/api/entitlements` | GET | **new** — same shared read module; enables gated content/deep personalization on the main site |
| existing 14 functions | — | unchanged |

## 5. Integration flows

- **Fluxline.pro → Account:** shared Entra SSO; `fluxline_auth_status` cookie
  for UI hints; `GET account/api/auth-status` for cross-origin login checks;
  `GET /api/entitlements` (local or account) for entitlement lookups.
- **Account → Storefront:** `GET /api/purchases` + `/api/entitlements` read
  storefront-owned tables; subscription management deep-links to
  `store.fluxline.pro` (no Stripe secrets outside the storefront).
- **Storefront → CMS:** fulfillment writes `Entitlements` rows with
  `ContentRef`; the CMS's `content-access` endpoint turns those rows into
  course/lesson unlocks. Achievement trigger on purchase = storefront POST to
  `account/api/achievements` (server-to-server, phase 1.1) or CMS-side on
  first access (v1).
- **CMS → Account:** lesson completion → `PUT account/api/progress`;
  achievement earned → `POST account/api/achievements`; both emit events that
  power streaks/activity.

## 6. Engineering standards

- Contracts validated with **zod** at every write boundary; branching with
  **ts-pattern** where TypeScript (storefront); `async/await` everywhere;
  typed `fetch` clients; official `stripe` SDK only in the storefront;
  `@azure/data-tables` (+ `@azure/identity` when moving off connection
  strings).
- Unified error handling: 401 (AuthError) / 400 (contract violation, with
  zod issues) / 404 / 405 / 500; never leak internals; CORS headers on every
  response including errors.
- Consistent logging via `context.log` / route logger; no secrets in logs.
- Env-var safety: every function validates required config before use and
  fails with 500, not undefined behavior.
- No UI redesign: DSM primitives only; frontend changes limited to auth/API
  plumbing.

## 7. Testing strategy

- **Unit:** token validation (JWKS mocked), contracts (accept/reject),
  entitlement access rule, event row shape, fulfillment mapping (oid +
  ContentRef). Run in each repo's existing test runner.
- **Integration (local):** Azurite tables + `func start`/`next dev`; seeded
  entitlement fixtures; golden-path checkout via Stripe CLI webhooks to the
  storefront route.
- **Cross-system (TEST env):** sign in on account-test → buy on test-store
  (Stripe test mode) → verify `Entitlements` row (oid, ContentRef) → CMS
  `content-access` allows → lesson completion PUTs progress → account
  dashboard reflects it. Automate later as a Playwright suite in
  fluxline-pro-user-account.
- **Contract drift guard:** shared contract files are byte-identical across
  repos; a CI check (or the ecosystem doc) flags divergence.

## 8. Rollout plan

1. **TEST env config:** set `ENTRA_*` + storage app settings on all four SWAs;
   confirm the shared app registration exposes `api://fluxline-identity` and
   each SPA client is authorized for it.
2. **Deploy account app** (fixed validateToken) → verify profile/settings/
   progress endpoints with a real token.
3. **Deploy storefront** (oid keying + ContentRef + events) → test checkout →
   verify Entitlements/Orders/Events rows.
4. **Deploy CMS** (entitlements + content-access) → verify gating against the
   purchased items; wire dashboard to live progress (frontend phase).
5. **Deploy fluxline.pro** (entitlements endpoint; no user-facing change).
6. Promote test → main/master per repo once the §7 cross-system pass is green.
7. **Data migration:** none — no production users exist yet. If any test rows
   are keyed by `sub`, delete them (storefront re-grants on next webhook
   replay) rather than migrating.
8. **Phase 2:** Cosmos relationship store (§3), Sanity-driven storefront
   catalog (Sanity ID → CatalogItem), storefront MSAL polish, blob-backed
   avatars, IngramSpark live API.
