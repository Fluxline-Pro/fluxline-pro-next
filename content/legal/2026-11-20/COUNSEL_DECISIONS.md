# Counsel Decisions Log (internal, never published)

Record of how each counsel answer was applied to the v2 masters. Effective date for all documents: November 20, 2026.

## Q1: "Not stored" short form
- Source: counsel answer (Q1_Answer.md), FTC Section 5 net-impression analysis.
- Consent statement 1 (RAI §5), verbatim: "Fluxline does not retain your prompts or answers. Our AI provider, Microsoft Azure, keeps temporary automated abuse-detection logs (up to 30 days) under its policy; see our Privacy Policy."
- Long form aligned (owner choice): Terms 9.8, Preorder 7.8, Privacy short version, Privacy §2, §3.4, §5.1 step 7, §5.6, RAI 3.1, RAI §4.
- Privacy 5.6 status: not yet applied for Modified Abuse Monitoring (owner, Nov 13, 2026).
- Not added (owner choice): "Fluxline does not access these logs except as required to investigate reported abuse."
- Rejected by counsel: any "cannot control what Azure stores" framing.

## Q2: Age gate and Utah Social Media Regulation Act
- Counsel: checkbox attestation without DOB is adequate for the store; Utah SMRA likely out of scope (not a social media platform).
- Applied: Terms 2.2 now opens with a purchase-or-account representation of 18+. Preorder 4.3 adds "By placing a preorder, you represent that you are 18 or older."
- Storage (owner): account yes flag and date stay (Companion fails closed on it). Guest checkout checkbox is not separately recorded.
- Open item (operational, not in documents): counsel recommends adding age assurance (vendor or age-bracket signal) before app-store distribution and California exposure grow (Utah App Store Accountability Act; California AADC as amended by AB 1043, effective January 1, 2027). Revisit before the March 2027 app launch.

## Q3: First-Year Pass start rollover (Preorder 7.2)
- Counsel: customer-favorable rollover is defensible; define the trigger per pass holder.
- Applied: trigger is "the date we first make the Companion available for your use in your account."
- Removed (owner): the retroactivity sentence. Terms are effective November 20, 2026, the day preorders open, so no pass predates the clause and no separate notice is needed.
- Noted, not changed: counsel asked whether a pass holder may prefer a refund over a delayed start. The whole-order refund rules in Preorder 5 govern.

## Q4: U.S. territories and APO/FPO for the Companion
- Applied: "United States" = 50 states, DC, Puerto Rico, U.S. Virgin Islands, Guam, American Samoa, Northern Mariana Islands. APO, FPO and DPO addresses excluded (owner: ambiguous, no street address). International excluded until the 2027 EU decisions.
- Non-U.S. buyer of a bundle with the pass: checkout blocks it. Moving abroad: Companion unavailable while outside the U.S.; moving alone is not a refund ground. U.S.-only limit shown next to the price (Companion products and the RCF Founders Pass).
- Utah AI disclosure (owner): Terms 9.1 and RAI 3.1 now state the Companion uses generative AI and every chat says so.
- Code items (Phase 2): storefront NEXT_PUBLIC_ALLOWED_BILLING_COUNTRIES="US,PR,VI,GU,AS,MP" in every environment; reject APO/FPO/DPO (state AA/AE/AP) for Companion items; enforce the U.S. rule in the backend (checkout/webhook), not only the UI; add the "This uses generative AI" notice to the Companion chat UI.
- Moved to Q13 (owner): file "Fluxline" as a DBA of the LLC with the Utah Division of Corporations; USPTO filing for "Fluxline" when funded.

## Q8: Retention
- Orders 7 years; download records 7 years with the order; analytics up to 14 months (GA) and 13 months (Clarity); support 3 years after the last message; personal-training health intake 7 years after the last session (new row).
- Owner basis: California requires 3 years; 7 years adopted for safety (GAAP practice).
- Code item: setting retention in code was out of scope until Q8; it is now unblocked (separate task).

## Q5: California Automatic Renewal Law and "Lifetime"
- Renewal model kept as is (owner): separate renewal consent, 15-day notice (owner confirmed it meets the law), 3-day reminder, one-step cancel, 7-day post-renewal refund.
- Flag for attorney: the answer said California requires a lapse unless the customer consents to each renewal, citing AB 390 and SB 313. Claude could not verify that reading or those citations (the expected 2024 amendment is AB 2863). Owner chose the current model; have the attorney confirm.
- Terms 7.7: definition shown next to every Lifetime price; 90 days' notice of discontinuation; comparable replacement first; on request, pro rata refund on a 5-year basis from purchase.

