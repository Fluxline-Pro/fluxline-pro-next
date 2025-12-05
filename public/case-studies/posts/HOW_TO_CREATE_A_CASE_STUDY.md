# How to Create a Case Study

This guide walks you through creating a new case study for the Fluxline Pro website. Case studies are stored as Markdown files and automatically converted into static pages during the build process.

## Quick Start

1. Create a new folder in `public/case-studies/posts/` with your case study slug
2. Add a `markdown/post.md` file with frontmatter and content
3. Add images to the `images/` folder (optional)
4. Build the site with `yarn build`

## Directory Structure

```
public/case-studies/posts/
└── your-case-study-slug/
    ├── markdown/
    │   └── post.md          # Your case study markdown file
    └── images/              # Optional images
        ├── hero.jpg         # Featured image
        └── diagram.png      # Additional images
```

## Frontmatter Template

Copy this template to start your case study:

```yaml
---
title: 'Project or Client Name'
client: 'Client Name'
industry: 'Industry Category'
description: 'Brief one-paragraph summary of the project and its impact'
services: ['consulting', 'development'] # See services list below
technologies: ['Next.js', 'React', 'PostgreSQL', 'Azure']
publishedDate: '2025-01-25' # Format: YYYY-MM-DD
projectDuration: '6 months' # Optional
featured: true # Show in featured case studies
imageUrl: '/case-studies/posts/your-case-study/images/hero.jpg' # Optional
imageAlt: 'Description of the featured image' # Required if imageUrl used
seoTitle: 'Case Study: Client Name - Project Title'
seoDescription: 'SEO-friendly description for search engines (150-160 chars)'
seoKeywords: ['keyword1', 'keyword2', 'keyword3']
metrics:
  - label: 'Metric Name'
    value: '+150%'
    description: 'What this metric represents'
  - label: 'Another Metric'
    value: '3x'
    description: 'Impact description'
testimonial:
  quote: 'Optional client testimonial about the project and results.'
  author: 'Client Name'
  role: 'Title, Company'
---
```

## Available Services

Choose one or more services that apply to your case study:

- `consulting` - Business Strategy & IT Consulting
- `development` - Web Development & Software Engineering
- `design` - Brand & Experience Design
- `training` - Personal Training & Wellness (if health-related)
- `education` - Coaching & Education
- `wellness` - Wellness & Holistic Health

## Required Frontmatter Fields

| Field            | Type    | Description                               |
| ---------------- | ------- | ----------------------------------------- |
| `title`          | string  | Case study title                          |
| `client`         | string  | Client or company name                    |
| `industry`       | string  | Industry category                         |
| `description`    | string  | Brief summary (appears in listings)       |
| `services`       | array   | Services provided (see list above)        |
| `technologies`   | array   | Technologies used                         |
| `publishedDate`  | string  | Date in YYYY-MM-DD format                 |
| `featured`       | boolean | Show in featured case studies             |
| `seoTitle`       | string  | SEO optimized title                       |
| `seoDescription` | string  | SEO optimized description (150-160 chars) |
| `seoKeywords`    | array   | SEO keywords                              |

## Optional Frontmatter Fields

| Field             | Type   | Description                    |
| ----------------- | ------ | ------------------------------ |
| `projectDuration` | string | How long the project took      |
| `imageUrl`        | string | Path to featured image         |
| `imageAlt`        | string | Alt text for featured image    |
| `gallery`         | array  | Additional images for carousel |
| `metrics`         | array  | Project metrics/results        |
| `testimonial`     | object | Client testimonial (optional)  |

### Gallery Format (Optional)

Add multiple images that users can view in a fullscreen carousel:

```yaml
gallery:
  - url: '/case-studies/posts/your-case-study/images/screenshot-1.jpg'
    alt: 'System architecture diagram'
    caption: 'The new cloud architecture deployed on Azure'
  - url: '/case-studies/posts/your-case-study/images/screenshot-2.jpg'
    alt: 'Performance metrics dashboard'
    caption: 'Real-time performance monitoring dashboard'
  - url: '/case-studies/posts/your-case-study/images/screenshot-3.jpg'
    alt: 'User interface redesign'
    # Caption is optional
```

**Carousel Features:**

- Users click the featured image to open fullscreen carousel
- Navigate with arrow buttons or keyboard (ArrowLeft/ArrowRight)
- Image captions and counter display (e.g., "1 / 3")
- Hover effect on featured image when gallery is present

**Gallery Best Practices:**

1. Include 3-6 images showing key aspects of the project
2. Use high-quality screenshots and diagrams (1200px+ wide)
3. Add descriptive captions explaining what each image shows
4. Provide accessible alt text for all images
5. Show before/after comparisons, architecture diagrams, or UI screenshots

