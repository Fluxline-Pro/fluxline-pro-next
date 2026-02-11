# How to Create a Book Entry

Welcome! This guide will walk you through adding a new book to the Fluxline Pro website.

## Quick Start (5 Steps)

1. **Create a folder** with your book's URL-friendly name
2. **Add two subfolders**: `markdown/` and `images/`
3. **Create `book.md`** file with frontmatter and content
4. **Add your cover image** to the `images/` folder
5. **Build the site** with `yarn build`

That's it! Your book will automatically appear on the books page.

---

## Step-by-Step Guide

### Step 1: Create Your Book Folder

Create a new folder in `/public/books/posts/` with a URL-friendly slug (lowercase, hyphens instead of spaces):

```
public/books/posts/
└── your-book-title/          ← Your new folder
```

**Good folder names:**

- `resonance-core-framework`
- `guide-to-business-transformation`
- `leadership-essentials`

**Bad folder names:**

- `My Book Title` (spaces)
- `Book#1` (special characters)
- `BOOK_123` (underscores, all caps)

### Step 2: Create the Folder Structure

Inside your book folder, create two subfolders:

```
your-book-title/
├── markdown/                   ← For your book content
│   └── book.md                ← This is where you write
└── images/                     ← For your cover and other images
    └── cover.jpg              ← Your book cover image
```

### Step 3: Create Your Markdown File

Create a file called `book.md` inside the `markdown/` folder.

**Template:**

```markdown
---
title: 'Your Book Title'
subtitle: 'Optional Subtitle for Additional Context'
author: 'Author Name'
publisher: 'Fluxline Publishing'
publishedDate: '2026-02-15'
isbn: '978-0-000000-00-0'
description: 'A comprehensive description of what the book covers and who it is for.'
excerpt: 'A brief 1-2 sentence summary that appears on the book listing page.'
coverImageUrl: '/books/posts/your-book-title/images/cover.jpg'
coverImageAlt: 'Description of the cover image'
category: 'Business & Self-Help'
tags:
  - 'tag1'
  - 'tag2'
  - 'tag3'
featured: true
status: 'available'
formats:
  - 'hardcover'
  - 'softcover'
  - 'ebook'
prices:
  - format: 'hardcover'
    price: 34.99
    currency: 'USD'
    retailer: 'Amazon'
    url: 'https://amazon.com/your-book'
  - format: 'softcover'
    price: 24.99
    currency: 'USD'
    retailer: 'Amazon'
    url: 'https://amazon.com/your-book'
  - format: 'ebook'
    price: 14.99
    currency: 'USD'
    retailer: 'Fluxline.pro'
    url: '#'
retailers:
  - name: 'Amazon'
    url: 'https://amazon.com/your-book'
    formats: ['hardcover', 'softcover', 'ebook']
    icon: 'ShoppingCart'
  - name: 'Barnes & Noble'
    url: 'https://barnesandnoble.com/your-book'
    formats: ['ebook']
    icon: 'BookAnswers'
directPurchaseAvailable: true
directPurchasePrice: 12.99
includesWorkbook: false
workbookPrice: 0
bundlePrice: 0
pageCount: 342
language: 'English'
dimensions: '6 x 9 inches'
seoTitle: 'Your Book Title - Transform Your Life | Fluxline'
seoDescription: 'Description for search engines (150-160 characters)'
seoKeywords:
  - 'keyword1'
  - 'keyword2'
  - 'keyword3'
---

# Your Book Title

Your book description and content goes here...

## About The Book

Describe what the book is about...

## What You'll Learn

- Key point 1
- Key point 2
- Key point 3

## Who This Book Is For

- Audience 1
- Audience 2
- Audience 3
```

### Step 4: Understanding Frontmatter

The section between `---` marks is called "frontmatter" - it's metadata about your book.

#### Required Book Information Fields

