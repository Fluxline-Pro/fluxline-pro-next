# How to Create a Blog Post

Welcome! This guide will walk you through creating a new blog post for the Fluxline Pro website.

## Quick Start (5 Steps)

1. **Create a folder** with your post's URL-friendly name
2. **Add two subfolders**: `markdown/` and `images/`
3. **Create `post.md`** file with frontmatter and content
4. **Add your images** to the `images/` folder
5. **Build the site** with `yarn build`

That's it! Your post will automatically appear on the blog.

---

## Step-by-Step Guide

### Step 1: Create Your Post Folder

Create a new folder in `/public/blog/posts/` with a URL-friendly slug (lowercase, hyphens instead of spaces):

```
public/blog/posts/
└── your-awesome-post/          ← Your new folder
```

**Good folder names:**

- `mastering-react-hooks`
- `guide-to-web-accessibility`
- `nextjs-performance-tips`

**Bad folder names:**

- `My Awesome Post` (spaces)
- `Post#1` (special characters)
- `POST_123` (underscores, all caps)

### Step 2: Create the Folder Structure

Inside your post folder, create two subfolders:

```
your-awesome-post/
├── markdown/                   ← For your post content
│   └── post.md                ← This is where you write
└── images/                     ← For your images
    └── (your images go here)
```

### Step 3: Create Your Markdown File

Create a file called `post.md` inside the `markdown/` folder.

**Template:**

```markdown
---
title: 'Your Blog Post Title'
excerpt: 'A brief 1-2 sentence description that appears on the blog listing page'
author: 'Your Name'
publishedDate: '2025-11-24'
category: 'Technology'
tags: ['Tag1', 'Tag2', 'Tag3']
imageUrl: '/blog/posts/your-awesome-post/images/hero.jpg'
imageAlt: 'Description of your hero image'
seoTitle: 'SEO-Optimized Title for Search Engines'
seoDescription: 'SEO-optimized description (150-160 characters)'
seoKeywords: ['keyword1', 'keyword2', 'keyword3']
---

# Your Blog Post Title

Your introduction paragraph goes here...

## First Section

Your content here...

### Subsection

More content...

## Conclusion

Wrap it up!
```

### Step 4: Understanding Frontmatter

The section between `---` marks is called "frontmatter" - it's metadata about your post.

#### Required Fields

| Field            | Example                             | Description                                          |
| ---------------- | ----------------------------------- | ---------------------------------------------------- |
| `title`          | `"Mastering React Hooks"`           | Your post title                                      |
| `excerpt`        | `"Learn how to use React hooks..."` | Brief description (1-2 sentences)                    |
| `author`         | `"Sarah Chen"`                      | Your name                                            |
| `publishedDate`  | `"2025-11-24"`                      | Date in YYYY-MM-DD format                            |
| `category`       | `"Technology"`                      | Choose from: Technology, Development, Design, Growth |
| `tags`           | `["React", "JavaScript"]`           | 3-6 tags as an array                                 |
| `seoTitle`       | `"React Hooks Guide..."`            | Title for Google (50-60 chars)                       |
| `seoDescription` | `"Complete guide to..."`            | Description for Google (150-160 chars)               |
| `seoKeywords`    | `["React", "hooks"]`                | 5-10 keywords                                        |

#### Optional Fields

| Field         | Example                                   | Description                  |
| ------------- | ----------------------------------------- | ---------------------------- |
| `imageUrl`    | `"/blog/posts/your-post/images/hero.jpg"` | Hero image path              |
| `imageAlt`    | `"React hooks diagram"`                   | Hero image description       |
| `gallery`     | See gallery section below                 | Array of images for carousel |
| `featured`    | `true`                                    | Mark as featured post        |
| `lastUpdated` | `"2025-11-25"`                            | When you last updated        |

#### Image Gallery & Carousel (Optional)

You can add multiple images to your blog post that users can view in a fullscreen carousel modal. When you add a `gallery` array to your frontmatter, users can click the hero image to open the carousel and navigate through all images with left/right arrows and keyboard controls.

**Gallery Format:**

```yaml
gallery:
  - url: '/blog/posts/your-post/images/screenshot-1.jpg'
    alt: 'First screenshot showing the dashboard'
    caption: 'The main dashboard with real-time data'
  - url: '/blog/posts/your-post/images/screenshot-2.jpg'
    alt: 'Second screenshot of the analytics view'
    caption: 'Analytics panel with detailed metrics'
  - url: '/blog/posts/your-post/images/screenshot-3.jpg'
    alt: 'Third screenshot'
    # Caption is optional
```