### Metrics Format

```yaml
metrics:
  - label: 'Deployment Time' # What was measured
    value: '-70%' # The result
    description: 'Reduced from hours to minutes' # Context
  - label: 'Infrastructure Costs'
    value: '-50%'
    description: 'Annual savings of $250K'
```

### Testimonial Format

```yaml
testimonial:
  quote: 'The full testimonial text from the client.'
  author: 'Client Full Name'
  role: 'Title, Company Name'
```

## Writing the Case Study Content

After the frontmatter, write your case study in Markdown. Here's the recommended structure:

```markdown
# Case Study: Client Name

## Challenge

Describe the client's situation and the problems they faced. What obstacles were preventing them from achieving their goals?

- Key challenge 1
- Key challenge 2
- Key challenge 3

## Solution

Explain your approach to solving the problem. What strategies did you use? What technologies or methodologies did you implement?

### Approach

- Step 1: What you did first
- Step 2: Next steps
- Step 3: Final implementation

### Technologies & Tools

- Technology 1: Why it was chosen
- Technology 2: Its specific role
- Technology 3: How it solved the problem

## Results

Quantify the outcomes and impact of your work.

### Business Impact

- Result 1 with specific numbers
- Result 2 with measurable outcomes
- Result 3 with client feedback

### Technical Achievements

- Achievement 1
- Achievement 2
- Achievement 3

## Key Takeaways

What lessons were learned? What made this project successful?

1. Takeaway 1
2. Takeaway 2
3. Takeaway 3
```

## Markdown Features

Your case study content supports:

- **Headers** (`#`, `##`, `###`)
- **Bold** and _italic_ text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Images: `![Alt text](/path/to/image.jpg)`
- Links: `[Text](https://example.com)`
- Blockquotes for callouts
- Tables
- Horizontal rules (`---`)

## Example Code Block

\`\`\`typescript
// Example code from the project
interface ProjectConfig {
name: string;
features: string[];
}

const config: ProjectConfig = {
name: 'Client Platform',
features: ['feature1', 'feature2'],
};
\`\`\`

## Adding Images

1. Place images in `public/case-studies/posts/your-case-study/images/`
2. Reference them in your markdown:
   ```markdown
   ![Architecture Diagram](/case-studies/posts/your-case-study/images/diagram.png)
   ```
3. Or set as featured image in frontmatter:
   ```yaml
   imageUrl: '/case-studies/posts/your-case-study/images/hero.jpg'
   imageAlt: 'Project overview screenshot'
   ```

## Best Practices

### Frontmatter

- Use descriptive service categories
- Include 4-8 technologies
- Keep description under 160 characters
- Always set featured status
- Include 2-4 key metrics

### Content

- Start with the client's challenge
- Focus on your solution and approach
- Quantify results with specific numbers
- Include client testimonial when possible
- Use visuals to illustrate key points
- Highlight technical achievements

### Images

- Use high-quality screenshots and diagrams
- Optimize images before adding (< 500KB)
- Provide descriptive alt text
- Show before/after when applicable

### Metrics

- Focus on business impact
- Use percentages, multiples, or concrete numbers
- Provide context for each metric
- Highlight the most impressive results

## Complete Example

Here's a complete example case study:

**File:** `public/case-studies/posts/enterprise-transformation/markdown/post.md`

```markdown
---
title: 'Enterprise Digital Transformation'
client: 'TechCorp Solutions'
industry: 'Technology'
description: 'Complete digital transformation for mid-sized enterprise, achieving 70% faster deployments and 50% cost reduction through cloud-native architecture.'
services: ['consulting', 'development']
technologies:
  [
    'Azure',
    'Docker',
    'Kubernetes',
    'TypeScript',
    'Next.js',
    'Node.js',
    'PostgreSQL',
  ]
publishedDate: '2025-01-10'
projectDuration: '6 months'
featured: true
imageUrl: '/case-studies/posts/enterprise-transformation/images/hero.jpg'
imageAlt: 'Cloud infrastructure architecture diagram'
seoTitle: 'Case Study: Enterprise Digital Transformation - TechCorp Solutions'
seoDescription: 'Learn how cloud-native transformation delivered 70% faster deployments and 50% cost reduction for TechCorp Solutions.'
seoKeywords:
  [
    'digital transformation',
    'cloud migration',
    'microservices',
    'enterprise architecture',
  ]