| Field            | Example                          | Description                             |
| ---------------- | -------------------------------- | --------------------------------------- |
| `title`          | `"The Resonance Core Framework"` | Your book title                         |
| `author`         | `"Fluxline Resonance Group"`     | Author name(s)                          |
| `publishedDate`  | `"2026-02-15"`                   | Publication date (YYYY-MM-DD)           |
| `description`    | `"A comprehensive guide..."`     | Full book description                   |
| `excerpt`        | `"Transform your life..."`       | Brief 1-2 sentence summary              |
| `coverImageUrl`  | `"/books/posts/.../cover.jpg"`   | Path to cover image                     |
| `coverImageAlt`  | `"Book cover description"`       | Cover image description                 |
| `category`       | `"Business & Self-Help"`         | Book category                           |
| `tags`           | `["transformation", "business"]` | 3-6 tags as an array                    |
| `status`         | `"available"`                    | `available`, `pre-order`, `coming-soon` |
| `seoTitle`       | `"Book Title - Tagline"`         | SEO title (50-60 chars)                 |
| `seoDescription` | `"Book description for Google"`  | SEO description (150-160 chars)         |
| `seoKeywords`    | `["keyword1", "keyword2"]`       | 5-10 keywords for SEO                   |

#### Optional Book Information Fields

| Field        | Example                   | Description              |
| ------------ | ------------------------- | ------------------------ |
| `subtitle`   | `"A Comprehensive Guide"` | Book subtitle            |
| `publisher`  | `"Fluxline Publishing"`   | Publisher name           |
| `isbn`       | `"978-0-000000-00-0"`     | ISBN number              |
| `featured`   | `true`                    | Mark as featured book    |
| `pageCount`  | `342`                     | Number of pages          |
| `language`   | `"English"`               | Primary language         |
| `dimensions` | `"6 x 9 inches"`          | Physical book dimensions |
| `gallery`    | See gallery section below | Additional images        |

#### Book Formats & Pricing

**Available Formats:**

```yaml
formats:
  - 'hardcover'
  - 'softcover'
  - 'ebook'
  - 'audiobook'
```

**Price Structure:**

Each price entry should include:

```yaml
prices:
  - format: 'hardcover' # Which format
    price: 34.99 # Price amount
    currency: 'USD' # Currency code
    retailer: 'Amazon' # Where to buy
    url: 'https://...' # Purchase link
```

**Multiple Retailers:**

```yaml
retailers:
  - name: 'Amazon'
    url: 'https://amazon.com/your-book'
    formats: ['hardcover', 'softcover', 'ebook']
    icon: 'ShoppingCart'
  - name: 'Barnes & Noble'
    url: 'https://barnesandnoble.com/your-book'
    formats: ['ebook']
    icon: 'BookAnswers'
  - name: 'Apple Books'
    url: 'https://books.apple.com/your-book'
    formats: ['ebook', 'audiobook']
    icon: 'BookAnswers'
```

#### Direct Purchase from Fluxline.pro

If offering direct PDF/eBook purchase:

```yaml
directPurchaseAvailable: true
directPurchasePrice: 12.99 # Base eBook price
includesWorkbook: true # Does it come with a workbook?
workbookPrice: 9.99 # Standalone workbook price
bundlePrice: 19.99 # Book + Workbook bundle price
```

**Direct Purchase Features:**

- Instant download after payment
- Personalized PDF with customer name watermark
- Access to digital resources and updates
- Often discounted compared to retail

#### Book Gallery (Optional)

Add multiple images (interior pages, diagrams, author photo):

```yaml
gallery:
  - url: '/books/posts/your-book/images/interior-1.jpg'
    alt: 'Sample interior page showing chapter layout'
    caption: 'Clean, readable typography designed for extended reading'
  - url: '/books/posts/your-book/images/diagram.jpg'
    alt: 'Framework diagram from Chapter 2'
    caption: 'Visual representation of the core framework'
  - url: '/books/posts/your-book/images/author.jpg'
    alt: 'Photo of the author'
    caption: 'About the author'
```

### Step 5: Writing Your Book Content

After the frontmatter, write your book description and details using Markdown.

#### Recommended Structure

```markdown
# Book Title

Opening paragraph introducing the book...

## About The Book

What the book covers and why it matters...

## What You'll Learn

- Key learning point 1
- Key learning point 2
- Key learning point 3

## Who This Book Is For

- Target audience 1
- Target audience 2
- Target audience 3

## Key Features

- Feature 1
- Feature 2
- Feature 3

## About the Author

Author bio and credentials...

## Table of Contents

1. **Chapter 1 Title**
   - Section 1.1
   - Section 1.2

2. **Chapter 2 Title**
   - Section 2.1
   - Section 2.2

## Companion Resources

Information about workbooks, digital resources, etc...

## Reviews

Customer testimonials and reviews...
```