**Gallery Features:**

- **Automatic Carousel**: Gallery images automatically enable a fullscreen carousel modal
- **Navigation**: Users can navigate with left/right arrow buttons or keyboard (ArrowLeft/ArrowRight)
- **Image Captions**: Optional captions display below each image in the carousel
- **Image Counter**: Shows "1 / 3" etc. to indicate current position
- **Hover Effect**: The hero image shows a hover effect (slides up) when carousel is enabled
- **Click to Open**: Clicking the hero image opens the carousel modal

**Best Practices:**

1. Include 2-6 images in a gallery (too few = not worth carousel, too many = overwhelming)
2. Use high-quality images (at least 1200px wide)
3. Keep captions concise (1-2 sentences)
4. Provide descriptive `alt` text for accessibility
5. Use consistent aspect ratios for a professional look

### Step 5: Writing Your Content

After the frontmatter, write your blog post using Markdown.

#### Headings

```markdown
# Main Title (H1) - Only use once at the top

## Section (H2)

### Subsection (H3)

#### Minor Heading (H4)
```

#### Text Formatting

```markdown
**Bold text**
_Italic text_
**_Bold and italic_**
`inline code`
```

#### Lists

**Unordered:**

```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```

**Ordered:**

```markdown
1. First step
2. Second step
3. Third step
```

#### Links

```markdown
[Link text](https://example.com)
[Internal link](/about)
```

#### Images

```markdown
![Alt text](/blog/posts/your-awesome-post/images/diagram.png)
```

**Important:** Always use the **full path** starting with `/blog/posts/`

#### Code Blocks

**Inline code:**

```markdown
Use the `useState` hook for state management.
```

**Code block:**

````markdown
```typescript
const example = 'Hello World';
console.log(example);
```
````

Supported languages: `typescript`, `javascript`, `python`, `bash`, `css`, `html`, `json`, `markdown`

#### Blockquotes

```markdown
> This is a quote
> It can span multiple lines
```

#### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

#### Horizontal Rules

```markdown
---
```

### Step 6: Adding Images

1. **Add images** to your `images/` folder:

   ```
   your-awesome-post/
   └── images/
       ├── hero.jpg          ← Featured image
       ├── diagram.png       ← Content image
       └── screenshot.jpg    ← Another image
   ```

2. **Reference images** in your markdown:

   ```markdown
   ![Diagram showing React lifecycle](/blog/posts/your-awesome-post/images/diagram.png)
   ```

3. **Image best practices:**
   - **Optimize images** before adding (compress, resize)
   - **Recommended hero size**: 1200x675px (16:9 ratio)
   - **Max file size**: Keep under 500KB
   - **Formats**: WebP, JPEG, or PNG
   - **Always include alt text** for accessibility

### Step 7: Build and Deploy

Once your post is ready:

```bash
# Build the site
yarn build

# This will:
# ✓ Generate your blog post page
# ✓ Add it to the blog listing
# ✓ Create tag and category filter pages
# ✓ Generate SEO metadata
```

Your post will be live at: `https://yoursite.com/blog/your-awesome-post`

---

## Complete Example

Here's a complete, ready-to-use example:

**File:** `public/blog/posts/mastering-typescript/markdown/post.md`

````markdown
---
title: 'Mastering TypeScript: A Practical Guide'
excerpt: 'Learn TypeScript fundamentals with practical examples and real-world applications that will level up your development skills.'
author: 'Alex Johnson'
publishedDate: '2025-11-24'
category: 'Development'
tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development']
imageUrl: '/blog/posts/mastering-typescript/images/typescript-hero.jpg'
imageAlt: 'TypeScript logo with code in background'
seoTitle: 'Mastering TypeScript: Complete Practical Guide for Developers'
seoDescription: 'Comprehensive TypeScript guide with practical examples, best practices, and real-world applications. Perfect for JavaScript developers.'
seoKeywords:
  [
    'TypeScript',
    'JavaScript',
    'web development',
    'programming',
    'type safety',
    'TypeScript guide',
  ]
featured: true
---

# Mastering TypeScript: A Practical Guide

TypeScript has revolutionized the way we write JavaScript by adding static typing and powerful tooling. In this comprehensive guide, we'll explore TypeScript from the ground up.

