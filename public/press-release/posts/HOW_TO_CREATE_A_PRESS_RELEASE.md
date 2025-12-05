# How to Create a Press Release

This guide explains how to create press releases for the Fluxline Pro platform. Press releases are stored as Markdown files and automatically appear in the press release listing page.

## Directory Structure

Press releases follow this structure:

```
public/press-release/posts/
└── your-release-id/
    ├── markdown/
    │   └── release.md         # The main press release content
    └── images/                # Optional: Images for the press release
        ├── hero.jpg
        ├── screenshot-1.jpg
        └── screenshot-2.jpg
```

## Creating a New Press Release

### Step 1: Choose a Unique ID

The ID is used in the URL and folder name. Use kebab-case (lowercase with hyphens).

**Good IDs:**

- `fluxline-platform-launch-2025`
- `azure-partnership-announcement`
- `design-system-v2-release`

**Bad IDs:**

- `Press Release 2025` (spaces, capitals)
- `announcement_123` (underscores)
- `NEW-FEATURE!!!` (special characters)

### Step 2: Create the Folder Structure

```bash
mkdir -p public/press-release/posts/your-release-id/markdown
mkdir -p public/press-release/posts/your-release-id/images
```

### Step 3: Create the Markdown File

Create `public/press-release/posts/your-release-id/markdown/release.md`:

```markdown
---
title: 'Your Press Release Title'
subtitle: 'Optional Subtitle for Additional Context'
description: 'A brief description that appears in the listing page and meta tags. Keep it concise and compelling.'
author: 'Fluxline Resonance Group'
publishedDate: '2025-12-10'
category: 'Product Release'
tags: ['technology', 'launch', 'innovation']
imageUrl: '/images/press-release/your-image.jpg'
imageAlt: 'Descriptive alt text for accessibility'
glyphTag: '🜂'
emotionalCue: 'Ignition'
seoTitle: 'Your SEO-Optimized Title - Fluxline Pro'
seoDescription: 'SEO-friendly description that appears in search results. Include relevant keywords.'
seoKeywords: ['keyword1', 'keyword2', 'keyword3']
---

Your press release content goes here. Write in **Markdown** format.

## Use Headers to Structure Content

Break up your press release into logical sections using headers.

### Key Features

- **Bold text** for emphasis
- _Italic text_ for subtle emphasis
- [Links to external resources](https://example.com)

### Including Images

You can reference images from the images folder:

![Image description](/press-release/posts/your-release-id/images/screenshot.jpg)

## Quotes and Testimonials

> "Include quotes from company leaders or stakeholders to add credibility and human interest to your press release."
> — Terence Waters, CEO

## Call to Action

End with a clear call to action or contact information for media inquiries.
```

## Frontmatter Fields

### Required Fields

| Field            | Type   | Description                        | Example                                          |
| ---------------- | ------ | ---------------------------------- | ------------------------------------------------ |
| `title`          | String | Main headline of the press release | `'Fluxline 2.0 Platform Launch'`                 |
| `description`    | String | Brief summary for listings and SEO | `'Fluxline announces major platform upgrade...'` |
| `author`         | String | Author or organization name        | `'Fluxline Resonance Group'`                     |
| `publishedDate`  | String | Publication date (YYYY-MM-DD)      | `'2025-12-10'`                                   |
| `category`       | String | Press release category             | `'Product Release'`                              |
| `tags`           | Array  | Relevant tags for filtering        | `['technology', 'launch']`                       |
| `seoTitle`       | String | SEO-optimized title                | `'Fluxline 2.0 Launch - Next.js Platform'`       |
| `seoDescription` | String | SEO meta description               | `'Fluxline launches cutting-edge platform...'`   |
| `seoKeywords`    | Array  | SEO keywords                       | `['platform', 'launch', 'technology']`           |

### Optional Fields

| Field          | Type   | Description                   | Example                              |
| -------------- | ------ | ----------------------------- | ------------------------------------ |
| `subtitle`     | String | Secondary headline            | `'Modern Platform Goes Live'`        |
| `lastUpdated`  | String | Last update date (YYYY-MM-DD) | `'2025-12-15'`                       |
| `imageUrl`     | String | Featured image path           | `'/images/press-release/launch.jpg'` |
| `imageAlt`     | String | Image alt text                | `'Platform launch celebration'`      |
| `gallery`      | Array  | Multiple images with captions | See Gallery section below            |
| `glyphTag`     | String | Alchemical symbol             | `'🜂'` (Ignition phase)               |
| `emotionalCue` | String | Curriculum phase marker       | `'Ignition'`, `'Integration'`, etc.  |

## Image Gallery & Carousel (Optional)

Add multiple images that users can view in a fullscreen carousel:

```yaml
gallery:
  - url: '/press-release/posts/your-release-id/images/screenshot-1.jpg'
    alt: 'Platform dashboard overview'
    caption: 'Optional: The new dashboard provides real-time insights'
  - url: '/press-release/posts/your-release-id/images/screenshot-2.jpg'
    alt: 'Mobile responsive view'
    caption: 'Optional: Fully responsive across all devices'
  - url: '/press-release/posts/your-release-id/images/screenshot-3.jpg'
    alt: 'Analytics interface'
    caption: 'Optional: Advanced analytics and reporting'
```

### Carousel Features

When a gallery is added:

- Featured image becomes **clickable** with hover effect
- Click opens **fullscreen modal** carousel
- Navigate with **left/right buttons** or **arrow keys**
- Press **Escape** to close
- Image counter shows position (e.g., "2 / 5")
- Captions appear below each image (if provided)

### Gallery Best Practices