#### Markdown Formatting

**Headings:**

```markdown
# Main Title (H1) - Use once for book title

## Major Section (H2)

### Subsection (H3)

#### Minor Heading (H4)
```

**Text Formatting:**

```markdown
**Bold text**
_Italic text_
**_Bold and italic_**
`inline code or technical terms`
```

**Lists:**

```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered item
2. Another numbered item
```

**Blockquotes:**

```markdown
> "A powerful quote from the book or a review"
> — Reviewer Name
```

**Links:**

```markdown
[Purchase on Amazon](https://amazon.com/your-book)
[Read a Sample Chapter](/books/your-book/sample)
```

**Images:**

```markdown
![Book interior sample](/books/posts/your-book/images/interior.jpg)
```

### Step 6: Adding Images

1. **Add your cover image** and any additional images to the `images/` folder:

```
your-book-title/
└── images/
    ├── cover.jpg               ← Required: Main cover
    ├── cover-back.jpg         ← Optional: Back cover
    ├── interior-1.jpg         ← Optional: Sample pages
    ├── author.jpg             ← Optional: Author photo
    └── diagram.jpg            ← Optional: Diagrams/charts
```

2. **Cover Image Requirements:**
   - **Dimensions**: At least 1200px wide for best quality
   - **Aspect Ratio**: Typically 6:9 (portrait) for books
   - **Format**: JPG or PNG
   - **File Size**: Optimize to < 500KB for web
   - **Quality**: High resolution for potential zooming

3. **Reference images** in your markdown:

```markdown
![Book Cover](/books/posts/your-book-title/images/cover.jpg)
```

4. **Image best practices:**
   - Use descriptive filenames: `resilience-framework-diagram.jpg` not `image1.jpg`
   - Always include alt text for accessibility
   - Optimize images before uploading (compress without losing quality)
   - Keep file sizes reasonable (< 500KB for covers, < 300KB for interior shots)

### Step 7: Build and Deploy

Once your book entry is ready:

```bash
# Build the site
yarn build

# This will:
# ✓ Generate your book detail page
# ✓ Add it to the books listing page
# ✓ Generate SEO metadata
# ✓ Process purchase options
```

Your book will be live at: `https://yoursite.com/books/your-book-title`

---

## Complete Example

Here's a complete, ready-to-use example:

**File:** `public/books/posts/leadership-framework/markdown/book.md`