## Why TypeScript?

TypeScript offers several compelling advantages:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete and IntelliSense
- **Improved Refactoring**: Confidently change code
- **Enhanced Documentation**: Types serve as documentation

## Getting Started

First, install TypeScript:

```bash
npm install -g typescript
```
````

Create your first TypeScript file:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## Core Concepts

### Basic Types

TypeScript provides several basic types:

```typescript
let isDone: boolean = false;
let count: number = 42;
let username: string = 'Alice';
let list: number[] = [1, 2, 3];
```

### Interfaces

Define object shapes with interfaces:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
};
```

### Type Aliases

Create reusable type definitions:

```typescript
type ID = string | number;
type Status = 'pending' | 'active' | 'completed';

function processItem(id: ID, status: Status): void {
  console.log(`Processing item ${id} with status ${status}`);
}
```

## Advanced Features

### Generics

Write reusable, type-safe code:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>('Hello');
const numOutput = identity<number>(42);
```

### Union Types

Combine multiple types:

```typescript
function formatValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

## Best Practices

Here are some essential TypeScript best practices:

1. **Enable Strict Mode** - Use `"strict": true` in tsconfig.json
2. **Avoid `any`** - Use `unknown` or proper types
3. **Use Type Guards** - Implement runtime type checking
4. **Leverage Utility Types** - Use `Partial`, `Required`, `Pick`, etc.
5. **Document Complex Types** - Add JSDoc comments

## Real-World Example

Here's a practical example of TypeScript in action:

```typescript
interface BlogPost {
  id: string;
  title: string;
  author: string;
  publishedDate: Date;
  tags: string[];
}

class BlogManager {
  private posts: BlogPost[] = [];

  addPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const newPost: BlogPost = {
      id: this.generateId(),
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  getPostsByTag(tag: string): BlogPost[] {
    return this.posts.filter((post) => post.tags.includes(tag));
  }

  private generateId(): string {
    return `post-${Date.now()}`;
  }
}
```

## Conclusion

TypeScript is a powerful tool that enhances JavaScript development with type safety and better tooling. By following the practices outlined in this guide, you'll be well on your way to mastering TypeScript.

### Next Steps

- Explore the [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Practice with real projects
- Join the TypeScript community
- Stay updated with new features

Happy coding! 🚀

```

---

## Tips and Tricks

### Writing Great Blog Posts

1. **Start with an outline** - Plan your structure
2. **Use clear headings** - Help readers scan
3. **Keep paragraphs short** - 3-4 sentences max
4. **Add code examples** - Show, don't just tell
5. **Include images** - Break up text, add visual interest
6. **End with action** - Give readers next steps

### SEO Tips

1. **Use keywords naturally** - Don't stuff keywords
2. **Write compelling titles** - Make people want to click
3. **Optimize images** - Use descriptive filenames and alt text
4. **Internal linking** - Link to other blog posts
5. **Keep it updated** - Use `lastUpdated` when you revise

### Common Mistakes to Avoid

- ❌ Forgetting to close frontmatter with `---`
- ❌ Using relative image paths (`./images/` instead of `/blog/posts/...`)
- ❌ Forgetting to run `yarn build` after creating a post
- ❌ Not optimizing images (huge file sizes)
- ❌ Missing required frontmatter fields
- ❌ Inconsistent date formats (use YYYY-MM-DD)

---

## Troubleshooting

### My post doesn't appear

1. Check that `post.md` is in the `markdown/` subfolder
2. Verify frontmatter is complete and properly formatted
3. Make sure dates are in YYYY-MM-DD format
4. Run `yarn build` to regenerate pages
5. Check console for error messages

### Images don't load

1. Verify images are in the `images/` folder
2. Check you're using absolute paths: `/blog/posts/your-post/images/file.jpg`
3. Confirm image files exist and have correct extensions
4. Check for typos in image filenames

### Build errors

1. Check for unclosed frontmatter (missing `---`)
2. Verify all required fields are present
3. Check for syntax errors in frontmatter (YAML format)
4. Look at terminal output for specific error messages

---

## Need Help?

- **Full Documentation**: See `FILE_BASED_BLOG_GUIDE.md` in the root directory
- **Technical Details**: See `BLOG_IMPLEMENTATION.md`
- **Quick Reference**: See `BLOG_README.md`

---

**Happy blogging!** 🎉

*Last updated: November 24, 2025*
```
