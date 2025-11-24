# How to Create a Portfolio Project

This guide shows you how to add a new portfolio project to the Fluxline Pro website. Portfolio projects are stored as Markdown files in the repository and are automatically converted into static pages during the build process.

## Quick Start

1. Create a new folder in `public/portfolio/posts/` with your project slug
2. Add a `markdown/post.md` file with frontmatter and content
3. Add images to the `images/` folder
4. Build the site with `yarn build`

## Directory Structure

```
public/portfolio/posts/
└── your-project-slug/
    ├── markdown/
    │   └── post.md          # Your project markdown file with frontmatter
    └── images/
        ├── hero.jpg         # Featured image
        └── screenshot.png   # Additional images
```

## Frontmatter Template

Copy this template to start your portfolio project:

```yaml
---
title: 'Your Project Title'
shortDescription: 'A brief one-line description of the project'
longDescription: 'A longer paragraph describing the project in more detail. This appears in meta tags and project listings.'
role: 'Your Role in the Project'
client: 'Client Name (optional)'
category: 'web-application' # See categories below
tags: ['React', 'TypeScript', 'Enterprise'] # 3-6 tags recommended
technologies: ['Next.js', 'React', 'PostgreSQL', 'AWS'] # Technologies used
featuredImage:
  url: '/portfolio/posts/your-project-slug/images/hero.jpg'
  alt: 'Description of the featured image'
gallery: # Optional - additional images
  - url: '/portfolio/posts/your-project-slug/images/screenshot1.png'
    alt: 'Screenshot description'
    caption: 'Optional caption'
publishedDate: '2025-01-25' # Format: YYYY-MM-DD
projectDate: '2024-2025' # When the project was done
featured: true # Show in featured projects
githubUrl: 'https://github.com/username/repo' # Optional
liveUrl: 'https://example.com' # Optional
seoTitle: 'Project Title - SEO Optimized'
seoDescription: 'SEO-friendly description for search engines'
seoKeywords: ['keyword1', 'keyword2', 'keyword3']
---
```

## Available Categories

Choose one of these categories for your project:

- `web-application` - Web apps and platforms
- `mobile-app` - iOS and Android apps
- `enterprise-software` - Enterprise solutions
- `e-commerce` - Online stores and marketplaces
- `education` - Educational platforms and tools
- `healthcare` - Health and medical applications
- `fintech` - Financial technology solutions
- `saas` - Software as a Service products
- `portfolio-site` - Portfolio and personal websites
- `other` - Other project types

## Required Frontmatter Fields

| Field               | Type    | Description                        |
| ------------------- | ------- | ---------------------------------- |
| `title`             | string  | Project title                      |
| `shortDescription`  | string  | Brief one-liner (appears in cards) |
| `role`              | string  | Your role in the project           |
| `category`          | string  | Project category (see above)       |
| `tags`              | array   | Project tags (3-6 recommended)     |
| `technologies`      | array   | Technologies used                  |
| `featuredImage.url` | string  | Path to featured image             |
| `featuredImage.alt` | string  | Alt text for image                 |
| `publishedDate`     | string  | Date in YYYY-MM-DD format          |
| `featured`          | boolean | Show in featured projects          |
| `seoTitle`          | string  | SEO optimized title                |
| `seoDescription`    | string  | SEO optimized description          |
| `seoKeywords`       | array   | SEO keywords                       |

## Optional Frontmatter Fields

| Field             | Type   | Description                |
| ----------------- | ------ | -------------------------- |
| `longDescription` | string | Detailed description       |
| `client`          | string | Client name                |
| `gallery`         | array  | Additional project images  |
| `projectDate`     | string | When project was completed |
| `githubUrl`       | string | Link to GitHub repository  |
| `liveUrl`         | string | Link to live project       |

## Writing the Project Content

After the frontmatter (between the `---` markers), write your project content in Markdown. Here's a suggested structure:

```markdown
# Project Title

## Project Overview

A brief introduction to the project, what it does, and why it was built.

## Technical Stack

### Frontend

- Technology 1
- Technology 2

### Backend

- Technology 3
- Technology 4

## Key Features

### Feature 1: Name

Description of the feature and why it's important.

### Feature 2: Name

Description of the feature and why it's important.

## Challenges & Solutions

### Challenge 1: Problem Description

**Problem**: Detailed description of the problem.

**Solution**: How you solved it.

## Results

- Metric 1
- Metric 2
- Metric 3

## Technologies Used

Full list of technologies, tools, and frameworks.
```

## Markdown Features

Your project content supports:

- **Headers** (`#`, `##`, `###`)
- **Bold** and _italic_ text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Images: `![Alt text](/path/to/image.jpg)`
- Links: `[Text](https://example.com)`
- Blockquotes for callouts
- Tables

## Example Code Block

\`\`\`typescript
// Example TypeScript code
interface ProjectConfig {
name: string;
version: string;
}

const config: ProjectConfig = {
name: 'My Project',
version: '1.0.0'
};
\`\`\`

## Adding Images

1. Place images in `public/portfolio/posts/your-project-slug/images/`
2. Reference them in your markdown:
   ```markdown
   ![Screenshot](/portfolio/posts/your-project-slug/images/screenshot.png)
   ```
3. Or in frontmatter gallery:
   ```yaml
   gallery:
     - url: '/portfolio/posts/your-project-slug/images/screenshot.png'
       alt: 'Description'
       caption: 'Optional caption'
   ```

## Best Practices

### Frontmatter

- Use 3-6 tags for optimal SEO
- Keep shortDescription under 160 characters
- Use descriptive alt text for images
- Include both seoTitle and seoDescription

### Content

- Start with a strong overview
- Use headers to organize content
- Include code examples where relevant
- Highlight challenges and solutions
- Quantify results when possible
- Add visuals to break up text

### Images

- Use high-quality images
- Optimize images before adding (< 500KB recommended)
- Provide descriptive alt text
- Use consistent image dimensions

## Building and Deploying

After creating your portfolio project:

1. **Test locally**:

   ```bash
   yarn dev
   ```

   Visit `http://localhost:3000/portfolio` to see your project

2. **Build for production**:

   ```bash
   yarn build
   ```

   This generates static HTML for your project

3. **Deploy**:
   Push to your git repository and the CI/CD pipeline will deploy automatically

## Example Projects

See these example projects for reference:

- `public/portfolio/posts/fluxline-pro-website/`
- `public/portfolio/posts/enterprise-dashboard/`
- `public/portfolio/posts/mobile-health-app/`

## Troubleshooting

### Project not appearing

- Check that the folder name matches the slug in the URL
- Verify `post.md` is in the `markdown/` subfolder
- Ensure frontmatter is valid YAML (check for syntax errors)
- Run `yarn build` to regenerate static pages

### Images not loading

- Check image paths are correct
- Verify images are in the `images/` subfolder
- Ensure image filenames match exactly (case-sensitive)

### Frontmatter errors

- Verify all required fields are present
- Check YAML syntax (proper indentation, quotes, etc.)
- Ensure dates are in YYYY-MM-DD format
- Validate arrays use proper YAML list syntax

## Need Help?

- Review existing projects for examples
- Check the blog guide at `FILE_BASED_BLOG_GUIDE.md` (similar pattern)
- Consult the technical docs at `README.md`