```markdown
---
title: 'The Modern Leadership Framework'
subtitle: 'Leading Teams Through Change and Uncertainty'
author: 'Dr. Sarah Chen'
publisher: 'Fluxline Publishing'
publishedDate: '2026-03-01'
isbn: '978-1-234567-89-0'
description: 'A comprehensive guide to modern leadership that combines proven management principles with cutting-edge insights on remote work, diversity, and organizational resilience. Perfect for leaders at all levels seeking to navigate today's complex business landscape.'
excerpt: 'Transform your leadership approach with proven frameworks for leading teams through change, building resilient organizations, and driving meaningful results.'
coverImageUrl: '/books/posts/leadership-framework/images/cover.jpg'
coverImageAlt: 'The Modern Leadership Framework book cover featuring geometric patterns representing organizational structure'
category: 'Business & Leadership'
tags:
  - 'leadership'
  - 'management'
  - 'business'
  - 'organizational-development'
  - 'team-building'
featured: true
status: 'available'
formats:
  - 'hardcover'
  - 'softcover'
  - 'ebook'
  - 'audiobook'
prices:
  - format: 'hardcover'
    price: 29.99
    currency: 'USD'
    retailer: 'Amazon'
    url: 'https://amazon.com/leadership-framework'
  - format: 'softcover'
    price: 19.99
    currency: 'USD'
    retailer: 'Amazon'
    url: 'https://amazon.com/leadership-framework'
  - format: 'ebook'
    price: 12.99
    currency: 'USD'
    retailer: 'Fluxline.pro'
    url: '#'
  - format: 'audiobook'
    price: 16.99
    currency: 'USD'
    retailer: 'Audible'
    url: 'https://audible.com/leadership-framework'
retailers:
  - name: 'Amazon'
    url: 'https://amazon.com/leadership-framework'
    formats: ['hardcover', 'softcover', 'ebook']
    icon: 'ShoppingCart'
  - name: 'Barnes & Noble'
    url: 'https://barnesandnoble.com/leadership-framework'
    formats: ['hardcover', 'ebook']
    icon: 'BookAnswers'
  - name: 'Apple Books'
    url: 'https://books.apple.com/leadership-framework'
    formats: ['ebook', 'audiobook']
    icon: 'BookAnswers'
  - name: 'Audible'
    url: 'https://audible.com/leadership-framework'
    formats: ['audiobook']
    icon: 'Microphone'
directPurchaseAvailable: true
directPurchasePrice: 9.99
includesWorkbook: true
workbookPrice: 14.99
bundlePrice: 19.99
pageCount: 286
language: 'English'
dimensions: '6 x 9 inches'
gallery:
  - url: '/books/posts/leadership-framework/images/interior-sample.jpg'
    alt: 'Sample interior page showing chapter layout and typography'
    caption: 'Clean, professional design optimized for readability'
  - url: '/books/posts/leadership-framework/images/framework-diagram.jpg'
    alt: 'The Modern Leadership Framework diagram'
    caption: 'Visual representation of the core leadership framework'
  - url: '/books/posts/leadership-framework/images/author.jpg'
    alt: 'Dr. Sarah Chen, author'
    caption: 'Dr. Sarah Chen, leadership expert and organizational psychologist'
seoTitle: 'The Modern Leadership Framework - Lead Teams Through Change | Fluxline'
seoDescription: 'Transform your leadership with proven frameworks for modern teams. Learn to navigate change, build resilience, and drive results. Available now in multiple formats.'
seoKeywords:
  - 'modern leadership'
  - 'leadership framework'
  - 'team management'
  - 'organizational change'
  - 'business leadership'
  - 'remote team leadership'
  - 'leadership development'
---

# The Modern Leadership Framework

Leading in today's rapidly changing business environment requires a new approach. **The Modern Leadership Framework** provides the tools, strategies, and insights you need to navigate complexity, inspire teams, and drive sustainable results.

## About The Book

Drawing on decades of research and real-world experience, this comprehensive guide bridges the gap between traditional leadership principles and the demands of modern organizations. Whether you're leading a remote team, managing through uncertainty, or building a resilient culture, this framework provides a clear path forward.

### What You'll Learn

- **Adaptive Leadership**: How to lead effectively in uncertain and changing environments
- **Team Dynamics**: Building high-performing teams in hybrid and remote settings
- **Communication Mastery**: Techniques for clear, inclusive, and impactful communication
- **Decision-Making**: Frameworks for making better decisions under pressure
- **Cultural Leadership**: Creating and sustaining positive organizational culture
- **Personal Development**: Growing as a leader while maintaining work-life balance
- **Change Management**: Leading successful organizational transformations
- **Resilience Building**: Developing organizational and personal resilience

## Why This Book

Traditional leadership books often fall short in addressing the unique challenges of modern work environments. This book is different because it:

- **Addresses Modern Realities**: Covers remote work, digital transformation, and generational diversity
- **Combines Theory and Practice**: Every concept includes practical, actionable strategies
- **Evidence-Based**: Grounded in current research and real-world case studies
- **Inclusive Approach**: Emphasizes diverse perspectives and inclusive leadership
- **Workbook Included**: Optional companion workbook for hands-on implementation

## Who This Book Is For

- **New Leaders**: Building your leadership foundation with proven frameworks
- **Mid-Level Managers**: Refining your approach and expanding your impact
- **Senior Executives**: Navigating strategic challenges and organizational transformation
- **Entrepreneurs**: Leading startups and growing businesses
- **Team Leaders**: Managing projects and cross-functional teams
- **HR Professionals**: Supporting leadership development initiatives

## Key Features

✓ **280+ Pages** of comprehensive content and practical guidance  
✓ **12 Core Frameworks** you can implement immediately  
✓ **30+ Case Studies** from real organizations and leaders  
✓ **50+ Assessment Tools** to evaluate your leadership approach  
✓ **Visual Models** for easy understanding and application  
✓ **Online Resources** including templates and discussion guides  
✓ **Leadership Workbook** available separately or as a bundle

## About the Author

**Dr. Sarah Chen** is an organizational psychologist, leadership coach, and advisor to Fortune 500 companies. With over 20 years of experience in leadership development, she has helped thousands of leaders transform their approach and achieve breakthrough results.

Dr. Chen holds a Ph.D. in Organizational Psychology from Stanford University and has published extensively on leadership, team dynamics, and organizational culture. She is a frequent keynote speaker and contributes regularly to _Harvard Business Review_ and _MIT Sloan Management Review_.

## Table of Contents

### Part I: Foundation

1. **The New Leadership Landscape**
   - Understanding Modern Challenges
   - Evolution of Leadership Thinking
   - The Framework Overview

2. **Self-Leadership First**
   - Personal Values and Vision
   - Emotional Intelligence
   - Building Self-Awareness

### Part II: Leading Teams

3. **Building High-Performing Teams**
   - Team Formation and Development
   - Psychological Safety
   - Hybrid and Remote Teams

4. **Communication Excellence**
   - Active Listening Techniques
   - Inclusive Communication
   - Difficult Conversations

5. **Empowerment and Delegation**
   - Trust and Autonomy
   - Effective Delegation
   - Accountability Systems

### Part III: Strategic Leadership

6. **Decision-Making Frameworks**
   - Analysis and Intuition
   - Collaborative Decision-Making
   - Managing Uncertainty

7. **Change Leadership**
   - Understanding Resistance
   - Communicating Change
   - Sustaining Transformation

8. **Cultural Leadership**
   - Defining Culture
   - Culture Change Strategies
   - Values in Action

### Part IV: Advanced Topics

9. **Leading Through Crisis**
   - Crisis Preparation
   - Communication During Crisis
   - Recovery and Learning

10. **Innovation and Creativity**
    - Fostering Innovation
    - Design Thinking for Leaders
    - Managing Risk

11. **Diversity and Inclusion**
    - Inclusive Leadership
    - Unconscious Bias
    - Building Diverse Teams

12. **Leading Your Own Development**
    - Continuous Learning
    - Feedback and Growth
    - Work-Life Integration

## Companion Workbook

The **Modern Leadership Framework Workbook** provides hands-on exercises and tools to help you apply the concepts from the book:

- **Leadership Assessments**: Evaluate your current leadership style
- **Action Planning Templates**: Create your personal development plan
- **Team Exercises**: Activities for team development sessions
- **Reflection Prompts**: Deepen your understanding of key concepts
- **Progress Tracking**: Monitor your growth over time
- **Case Study Analyses**: Practice applying frameworks to real scenarios

**Available separately ($14.99) or bundled with the book ($19.99 - save $5!)**

## What Readers Are Saying

> "A game-changer for modern leaders. Dr. Chen's frameworks are practical, actionable, and immediately applicable. This book has transformed how I lead my team."
> — Michael Torres, VP of Engineering, TechCorp

> "Finally, a leadership book that addresses the real challenges of leading in today's world. The sections on remote team management and inclusive leadership are worth the price alone."
> — Jennifer Park, CEO, Growth Strategies Inc.

> "As someone who has read dozens of leadership books, this one stands out. It's comprehensive yet practical, research-based yet accessible. Highly recommended."
> — David Williams, Leadership Coach & Author

## Digital Editions

Purchase the eBook edition directly from Fluxline.pro and receive:

- **Instant Download**: PDF format, read on any device
- **Exclusive Discount**: $9.99 (save $3 compared to retail)
- **Bonus Resources**: Templates, checklists, and supplemental materials
- **Lifetime Access**: Download anytime, keep forever
- **Free Updates**: Receive updated editions automatically

**Bundle with the Workbook for just $19.99** (save $5!)

## Purchase Options

Choose your preferred format:

- **Hardcover** - Premium quality, perfect for your office bookshelf
- **Softcover** - Portable and practical for daily reference
- **eBook** - Instant access, read anywhere, searchable content
- **Audiobook** - Learn while commuting, narrated by the author

Available through:

- [Amazon](https://amazon.com/leadership-framework) (all formats)
- [Barnes & Noble](https://barnesandnoble.com/leadership-framework) (hardcover, eBook)
- [Apple Books](https://books.apple.com/leadership-framework) (eBook, audiobook)
- [Fluxline.pro](#) (eBook with bonuses)

---

**Available Now - Order Your Copy Today**

Transform your leadership and create lasting impact for your team and organization.
```