- Use **2-6 images** per press release
- Images should be **1200px wide or larger**
- Maintain **consistent aspect ratios**
- Provide **descriptive alt text** for accessibility
- Keep captions **concise** (1-2 sentences)
- Focus on **key visuals** that support the announcement

## Press Release Categories

Choose the most appropriate category:

- **Product Release** - New products or major features
- **Partnership** - Strategic partnerships and collaborations
- **Achievement** - Awards, certifications, milestones
- **Business Expansion** - Growth, new markets, scaling
- **Service Launch** - New service offerings
- **Company News** - General announcements
- **Event** - Conferences, webinars, speaking engagements
- **Thought Leadership** - Industry insights and perspectives

## Tags

Use relevant tags to help users find related press releases:

**Technology Tags:**

- `technology`, `platform`, `innovation`, `software`, `cloud`

**Business Tags:**

- `partnership`, `expansion`, `growth`, `launch`, `milestone`

**Service Tags:**

- `consulting`, `design`, `development`, `coaching`, `transformation`

**Industry Tags:**

- `enterprise`, `startup`, `healthcare`, `finance`, `education`

## Alchemical Symbols & Emotional Cues

Fluxline uses alchemical symbols to represent different phases of transformation:

| Symbol | Phase          | When to Use                               |
| ------ | -------------- | ----------------------------------------- |
| 🜂      | Ignition       | New launches, beginnings, breakthroughs   |
| 🜄      | Integration    | Partnerships, collaborations, connections |
| 🝰      | Transformation | Major changes, pivots, evolution          |
| 🜍      | Completion     | Milestones, achievements, culminations    |

**Emotional Cues:**

- Ignition
- Integration
- Breakthrough
- Visibility
- Transformation
- Completion

## Content Guidelines

### Writing Tips

1. **Start with the most important information** - Answer who, what, when, where, why in the first paragraph
2. **Use clear, concise language** - Avoid jargon unless necessary
3. **Include quotes** - Add credibility with stakeholder quotes
4. **Focus on benefits** - Explain how the announcement helps customers or the industry
5. **End with a call to action** - Guide readers on next steps

### Press Release Structure

```markdown
## Opening Paragraph

State the core announcement clearly and concisely.

## Details and Context

Expand on the announcement with relevant details.

## Key Features/Benefits

Highlight what makes this newsworthy.

## Quote from Leadership

"Add credibility with a quote from company leadership."

## Background Information

Provide context about the company or project.

## Call to Action

Direct readers to learn more or take action.
```

### SEO Best Practices

- **Title**: Include primary keyword, keep under 60 characters
- **Description**: Write compelling meta description with keywords, 150-160 characters
- **Keywords**: Choose 5-10 relevant keywords, focus on long-tail phrases
- **Headers**: Use H2 and H3 headers with keywords naturally
- **Links**: Include relevant internal and external links
- **Images**: Use descriptive filenames and alt text

## Adding Images

### Recommended Image Specs

- **Format**: JPG for photos, PNG for graphics with transparency
- **Size**: 1200px - 2400px wide for hero images
- **File Size**: Under 500KB (optimize with tools like TinyPNG)
- **Aspect Ratio**: 16:9 for hero images, 4:3 for gallery images

### Image Paths

Images can be stored in two locations:

**Press Release Images Folder:**

```
/press-release/posts/your-release-id/images/your-image.jpg
```

**Global Images Folder:**

```
/images/press-release/your-image.jpg
```

### Using Images in Markdown

```markdown
![Alt text describing the image](/press-release/posts/your-id/images/photo.jpg)
```

## Testing Your Press Release

### Before Publishing

1. **Check frontmatter syntax** - YAML must be valid
2. **Verify dates** - Use YYYY-MM-DD format
3. **Test images** - Ensure all image paths are correct
4. **Review content** - Proofread for typos and formatting
5. **Check links** - Verify all links work correctly
6. **Test gallery** - If using carousel, verify all images load
7. **Build locally** - Run `yarn build` to test static generation

### Build Command

```bash
yarn build
```

The press release will be automatically:

- Added to the press release listing page
- Given a detail page at `/press-release/your-release-id`
- Filtered by category and year
- Included in the site search
- Optimized for SEO

## Example: Complete Press Release

See existing press releases for reference:

- `fluxline-pro-launch-2025` - Platform launch announcement
- `accessibility-certification-2025` - Achievement announcement
- `azure-partnership-2025` - Partnership announcement
- `design-system-release-2025` - Product release
- `consulting-expansion-2025` - Business expansion
- `resonance-core-launch-2025` - Service launch

## Troubleshooting

### Press Release Not Appearing

1. **Check folder structure** - Ensure `markdown/release.md` path is correct
2. **Verify frontmatter** - All required fields must be present
3. **Check date format** - Use YYYY-MM-DD format
4. **Rebuild** - Run `yarn build` to regenerate static pages

### Images Not Loading

1. **Check path** - Use absolute paths starting with `/`
2. **Verify file exists** - Confirm image is in correct folder
3. **Check case sensitivity** - Filenames are case-sensitive
4. **Optimize size** - Large images may fail to load

### Markdown Not Rendering

1. **Check syntax** - Use proper Markdown formatting
2. **Test headers** - Ensure proper spacing around headers
3. **Verify lists** - Check bullet point and number formatting
4. **Escape special characters** - Use backslash for special characters

## Support

For questions or issues with press releases:

- Review existing press releases in `/public/press-release/posts/`
- Check the build logs for error messages
- Refer to the blog HOW_TO guide for similar Markdown patterns
- Contact the development team for assistance

---

**Happy Publishing!** 🚀