## Added after Q5: RCF Founders Pass (owner approved)
- New Preorder Terms Section 9, drafted from storefront code (src/lib/orders/all-access.ts, catalog.ts, AllAccessClient.tsx). Delays became Section 10 and Other became Section 11.
- Year starts at payment; part of the preorder whole-order refund; opt-in renewal to the RCF All-Access Pass with separate consent, 15-day notice, one-tap cancel, 7-day refund; cannot be turned on after the first year lapses; U.S. only.
- 9.7 (community spaces on third-party platforms, removal for Acceptable Use breaches) is Claude's drafting, not from code. Owner to review in the PDF.
- Verify in Phase 3: the Founders Pass renewal notice is shown in the account as well as by email; whether a 3-day reminder is sent (Terms 7.3).

## Q6: Dispute package
- 20.2 rewritten as an express condition precedent that applies whether or not mediation is demanded. Fluxline pays all mediator fees (owner; counsel flagged a 50/50 split as a possible unconscionability risk). Claims under 20.7 (small claims, emergency IP relief) are excluded from mediation (owner approved; Claude's drafting).
- 20.4 AAA fee allocation and 20.8 California floor: counsel says both hold up; no change.
- 18.2 and 18.3 liability cap and carve-outs: counsel raised no issue; no change.
- Deferred to Q13 (owner): restoring the class-action waiver in 20.6, bold; the checkout attestation wording; McGill public-injunctive-relief carve-out.
- Open item (not in documents): before the 2027 California relocation, register as a foreign LLC in California if required (Cal. Rev. & Tax Code §23101) and have counsel re-review the Salt Lake County venue and the California floor.

## Q7: Personal Training Waiver, e-signature, emergency care
- Counsel: the Utah ordinary-negligence release is enforceable with the gross-negligence and willful-misconduct carve-out (Hawkins v. Peart; Rothstein v. Snowbird). The 4.2 carve-out matches Terms 18.3. The release must be conspicuous.
- Applied to 08: one two-part packet (Part 1 information, emergency contact, PAR-Q and health disclosure; Part 2 consent, risk, release) with a single signature affirming Part 1. §4 and the §9 rights acknowledgment are bold. E-signature: checkbox "I have read, understand, and agree to the Assumption of Risk and Liability Waiver," then a typed name. Audit trail (timestamp, IP, account email) and an emailed completed copy. Sent at booking; first session not confirmed until signed and recorded. New 8.4: accepting the Terms does not sign the waiver. §6 Photographs kept (owner).
- Terms 1.2 lists the waiver (counsel wording). Terms 11.4 says it is signed electronically or in person, and that accepting the Terms does not sign it.
- Privacy 3.6 discloses the signature record. The §9 retention row now covers the waiver and signature record (7 years).
- Emergency-care cost sentence (§5): counsel raised no issue; kept.
- Open items (out of scope; tell owner, do not edit): rebuild the Microsoft Forms intake as the two-part packet with the new checkbox, audit trail and emailed copy; add the waiver consent item; stop relying on the Stewardship Contract item mislabeled "liability waiver"; block booking or check-in until the signed packet is recorded; publish 08 before the first personal training client signs.

## Q9: GDPR and UK
- Counsel: keep a concise, accurate EU/UK notice, because selling digital goods and creating accounts for EU buyers is within GDPR scope; do not overclaim compliance. The DPO, EU representative, records of processing and DPIAs can wait for the 2027 EU launch.
- Applied (owner chose the combined version): Privacy 10.5 states that the Companion, Founders Pass, Identity in Motion and apps are U.S.-only and that only the digital editions (eBook, Audiobook, Workbook PDF) are sold outside the U.S. It adds a refund route for non-U.S. buyers of U.S.-only products, plus a short EU/UK notice (controller, data, purpose, legal bases, rights, retention, transfers). No "GDPR compliant" claim.
- §12 describes the cookie banner (accept or reject at the first step; analytics only after consent). The owner says the banner is live on all sites.
- Code and verification items: block Identity in Motion for non-U.S. billing addresses (region.ts covers only the Companion pass and bundles that include it today); verify on every site that the consent state gates GA and Clarity tags, not just the banner display.

## Q10: AI-training restriction and DMCA agent
- Terms 4.3 replaced with counsel's final individual-purchaser wording: personal reading and assistive tools allowed; no copying, aggregating, indexing or feeding into any AI or automated system at any scale; assistive tools must not retain, extract or transmit content for training (owner kept this sentence); the reserved-rights sentence is bold for conspicuousness.
- DMCA agent (owner): not designating now. 12.6 is unchanged. Owner accepts that counsel says the Section 512 safe harbor requires a designated agent and applies only after filing. Revisit if any public user content is hosted.
- WCAG: Terms 23 is already phrased as a target (design standard), consistent with counsel.

## Q11 and Q12: Stewardship status and the formal review meeting
- Counsel Option 1 (owner): removed from Terms 1.2, so the 24.2 merger clause no longer reaches it. Renamed Stewardship Charter (file 05_Stewardship_Charter_v2.md). New URL fluxline.pro/legal/stewardship-charter, with a redirect from /legal/stewardship-contract.
- Terms 1.2 adds a line stating the Charter is a public statement of commitments, not part of the agreement.
- Charter: "What this is" and §12 say it is not a contract, creates no contractual obligations, is not incorporated, and gives no right to damages. §14 Acknowledgment removed. 4.7 and 4.9 phrased as design commitments (counsel: public promises remain FTC and UCL representations).
- Q12 (owner): the formal review meeting stays in the Charter as an optional courtesy. §8 now points to Terms §20 (informal resolution, then mandatory mediation, then arbitration) as the binding process. Not added to the Terms.
- Owner voice item (former SC-05, §1 warmed voice): review in the PDF.
- Phase 2: the intake form's consent item "Stewardship Contract" (labeled "liability waiver") needs relabeling. Owner task; out of scope.

## Q13: Trademark (and the class-action addendum)
- Trademark: Terms 12.1 and 12.2 kept (LLC ownership). The published registration estimate was dropped (owner). DBA "Fluxline" is filed with the Utah Division of Corporations (owner). Documents now read "Fluxline Resonance Group, LLC, doing business as Fluxline" in opening definitions and contact blocks.
- Open items (counsel, not in documents): signed IP Assignment Agreement from Terence Waters to the LLC, covering pre-formation work, with present-tense assignment and further-assurances clauses, executed before any USPTO filing; written trademark licenses with quality control for any Fluxline-branded product not operated by the LLC; clearance search, then a separate USPTO filing for "Fluxline".
- Class-action addendum (counsel wording; owner reinstated the waiver): 20.2 AAA-administered mediation seated in Salt Lake County, at least 30 days, condition precedent. 20.4 individual AAA arbitration seated in Salt Lake County under Utah law. 20.6 class-action waiver in bold, with small-claims and public-injunctive carve-outs. 20.7 small claims in the consumer's local court or Salt Lake County; public injunctive relief in court.
- Owner-approved additions: bold notice under the Terms intro; 20.6 fallback (an unenforceable waiver sends the claim to court, not class arbitration); 20.9 30-day opt-out from arbitration and the class waiver; Preorder 11.3 bold pointer.
- Checkout checkbox (Preorder 4.4, verbatim): "I have read and agree to the Terms of Use, RCF Preorder Terms, and Privacy Policy, including the class-action waiver, subscription renewal terms, and age attestation, and I understand Fluxline's refund policy." Each document name links to fluxline.pro/legal.
- Counsel caution: the Utah-only seat is expected to be the most challenged element after the 2027 California relocation.

## Owner decisions (Cowork list) and finalization
- AI model vendors: not named. "Approved model families, hosted on Microsoft Azure" stays.
- Privacy 8.1a (contextual ads in free app tiers): held until the first ad-supported app ships. Matching lines removed from RAI §4 and Charter 4.4. Held text, for the app launch: "If a Fluxline app has a free tier that shows ads, the ads are contextual: they are matched to the screen you are on, never to what you write, ask, or do. No ad network receives your entries, your answers, or an identifier that could link them to you. Ads never appear in crisis, reflection, or check-in moments. Personalized ads are off unless you turn them on, and the app shows you exactly what would be shared before you do."
- Prices: Atlas (Preorder 8.2) and Map continuation (Preorder 7.4) now point to the live price. The Founders Pass renewal also points to the price in the renewal consent.
- Providers: list confirmed complete. Customer notes moved from Notion to Fluxline Books (Fluxline's own Azure stack); Notion is cleared.
- Professional-services refunds (Terms 8.7): deferred to each client agreement or SOW.
- Cookies: no marketing cookies; Clarity recording off or masked on account, store and app pages (owner). Verify in Phase 2.
- Release date (owner, November 13, 2026): the internal target is never published. The delay rule in Preorder 1, 2, 5.3 and 10.2 reads "beyond the late February to mid-March 2027 window". Same-day hotfixes removed the date from the live Preorder Terms (fluxline-pro-next#392) and the public catalog API (storefront#151).
- Pass start: the Companion launches with the book (owner: if one fails, all fail). Preorder 7.2 rollover kept as a safeguard.
- Crisis wording (Terms 9.11, RAI 3.5): ships November 20 with the current generic text. PENDING clinician review of the crisis-message catalog; revise both sections when review is complete (not marked final).
- RAI intro and Charter §1 warmed voice: owner to review in the PDF.
- All documents: Version 2.0 (waiver 1.0), effective November 20, 2026. Draft headers, markers and change summaries removed. Em dashes removed. RAI statement 2 now carries the ™.

## Final wording review (owner, November 13, 2026)
- 18+ attestation timing: Terms 2.2 and Preorder 4.3 now say the account attestation is confirmed the first time you check out with your Fluxline account, unless already confirmed. This matches the storefront flow; account.fluxline.pro has no sign-up attestation. The attestation text itself is unchanged.
- Storefront refund summary: the delay rule (Preorder 5.3) now also shows after February 1, 2027 (storefront#150).