---

## Book Status Options

Use the `status` field to indicate availability:

- **`available`** - Book is published and available for purchase
- **`pre-order`** - Book can be pre-ordered, ships on publication date
- **`coming-soon`** - Book announced but not yet available for pre-order

**Example:**

```yaml
status: 'pre-order'
publishedDate: '2026-06-01' # Future date
```

The book detail page will automatically show appropriate messaging and purchase options based on status.

---

## Tips and Best Practices

### Writing Great Book Descriptions

1. **Start with a hook** - Grab attention in the first sentence
2. **Address pain points** - What problems does the book solve?
3. **Highlight benefits** - What will readers gain?
4. **Include social proof** - Testimonials, reviews, credentials
5. **Clear call-to-action** - Make it easy to purchase

### Pricing Strategy

1. **Hardcover**: Premium pricing ($25-$40)
2. **Softcover**: Mid-range pricing ($15-$25)
3. **eBook**: Affordable pricing ($9.99-$14.99)
4. **Audiobook**: Similar to eBook ($14.99-$19.99)
5. **Direct PDF**: Discounted ($9.99-$12.99)
6. **Bundle**: Offer 15-25% discount for book + workbook

### Cover Image Optimization

1. **High Resolution**: Minimum 1200px wide
2. **Compressed**: Use tools like TinyPNG or ImageOptim
3. **Professional Design**: Invest in quality cover design
4. **Readable Thumbnail**: Title legible even when small
5. **Format**: JPG for photographs, PNG for graphics with text