metrics:
  - label: 'Deployment Time'
    value: '-70%'
    description: 'Reduced from hours to minutes'
  - label: 'Infrastructure Costs'
    value: '-50%'
    description: 'Annual savings of $250K'
  - label: 'System Performance'
    value: '3x'
    description: 'Faster response times'
  - label: 'Team Productivity'
    value: '+60%'
    description: 'More features delivered'
testimonial:
  quote: 'Fluxline transformed our entire technology stack and culture. Their systematic approach made what seemed impossible feel achievable.'
  author: 'Sarah Chen'
  role: 'CTO, TechCorp Solutions'
---

# Enterprise Digital Transformation

## Challenge

TechCorp Solutions was struggling with outdated legacy systems that hindered growth and innovation. Their monolithic architecture presented several critical challenges:

- **Slow Deployment**: 18+ month release cycles prevented rapid iteration
- **High Costs**: Expensive infrastructure with poor resource utilization
- **Limited Scalability**: Unable to handle traffic spikes or growth
- **Technical Debt**: Aging codebase difficult to maintain and extend
- **Team Morale**: Developers frustrated with outdated tools and processes

## Solution

We designed and implemented a comprehensive, phased migration strategy to cloud-native microservices architecture.

### Our Approach

1. **Discovery & Assessment** (Weeks 1-4)
   - Conducted thorough system audits
   - Identified critical dependencies
   - Created migration roadmap

2. **Architecture Design** (Weeks 5-8)
   - Designed modular microservices blueprint
   - Planned data migration strategy
   - Established DevOps practices

3. **Implementation** (Weeks 9-20)
   - Phased migration of services
   - Containerization with Docker
   - Kubernetes orchestration setup
   - CI/CD pipeline automation

4. **Training & Knowledge Transfer** (Weeks 21-24)
   - Team training on modern practices
   - Documentation and runbooks
   - Handoff and support planning

### Technologies & Architecture

**Cloud Infrastructure**

- **Azure Cloud Services**: Scalable, reliable hosting
- **Kubernetes**: Container orchestration
- **Docker**: Application containerization

**Application Stack**

- **Next.js & React**: Modern frontend framework
- **Node.js**: Scalable backend services
- **PostgreSQL**: Reliable data storage
- **Redis**: Caching and session management

**DevOps & Automation**

- **Azure DevOps**: CI/CD pipelines
- **Terraform**: Infrastructure as Code
- **Monitoring**: Application insights and logging

## Results

The transformation delivered exceptional results across all key metrics:

### Business Impact

- **Deployment Time**: Reduced from hours to minutes (-70%)
- **Infrastructure Costs**: $250K annual savings (-50%)
- **Time to Market**: New features in weeks instead of months
- **Competitive Position**: Significantly improved market responsiveness

### Technical Achievements

- **System Performance**: 3x faster response times
- **Scalability**: Auto-scaling handles traffic spikes seamlessly
- **Reliability**: 99.9% uptime achieved
- **Team Productivity**: 60% increase in feature delivery

### Cultural Transformation

- Team empowered with modern tools and practices
- Developer satisfaction scores increased dramatically
- Cross-functional collaboration improved
- Innovation culture established

## Key Takeaways

1. **Phased Approach Works**: Incremental migration reduced risk and maintained business continuity
2. **Training is Critical**: Investing in team education ensured long-term success
3. **Culture Matters**: Technical transformation must include organizational change
4. **Measure Everything**: Clear metrics validated ROI and guided decisions

---

_This transformation positioned TechCorp Solutions for sustained growth and competitive advantage in their rapidly evolving market._
```

## Building and Deploying

After creating your case study:

1. **Test locally**:

   ```bash
   yarn dev
   ```

   Visit `http://localhost:3000/case-studies` to see your study

2. **Build for production**:

   ```bash
   yarn build
   ```

   This generates static HTML for your case study

3. **Deploy**:
   Push to your git repository and CI/CD will deploy automatically

## Troubleshooting

### Case study not appearing

- Verify `post.md` is in the `markdown/` subfolder
- Check frontmatter is valid YAML
- Ensure all required fields are present
- Run `yarn build` to regenerate static pages

### Images not loading

- Check image paths start with `/case-studies/posts/`
- Verify images exist in the `images/` folder
- Ensure filenames match exactly (case-sensitive)

### Frontmatter errors

- Check YAML syntax (indentation, quotes, colons)
- Verify dates are in YYYY-MM-DD format
- Ensure arrays use proper list syntax
- Validate service names match allowed values

## Need Help?

- Review existing case studies for examples
- Check the blog guide (`FILE_BASED_BLOG_GUIDE.md`)
- Consult technical docs (`README.md`)

---

**Ready to showcase your success stories!** 🎯

_Last updated: December 4, 2025_