### SEO Optimization

1. **Include book title and author** in SEO title
2. **Use long-tail keywords** in description (e.g., "modern leadership framework for remote teams")
3. **Add category and genre** to keywords
4. **Optimize alt text** with descriptive, keyword-rich content
5. **Link to sample chapters** or excerpts when possible

---

## Common Mistakes to Avoid

- ❌ Forgetting to close frontmatter with `---`
- ❌ Using relative paths for cover image
- ❌ Missing required price information
- ❌ Inconsistent date formats (always use YYYY-MM-DD)
- ❌ Not optimizing cover image (> 1MB file size)
- ❌ Forgetting to set book status
- ❌ Missing retailer URLs (use placeholder `#` if not ready)
- ❌ Not including a clear call-to-action
- ❌ Skipping the workbook/companion resource section

---

## Troubleshooting

### My book doesn't appear on the listing page

1. Verify `book.md` is in the `markdown/` subfolder
2. Check frontmatter is complete and properly formatted
3. Ensure `publishedDate` is in YYYY-MM-DD format
4. Run `yarn build` to regenerate pages
5. Check console for error messages

### Cover image doesn't load

1. Verify cover image is in the `images/` folder
2. Check that `coverImageUrl` path is correct (starts with `/books/posts/`)
3. Ensure image file name matches exactly (case-sensitive)
4. Verify image format (JPG or PNG)

### Purchase links not working

1. Verify retailer URLs are correct
2. Use `#` as placeholder for unavailable links
3. Ensure `status` field is set correctly
4. Check that `directPurchaseAvailable` matches your setup

### Build errors

1. Check YAML syntax - proper indentation and colons
2. Verify all required fields are present
3. Ensure price amounts are numbers, not strings
4. Check that formats match available options
5. Look for unclosed quotes or brackets in frontmatter

---

## Next Steps

After creating your book entry:

1. **Test locally** with `yarn dev`
2. **Build** with `yarn build`
3. **Verify** all purchase links work
4. **Add** sample chapters or excerpts
5. **Promote** on social media and newsletter
6. **Monitor** analytics and sales performance
7. **Update** with reviews and testimonials as they come in

---

**Ready to showcase your book!** 📚

_Last updated: February 10, 2026_
