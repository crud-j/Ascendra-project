import type { LessonData } from "@/types/lesson";

export const HTML_CSS_LESSONS: LessonData[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. Document Structure
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "document-structure",
    title: "Document Structure",
    explanation: `## Every web page is an HTML document

HTML (HyperText Markup Language) is the skeleton of every web page. Before writing any content, we need to set up the document's structure correctly.

### The Required Boilerplate

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <!-- Content goes here -->
</body>
</html>
\`\`\`

### What each piece does

| Tag | Purpose |
|-----|---------|
| \`<!DOCTYPE html>\` | Tells the browser this is HTML5 |
| \`<html lang="en">\` | Root element; \`lang\` helps screen readers |
| \`<head>\` | Contains metadata — nothing visible here |
| \`<meta charset="UTF-8">\` | Supports all characters (emojis, accents…) |
| \`<meta name="viewport"…>\` | Makes the page work on mobile screens |
| \`<title>\` | The text in the browser tab |
| \`<body>\` | Everything the user sees |

### Your first exercise

Write a complete HTML document for a bakery website. The page should have a proper title and display a heading with the bakery's name.`,
    exercise: {
      instructions: `Create a complete HTML document for **Sweet Crumbs Bakery**.

Requirements:
- Correct \`<!DOCTYPE>\`, \`<html>\`, \`<head>\`, and \`<body>\` structure
- Set the page \`<title>\` to \`Sweet Crumbs Bakery\`
- Inside \`<body>\`, add an \`<h1>\` with the text \`Welcome to Sweet Crumbs Bakery\`
- Add a \`<p>\` tag below it with any short description`,
      startCode: {
        html: `<!-- Complete the HTML document structure below -->



`,
        css: `/* Styles will be added in later lessons */
body {
  font-family: Georgia, serif;
  padding: 40px;
  color: #333;
}`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sweet Crumbs Bakery</title>
</head>
<body>
  <h1>Welcome to Sweet Crumbs Bakery</h1>
  <p>Freshly baked goods made with love every morning.</p>
</body>
</html>`,
        css: `body {
  font-family: Georgia, serif;
  padding: 40px;
  color: #333;
}`,
      },
      hints: [
        "Start with `<!DOCTYPE html>` on the very first line — this is mandatory.",
        "The `<head>` tag comes before `<body>`. Put your `<title>` inside `<head>`, not `<body>`.",
        "The `<h1>` and `<p>` elements go inside the `<body>` tag. Remember to close every tag you open.",
      ],
      successMessage: "Great structure! Every valid HTML document follows this exact pattern.",
      checks: [
        { type: "html-contains", value: "<!DOCTYPE html>" },
        { type: "html-contains", value: "<title>Sweet Crumbs Bakery</title>" },
        { type: "html-contains", value: "<h1>" },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. Semantic Elements
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "semantic-elements",
    title: "Semantic Elements",
    explanation: `## HTML is more than just containers

Semantic HTML uses tags that describe their *meaning*, not just their appearance. This helps search engines, screen readers, and other developers understand your content.

### Non-semantic vs Semantic

\`\`\`html
<!-- ❌ Non-semantic — gives no clue what this is -->
<div>
  <div>My Blog</div>
  <div>About</div>
</div>

<!-- ✅ Semantic — instantly readable -->
<header>
  <h1>My Blog</h1>
  <nav>About</nav>
</header>
\`\`\`

### The Key Semantic Elements

| Element | Used for |
|---------|---------|
| \`<header>\` | Page or section header (logo, nav) |
| \`<nav>\` | Navigation links |
| \`<main>\` | Primary content (one per page) |
| \`<section>\` | Thematic group of content |
| \`<article>\` | Self-contained content (blog post, card) |
| \`<aside>\` | Sidebar or related content |
| \`<footer>\` | Page or section footer |

### Why it matters

1. **SEO** — Google understands your page structure
2. **Accessibility** — Screen readers navigate by landmarks
3. **Maintainability** — Other developers can read your code

The visual result is identical to using \`<div>\` — semantics are about *meaning*, not looks.`,
    exercise: {
      instructions: `Build the structure of a **blog post page** using semantic HTML.

Requirements:
- A \`<header>\` containing an \`<h1>\` with "The Coding Chronicles"
- A \`<nav>\` with three links: Home, Articles, About
- A \`<main>\` containing an \`<article>\` with:
  - \`<h2>\` heading: "Why I Love CSS"
  - Two \`<p>\` paragraphs of content
- An \`<aside>\` with "Related Posts" heading and a short list
- A \`<footer>\` with copyright text`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Coding Chronicles</title>
</head>
<body>
  <!-- Add your semantic structure here -->

</body>
</html>`,
        css: `body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
header { border-bottom: 2px solid #eee; padding-bottom: 16px; margin-bottom: 24px; }
nav a { margin-right: 16px; text-decoration: none; color: #0066cc; }
aside { background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 24px; }
footer { border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px; color: #888; font-size: 14px; }`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Coding Chronicles</title>
</head>
<body>
  <header>
    <h1>The Coding Chronicles</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Articles</a>
      <a href="#">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why I Love CSS</h2>
      <p>CSS is the language of the web that makes things beautiful. With just a few lines, you can transform a plain HTML document into a stunning visual experience.</p>
      <p>The cascade, specificity, and inheritance make CSS a powerful — and sometimes surprising — tool. But once you understand it, you can create anything.</p>
    </article>
  </main>

  <aside>
    <h3>Related Posts</h3>
    <ul>
      <li>Getting Started with Flexbox</li>
      <li>CSS Grid in 5 Minutes</li>
    </ul>
  </aside>

  <footer>
    <p>&copy; 2024 The Coding Chronicles. All rights reserved.</p>
  </footer>
</body>
</html>`,
        css: `body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
header { border-bottom: 2px solid #eee; padding-bottom: 16px; margin-bottom: 24px; }
nav a { margin-right: 16px; text-decoration: none; color: #0066cc; }
aside { background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 24px; }
footer { border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px; color: #888; font-size: 14px; }`,
      },
      hints: [
        "Start with `<header>` right after `<body>`. It wraps the site title and navigation.",
        "The `<nav>` goes inside `<header>`. Use `<a href='#'>` for placeholder links.",
        "Wrap your blog post content in `<main>` → `<article>`. The `<aside>` is a sibling to `<main>`, not inside it.",
      ],
      successMessage: "Excellent semantic structure! Search engines will love your page.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. Forms & Inputs
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "forms-inputs",
    title: "Forms & Inputs",
    explanation: `## Forms are how users talk back to your page

HTML forms collect data — from login credentials to search queries to checkout information. Every form needs a \`<form>\` wrapper, \`<label>\` elements, and \`<input>\` fields.

### The anatomy of a form field

\`\`\`html
<!-- Always pair every input with a label -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" placeholder="you@example.com" required>
\`\`\`

The \`for\` attribute on \`<label>\` must match the \`id\` on \`<input>\` — this links them for accessibility.

### Common input types

\`\`\`html
<input type="text">       <!-- Single line text -->
<input type="email">      <!-- Validates email format -->
<input type="password">   <!-- Hides characters -->
<input type="number">     <!-- Numbers only -->
<input type="checkbox">   <!-- On/off toggle -->
<input type="radio">      <!-- One of many -->
<input type="submit">     <!-- Submit button -->
<textarea rows="4">       <!-- Multi-line text -->
<select>                  <!-- Dropdown -->
  <option value="a">A</option>
</select>
\`\`\`

### Form attributes

- \`action\` — Where to send the data (a URL)
- \`method\` — \`GET\` or \`POST\`
- \`required\` — Makes a field mandatory
- \`placeholder\` — Ghost text before typing`,
    exercise: {
      instructions: `Build a **contact form** for a web design agency.

Requirements:
- A \`<form>\` element with \`action="#"\` and \`method="post"\`
- **Full Name**: text input, required, with label
- **Email**: email input, required, with label
- **Subject**: a \`<select>\` dropdown with options: "General Inquiry", "Project Quote", "Support"
- **Message**: a \`<textarea>\` with 5 rows, with label
- A **Send Message** submit button
- All inputs must have matching \`for\`/\`id\` pairs`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us</title>
</head>
<body>
  <h1>Contact Us</h1>
  <!-- Build your form here -->

</body>
</html>`,
        css: `body { font-family: system-ui, sans-serif; max-width: 520px; margin: 40px auto; padding: 20px; }
h1 { margin-bottom: 24px; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
label { font-size: 14px; font-weight: 600; color: #374151; }
input, select, textarea {
  border: 1px solid #d1d5db; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; font-family: inherit;
}
input:focus, select:focus, textarea:focus {
  outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
}
button {
  width: 100%; background: #6366f1; color: white;
  border: none; border-radius: 8px; padding: 12px; font-size: 15px;
  font-weight: 600; cursor: pointer;
}
button:hover { background: #4f46e5; }`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us</title>
</head>
<body>
  <h1>Contact Us</h1>

  <form action="#" method="post">
    <div class="field">
      <label for="name">Full Name</label>
      <input type="text" id="name" name="name" placeholder="Jane Smith" required>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="jane@example.com" required>
    </div>

    <div class="field">
      <label for="subject">Subject</label>
      <select id="subject" name="subject">
        <option value="general">General Inquiry</option>
        <option value="quote">Project Quote</option>
        <option value="support">Support</option>
      </select>
    </div>

    <div class="field">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" placeholder="Tell us about your project…"></textarea>
    </div>

    <button type="submit">Send Message</button>
  </form>
</body>
</html>`,
        css: `body { font-family: system-ui, sans-serif; max-width: 520px; margin: 40px auto; padding: 20px; }
h1 { margin-bottom: 24px; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
label { font-size: 14px; font-weight: 600; color: #374151; }
input, select, textarea {
  border: 1px solid #d1d5db; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; font-family: inherit;
}
input:focus, select:focus, textarea:focus {
  outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
}
button {
  width: 100%; background: #6366f1; color: white;
  border: none; border-radius: 8px; padding: 12px; font-size: 15px;
  font-weight: 600; cursor: pointer;
}
button:hover { background: #4f46e5; }`,
      },
      hints: [
        "Wrap the `<form>` around everything. Each field should be in a `<div class='field'>` for the CSS to work.",
        "The `for` attribute on `<label>` must exactly match the `id` on the paired input. Example: `<label for='name'>` matches `<input id='name'>`.",
        "For the dropdown, use `<select id='subject' name='subject'>` with `<option value='...'>` children inside. The `<textarea>` uses a closing tag — don't self-close it.",
      ],
      successMessage: "Perfect form! Your users can now get in touch.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. Tables & Lists
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "tables-lists",
    title: "Tables & Lists",
    explanation: `## Organising data with tables and lists

### Lists

HTML has three types of lists:

\`\`\`html
<!-- Unordered (bullets) -->
<ul>
  <li>Apples</li>
  <li>Bananas</li>
</ul>

<!-- Ordered (numbers) -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<!-- Description list (key-value pairs) -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>
\`\`\`

### Tables

Use tables for *tabular data* — information that has rows and columns.

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Coffee</td>
      <td>$3.50</td>
    </tr>
  </tbody>
</table>
\`\`\`

| Element | Meaning |
|---------|---------|
| \`<table>\` | Wrapper |
| \`<thead>\` | Header rows |
| \`<tbody>\` | Body rows |
| \`<tr>\` | Table row |
| \`<th>\` | Header cell (bold, centered by default) |
| \`<td>\` | Data cell |

⚠️ **Don't** use tables for page layout — that was a 1990s hack. Use CSS Grid/Flexbox instead.`,
    exercise: {
      instructions: `Create a **restaurant menu page** with both a list and a table.

Requirements:
- An \`<h1>\` heading: "La Bella Pasta"
- A \`<h2>\` "Today's Specials" followed by an unordered list of 3 specials
- A \`<h2>\` "Full Menu" followed by a \`<table>\` with:
  - Header row: Dish | Description | Price
  - At least 4 data rows with realistic restaurant items`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>La Bella Pasta</title>
</head>
<body>
  <!-- Build the menu page here -->

</body>
</html>`,
        css: `body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #2d2d2d; }
h1 { color: #8B0000; font-size: 2rem; }
h2 { color: #5a3e2b; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
ul li { margin-bottom: 8px; font-style: italic; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th { background: #8B0000; color: white; text-align: left; padding: 10px 14px; }
td { padding: 10px 14px; border-bottom: 1px solid #eee; }
tr:hover td { background: #fdf6f0; }`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>La Bella Pasta</title>
</head>
<body>
  <h1>La Bella Pasta</h1>

  <h2>Today's Specials</h2>
  <ul>
    <li>Truffle Ravioli with brown butter sage sauce</li>
    <li>Grilled Salmon with lemon caper risotto</li>
    <li>Mushroom Pappardelle with pecorino and walnuts</li>
  </ul>

  <h2>Full Menu</h2>
  <table>
    <thead>
      <tr>
        <th>Dish</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Spaghetti Carbonara</td>
        <td>Guanciale, egg, Pecorino Romano, black pepper</td>
        <td>$18</td>
      </tr>
      <tr>
        <td>Penne Arrabbiata</td>
        <td>San Marzano tomatoes, chilli, garlic, basil</td>
        <td>$16</td>
      </tr>
      <tr>
        <td>Tagliatelle al Ragù</td>
        <td>Slow-cooked beef and pork bolognese</td>
        <td>$20</td>
      </tr>
      <tr>
        <td>Linguine alle Vongole</td>
        <td>Fresh clams, white wine, parsley, lemon</td>
        <td>$24</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
        css: `body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #2d2d2d; }
h1 { color: #8B0000; font-size: 2rem; }
h2 { color: #5a3e2b; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
ul li { margin-bottom: 8px; font-style: italic; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th { background: #8B0000; color: white; text-align: left; padding: 10px 14px; }
td { padding: 10px 14px; border-bottom: 1px solid #eee; }
tr:hover td { background: #fdf6f0; }`,
      },
      hints: [
        "For the unordered list, use `<ul>` as the wrapper and `<li>` for each special.",
        "A table needs `<table>` → `<thead>` → `<tr>` → `<th>` for headers, then `<tbody>` → `<tr>` → `<td>` for data rows.",
        "Make sure each `<tr>` has the same number of cells as your header row (3 cells: Dish, Description, Price).",
      ],
      successMessage: "Delicious table! You've mastered lists and tabular data.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. Selectors & Specificity
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "selectors-specificity",
    title: "Selectors & Specificity",
    explanation: `## How CSS decides which rule wins

### Types of Selectors

\`\`\`css
/* Element selector — targets all <p> tags */
p { color: gray; }

/* Class selector — targets class="highlight" */
.highlight { background: yellow; }

/* ID selector — targets id="hero" */
#hero { font-size: 2rem; }

/* Descendant — <a> inside <nav> only */
nav a { text-decoration: none; }

/* Child — direct children only */
ul > li { list-style: none; }

/* Multiple — comma-separated */
h1, h2, h3 { font-weight: 700; }

/* Attribute selector */
input[type="email"] { border-color: blue; }
\`\`\`

### Specificity — the tiebreaker

When two rules target the same element, **specificity** decides which wins.

| Selector type | Specificity value |
|---------------|------------------|
| \`!important\` | Overrides everything (use sparingly!) |
| Inline style (\`style=""\`) | 1000 |
| ID (\`#hero\`) | 100 |
| Class, attribute, pseudo-class | 10 |
| Element (\`p\`, \`div\`) | 1 |

\`\`\`css
p { color: blue; }          /* specificity: 1 */
.text { color: red; }       /* specificity: 10 — WINS */
#intro p { color: green; }  /* specificity: 101 — WINS */
\`\`\`

The rule with the **higher specificity number always wins**, regardless of order.`,
    exercise: {
      instructions: `Style a product card using **multiple selector types**.

Requirements:
- The \`.card\` class should have a white background, border, border-radius, and padding
- Target the \`h2\` **inside** \`.card\` to make it dark blue
- Target \`p\` inside \`.card\` to make it gray, 14px
- The \`.price\` class should be green, bold, and 20px
- The \`#badge\` ID should have a red background, white text, and rounded corners
- Add a hover effect on \`.card\` using a class or descendant selector`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Card</title>
</head>
<body>
  <div class="card">
    <span id="badge">NEW</span>
    <h2>Wireless Headphones</h2>
    <p>Premium sound quality with 40-hour battery life and active noise cancellation.</p>
    <p class="price">$149.99</p>
  </div>
</body>
</html>`,
        css: `body { background: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }

/* Write your CSS selectors below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Card</title>
</head>
<body>
  <div class="card">
    <span id="badge">NEW</span>
    <h2>Wireless Headphones</h2>
    <p>Premium sound quality with 40-hour battery life and active noise cancellation.</p>
    <p class="price">$149.99</p>
  </div>
</body>
</html>`,
        css: `body { background: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  max-width: 320px;
  width: 100%;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.card h2 {
  color: #1e3a5f;
  margin-top: 12px;
}

.card p {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.price {
  color: #059669;
  font-weight: 700;
  font-size: 20px;
}

#badge {
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.05em;
}`,
      },
      hints: [
        "To target an element inside a class, use a descendant selector like `.card h2 { ... }`. The space means 'h2 that is inside .card'.",
        "The `#badge` selector uses a `#` prefix (ID). IDs have high specificity — they'll override class styles for the same property.",
        "For the hover effect: `.card:hover { box-shadow: ... }`. The `:hover` pseudo-class adds 10 to specificity.",
      ],
      successMessage: "You understand selectors! Specificity is one of CSS's trickiest concepts.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. Box Model
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "box-model",
    title: "The Box Model",
    explanation: `## Every element is a box

In CSS, every element is a rectangular box made of four layers (from inside out):

\`\`\`
┌──────────────────────────────┐
│           MARGIN             │  (outside — transparent)
│  ┌────────────────────────┐  │
│  │        BORDER          │  │  (the visible border)
│  │  ┌──────────────────┐  │  │
│  │  │     PADDING      │  │  │  (space inside border)
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  CONTENT   │  │  │  │  (text, images, etc.)
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
\`\`\`

### The Properties

\`\`\`css
.box {
  /* Content */
  width: 200px;
  height: 100px;

  /* Padding: space inside the border */
  padding: 20px;           /* all sides */
  padding: 10px 20px;      /* top/bottom  left/right */
  padding: 5px 10px 15px 20px; /* top right bottom left (clockwise) */

  /* Border */
  border: 2px solid #333;
  border-radius: 8px;      /* rounded corners */

  /* Margin: space outside the border */
  margin: 0 auto;          /* center horizontally */
}
\`\`\`

### The critical gotcha: \`box-sizing\`

By default, \`width\` only applies to the *content*. So a \`200px\` wide element with \`20px padding\` is actually \`240px\` wide!

Fix this with:
\`\`\`css
* { box-sizing: border-box; }
\`\`\`

Now \`width\` includes padding and border — much more predictable.`,
    exercise: {
      instructions: `Create a **profile card** that demonstrates the box model.

Requirements:
- A \`.card\` with width 300px, white background, rounded corners (16px), and a subtle shadow
- Apply \`box-sizing: border-box\` to all elements
- Inside the card: an \`.avatar\` circle (80px × 80px), a name heading, a bio paragraph, and a "Follow" button
- The card should be centred on the page
- Use padding inside the card and margin to space internal elements`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Profile Card</title>
</head>
<body>
  <div class="card">
    <div class="avatar"></div>
    <h2 class="name">Alex Rivera</h2>
    <p class="bio">Full-stack developer & coffee enthusiast. Building things that matter.</p>
    <button class="follow-btn">Follow</button>
  </div>
</body>
</html>`,
        css: `/* Apply box-sizing fix here */


body {
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

/* Style the card and its children below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Profile Card</title>
</head>
<body>
  <div class="card">
    <div class="avatar"></div>
    <h2 class="name">Alex Rivera</h2>
    <p class="bio">Full-stack developer & coffee enthusiast. Building things that matter.</p>
    <button class="follow-btn">Follow</button>
  </div>
</body>
</html>`,
        css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.card {
  width: 300px;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 0 auto 16px;
}

.name {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.bio {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.follow-btn {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}`,
      },
      hints: [
        "Add `* { box-sizing: border-box; }` at the very top of your CSS — this makes widths predictable.",
        "For the avatar circle: set `width` and `height` to `80px`, then `border-radius: 50%` makes it a perfect circle. Use `margin: 0 auto` to center it.",
        "The card's `padding: 32px 24px` means 32px top/bottom and 24px left/right. Use `margin-bottom` on each child to space them vertically.",
      ],
      successMessage: "Perfect box model! This is the foundation of every CSS layout.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 7. Typography
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "typography",
    title: "Typography",
    explanation: `## Words are design

Typography is the art of arranging text. In CSS, you have complete control over how type looks and feels.

### The core typography properties

\`\`\`css
body {
  /* Font */
  font-family: 'Georgia', serif;
  font-size: 16px;          /* base size */
  font-weight: 400;         /* 100–900, or normal/bold */
  font-style: italic;

  /* Line rhythm */
  line-height: 1.6;         /* unitless — relative to font-size */
  letter-spacing: 0.02em;

  /* Alignment */
  text-align: left | center | right | justify;

  /* Decoration */
  text-decoration: underline | none | line-through;
  text-transform: uppercase | lowercase | capitalize;

  /* Color */
  color: #374151;
}
\`\`\`

### Font stacks

Always provide fallbacks:
\`\`\`css
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
/* If Inter isn't available → Helvetica Neue → Arial → any sans-serif */
\`\`\`

### Responsive type with \`clamp()\`

\`\`\`css
h1 {
  /* Min 1.5rem, preferred 4vw, max 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\`

### The golden ratio for readable text
- Line length: **45–75 characters** per line
- Line height: **1.5–1.8** for body text
- Font size: **16–18px** for body, **1.25x scale** for headings`,
    exercise: {
      instructions: `Style a **blog article** with beautiful typography.

Requirements:
- Body: \`system-ui\` font stack, 17px, line-height 1.75, colour \`#374151\`
- \`h1\`: 2.5rem, weight 800, tight letter-spacing, colour \`#111827\`
- \`h2\`: 1.5rem, weight 700, colour \`#1f2937\`
- \`.meta\` (author/date): 13px, uppercase, letter-spacing, colour \`#9ca3af\`
- \`.intro\` (first paragraph): slightly larger, \`#4b5563\`
- \`blockquote\`: italic, left border accent, indented
- Max-width of 680px, centred`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Typography Article</title>
</head>
<body>
  <article>
    <h1>The Art of Writing Clean CSS</h1>
    <p class="meta">By Jordan Lee · June 2024 · 5 min read</p>
    <p class="intro">Good CSS is invisible. Users don't see your stylesheets — they see the experience those stylesheets create.</p>
    <h2>Start with the cascade</h2>
    <p>The cascade is CSS's superpower. Styles inherit from parent to child, and the browser applies its own defaults before your styles even load.</p>
    <blockquote>Write CSS that reads like English. If you have to explain it, it's probably too clever.</blockquote>
    <p>Structure your CSS around components, not pages. A button should look the same whether it's on the homepage or a checkout form.</p>
  </article>
</body>
</html>`,
        css: `/* Style the article typography below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Typography Article</title>
</head>
<body>
  <article>
    <h1>The Art of Writing Clean CSS</h1>
    <p class="meta">By Jordan Lee · June 2024 · 5 min read</p>
    <p class="intro">Good CSS is invisible. Users don't see your stylesheets — they see the experience those stylesheets create.</p>
    <h2>Start with the cascade</h2>
    <p>The cascade is CSS's superpower. Styles inherit from parent to child, and the browser applies its own defaults before your styles even load.</p>
    <blockquote>Write CSS that reads like English. If you have to explain it, it's probably too clever.</blockquote>
    <p>Structure your CSS around components, not pages. A button should look the same whether it's on the homepage or a checkout form.</p>
  </article>
</body>
</html>`,
        css: `* { box-sizing: border-box; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: #374151;
  margin: 0;
  padding: 40px 20px;
}

article {
  max-width: 680px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 12px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.meta {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 28px;
}

.intro {
  font-size: 19px;
  color: #4b5563;
  line-height: 1.65;
  margin-bottom: 2rem;
}

blockquote {
  font-style: italic;
  color: #6b7280;
  border-left: 3px solid #6366f1;
  margin: 2rem 0;
  padding: 4px 0 4px 20px;
}`,
      },
      hints: [
        "Set your base font on `body`. Child elements inherit `font-family`, `font-size`, and `color` automatically.",
        "Use `em` units for letter-spacing (e.g., `letter-spacing: 0.08em`) so it scales with the font size.",
        "`blockquote` gets `border-left: 3px solid ...` and `padding-left: 20px` for the classic quote style. Set `font-style: italic` to distinguish it from body text.",
      ],
      successMessage: "Beautiful typography! Good type design is invisible — and yours is.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 8. Colors & Backgrounds
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "colors-backgrounds",
    title: "Colors & Backgrounds",
    explanation: `## Color is communication

Every color choice tells the user something. CSS gives you many ways to express color.

### Color formats

\`\`\`css
color: red;                    /* Named (147 available) */
color: #ff0000;                /* Hex */
color: #f00;                   /* Shorthand hex */
color: rgb(255, 0, 0);        /* RGB */
color: rgba(255, 0, 0, 0.5);  /* RGB + alpha (transparency) */
color: hsl(0, 100%, 50%);     /* Hue Saturation Lightness */
color: hsl(0 100% 50% / 0.5); /* HSL + alpha (modern) */
\`\`\`

**HSL is the most human-friendly** — hue is the colour (0–360°), saturation is intensity, lightness is brightness.

### Backgrounds

\`\`\`css
/* Solid */
background-color: #f3f4f6;

/* Image */
background-image: url('photo.jpg');
background-size: cover;        /* fills area, crops */
background-position: center;

/* Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: radial-gradient(circle at 30% 30%, #3b82f6, #8b5cf6);

/* Multiple layers (image over gradient) */
background:
  linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
  url('photo.jpg') center/cover;
\`\`\``,
    exercise: {
      instructions: `Create a **hero section** with a stunning gradient background.

Requirements:
- Full-viewport-height hero (\`100vh\`)
- A diagonal gradient background from \`#667eea\` to \`#764ba2\`
- White heading text (large, bold) centred on the page
- A white subtitle paragraph
- A semi-transparent white "Get Started" button with rounded corners
- An amber/gold decorative element (circle or badge) in the top-right corner`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hero Section</title>
</head>
<body>
  <section class="hero">
    <div class="badge">✨ New</div>
    <h1>Build Something Amazing</h1>
    <p class="subtitle">Start your journey to becoming a world-class developer.</p>
    <button class="cta">Get Started</button>
  </section>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

/* Style the hero below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hero Section</title>
</head>
<body>
  <section class="hero">
    <div class="badge">✨ New</div>
    <h1>Build Something Amazing</h1>
    <p class="subtitle">Start your journey to becoming a world-class developer.</p>
    <button class="cta">Get Started</button>
  </section>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

.badge {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(251, 191, 36, 0.9);
  color: #78350f;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 999px;
}

h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  max-width: 700px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.cta {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 14px 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}

.cta:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.7);
}`,
      },
      hints: [
        "Use `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)` on `.hero`. The degree controls the angle.",
        "`rgba(255, 255, 255, 0.15)` is white at 15% opacity — great for the glass-effect button. The fourth value is alpha (0 = transparent, 1 = opaque).",
        "Position the badge absolutely: `position: absolute; top: 24px; right: 24px` — but the `.hero` must have `position: relative` to contain it.",
      ],
      successMessage: "Gorgeous gradient! You can now create any background effect.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 9. Flexbox
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "flexbox",
    title: "Flexbox Deep Dive",
    explanation: `## Flexbox: one-dimensional layout

Flexbox arranges items in a row or column, distributing space and aligning content with ease.

### Container properties (on the parent)

\`\`\`css
.container {
  display: flex;

  /* Direction */
  flex-direction: row | column | row-reverse | column-reverse;

  /* Alignment on main axis */
  justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;

  /* Alignment on cross axis */
  align-items: stretch | center | flex-start | flex-end | baseline;

  /* Wrapping */
  flex-wrap: nowrap | wrap;
  gap: 16px;      /* space between items */
}
\`\`\`

### Item properties (on the children)

\`\`\`css
.item {
  flex: 1;         /* grow and shrink equally */
  flex: 0 0 200px; /* fixed 200px, no grow/shrink */
  align-self: center; /* override align-items for this item */
  order: -1;       /* move this item first */
}
\`\`\`

### Classic patterns

\`\`\`css
/* Centre anything */
.centre { display: flex; align-items: center; justify-content: center; }

/* Navbar with logo left, links right */
nav { display: flex; justify-content: space-between; align-items: center; }

/* Equal-width columns */
.cols > * { flex: 1; }
\`\`\``,
    exercise: {
      instructions: `Build a **responsive navigation bar** using Flexbox.

Requirements:
- A \`<nav>\` with the site logo on the left, navigation links in the centre, and a "Sign Up" button on the right
- Logo: bold text "DevHub" with a small emoji or icon before it
- Links: Home, Courses, Community, Mentors (no underline, spaced evenly)
- "Sign Up" button: indigo background, white text, rounded
- The nav should have a white background, border-bottom, and sticky positioning
- Below the nav, add a placeholder hero div to show the sticky effect`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Nav</title>
</head>
<body>
  <nav class="navbar">
    <a class="logo" href="#">⚡ DevHub</a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Courses</a></li>
      <li><a href="#">Community</a></li>
      <li><a href="#">Mentors</a></li>
    </ul>
    <a class="signup-btn" href="#">Sign Up</a>
  </nav>
  <div class="hero-placeholder">Scroll to see sticky nav ↑</div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

/* Style the navbar with flexbox below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Nav</title>
</head>
<body>
  <nav class="navbar">
    <a class="logo" href="#">⚡ DevHub</a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Courses</a></li>
      <li><a href="#">Community</a></li>
      <li><a href="#">Mentors</a></li>
    </ul>
    <a class="signup-btn" href="#">Sign Up</a>
  </nav>
  <div class="hero-placeholder">Scroll to see sticky nav ↑</div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
}

.nav-links a {
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.15s;
}

.nav-links a:hover {
  color: #111827;
  background: #f9fafb;
}

.signup-btn {
  background: #6366f1;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
  transition: background 0.15s;
}

.signup-btn:hover { background: #4f46e5; }

.hero-placeholder {
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #9ca3af;
  background: #f9fafb;
}`,
      },
      hints: [
        "The magic trio for a navbar: `display: flex; align-items: center; justify-content: space-between;` — logo left, links centre (sort of), button right.",
        "For the nav links: `<ul>` needs `display: flex; list-style: none; gap: 8px`. Don't put flexbox on `<li>` — put it on the parent `<ul>`.",
        "Sticky nav: `position: sticky; top: 0; z-index: 100` on the `<nav>`. It needs a background colour or the page content will show through when scrolling.",
      ],
      successMessage: "Excellent Flexbox nav! This pattern is used on almost every website.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 10. CSS Grid
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "css-grid",
    title: "CSS Grid",
    explanation: `## Grid: two-dimensional layout

While Flexbox is 1D (row OR column), Grid handles both simultaneously.

### Defining a grid

\`\`\`css
.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;   /* fixed + flexible */
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsive! */

  /* Define rows */
  grid-template-rows: auto;

  /* Gaps */
  gap: 16px;          /* row and column gap */
  column-gap: 24px;
  row-gap: 16px;
}
\`\`\`

### Placing items

\`\`\`css
/* Span multiple columns */
.wide-item {
  grid-column: 1 / 3;     /* from column line 1 to 3 */
  grid-column: span 2;    /* span 2 columns from current position */
}

/* Full-width item */
.full-width {
  grid-column: 1 / -1;   /* -1 = last line */
}
\`\`\`

### Grid areas (named layout)

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }
\`\`\``,
    exercise: {
      instructions: `Create a **photo gallery** using CSS Grid.

Requirements:
- A grid of 6 photo cards (coloured boxes as placeholders)
- Use \`repeat(auto-fill, minmax(200px, 1fr))\` for responsive columns
- Gap of 16px between items
- Each card: 200px tall, rounded corners, background gradient, centred text showing the photo number
- The first card (\`.featured\`) should span 2 columns and be 300px tall
- The whole grid should have a max-width of 900px and be centred`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Photo Gallery</title>
</head>
<body>
  <h1>Gallery</h1>
  <div class="gallery">
    <div class="card featured">Photo 1</div>
    <div class="card">Photo 2</div>
    <div class="card">Photo 3</div>
    <div class="card">Photo 4</div>
    <div class="card">Photo 5</div>
    <div class="card">Photo 6</div>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #111; color: white; padding: 40px 20px; }
h1 { margin-bottom: 24px; }

/* Build the grid below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Photo Gallery</title>
</head>
<body>
  <h1>Gallery</h1>
  <div class="gallery">
    <div class="card featured">Photo 1</div>
    <div class="card">Photo 2</div>
    <div class="card">Photo 3</div>
    <div class="card">Photo 4</div>
    <div class="card">Photo 5</div>
    <div class="card">Photo 6</div>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #111; color: white; padding: 40px 20px; }
h1 { margin-bottom: 24px; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.card {
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e293b, #334155);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.card:nth-child(2) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
.card:nth-child(3) { background: linear-gradient(135deg, #0d1117, #161b22); }
.card:nth-child(4) { background: linear-gradient(135deg, #0c1a1a, #0d2626); }
.card:nth-child(5) { background: linear-gradient(135deg, #1a0a1a, #2d1a2d); }
.card:nth-child(6) { background: linear-gradient(135deg, #1a1a0a, #2d2d1a); }

.featured {
  grid-column: span 2;
  height: 300px;
  background: linear-gradient(135deg, #312e81, #4c1d95);
  color: #c4b5fd;
  font-size: 16px;
}`,
      },
      hints: [
        "`repeat(auto-fill, minmax(200px, 1fr))` is the responsive grid magic. It creates as many columns as fit, each at least 200px wide.",
        "The featured card uses `grid-column: span 2` to take up 2 columns. Apply this to the `.featured` class.",
        "Use `:nth-child(n)` selectors like `.card:nth-child(2)` to give each card a different background without extra classes.",
      ],
      successMessage: "Stunning grid! `auto-fill` with `minmax` is one of CSS's most powerful tricks.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 11. Positioning
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "positioning",
    title: "Positioning",
    explanation: `## Taking elements out of the flow

By default, elements are \`position: static\` — they flow one after another. CSS positioning lets you break out of this.

### The five values

\`\`\`css
/* Static (default) — flows normally */
.static { position: static; }

/* Relative — offset from its normal position */
.relative { position: relative; top: 10px; left: 20px; }

/* Absolute — positioned relative to nearest positioned ancestor */
.absolute {
  position: absolute;
  top: 0; right: 0;    /* top-right corner of parent */
}

/* Fixed — positioned relative to the viewport (stays on scroll) */
.fixed { position: fixed; bottom: 24px; right: 24px; }

/* Sticky — flows normally until scroll threshold, then sticks */
.sticky { position: sticky; top: 0; }
\`\`\`

### The golden rule

An \`absolute\` element is positioned relative to its **nearest ancestor that has any \`position\` other than \`static\`**.

If no such ancestor exists, it's positioned relative to the \`<html>\` element.

\`\`\`css
.parent { position: relative; }  /* ← establishes positioning context */
.child  { position: absolute; top: 0; right: 0; } /* ← anchors to parent */
\`\`\``,
    exercise: {
      instructions: `Build a **notification card** that demonstrates different position types.

Requirements:
- A \`.card\` (position: relative) with a white background, padding, and shadow
- A red notification badge (\`.badge\`) positioned absolute at the top-right corner of the card (-8px from each edge)
- A sticky header bar at the top of the page
- A floating action button (FAB) fixed to the bottom-right of the page
- Card content: an icon placeholder, title, and description`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Positioning</title>
</head>
<body>
  <header class="sticky-header">Ascendra Dashboard</header>

  <div class="page">
    <div class="card">
      <span class="badge">3</span>
      <div class="card-icon">📬</div>
      <h3>New Messages</h3>
      <p>You have unread messages from your mentor and 2 community replies.</p>
    </div>
  </div>

  <button class="fab">＋</button>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f3f4f6; }

/* Style positioning below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Positioning</title>
</head>
<body>
  <header class="sticky-header">Ascendra Dashboard</header>

  <div class="page">
    <div class="card">
      <span class="badge">3</span>
      <div class="card-icon">📬</div>
      <h3>New Messages</h3>
      <p>You have unread messages from your mentor and 2 community replies.</p>
    </div>
  </div>

  <button class="fab">＋</button>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f3f4f6; min-height: 100vh; }

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 32px;
  font-weight: 700;
  font-size: 18px;
}

.page {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.card {
  position: relative;       /* ← makes it the anchor for .badge */
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  max-width: 320px;
  width: 100%;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f3f4f6;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;
}

p { font-size: 14px; color: #6b7280; line-height: 1.6; }

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #6366f1;
  color: white;
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(99,102,241,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.fab:hover { transform: scale(1.1); }`,
      },
      hints: [
        "For `.badge` to position relative to `.card`, the card needs `position: relative`. Without this, the badge will anchor to the page.",
        "The badge: `position: absolute; top: -8px; right: -8px` places it 8px above and right of the card's edge.",
        "The floating button uses `position: fixed` so it stays in the corner regardless of scrolling.",
      ],
      successMessage: "Nailed it! Positioning is tricky but now you know the rules.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 12. Responsive Design
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "responsive-design",
    title: "Responsive Design & Media Queries",
    explanation: `## One design, every screen

Responsive design means your layout adapts to different screen sizes — from 320px phones to 4K monitors.

### Mobile-first approach

Start with the mobile layout, then enhance for larger screens:

\`\`\`css
/* Mobile (default — no query needed) */
.card { width: 100%; }

/* Tablet and up */
@media (min-width: 640px) {
  .card { width: 50%; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card { width: 33.33%; }
}
\`\`\`

### Common breakpoints

| Name | Min-width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

### Responsive techniques

\`\`\`css
/* Fluid images */
img { max-width: 100%; height: auto; }

/* Fluid type */
h1 { font-size: clamp(1.5rem, 5vw, 3.5rem); }

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

### Viewport meta tag (required!)

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

Without this, mobile browsers zoom out to fit the desktop layout.`,
    exercise: {
      instructions: `Make a **pricing card grid** fully responsive.

Requirements:
- Mobile (default): single column
- Tablet (≥640px): two columns
- Desktop (≥1024px): three columns
- Each pricing card: title, price, feature list, CTA button
- The middle card (\`.popular\`) should be visually highlighted (purple border/shadow)
- Use \`clamp()\` for the price font size
- Cards should have equal height (use flexbox within the grid)`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing</title>
</head>
<body>
  <h1>Choose Your Plan</h1>
  <div class="pricing-grid">
    <div class="card">
      <h2>Starter</h2>
      <p class="price">Free</p>
      <ul><li>5 courses</li><li>Community access</li><li>Basic progress tracking</li></ul>
      <button>Get Started</button>
    </div>
    <div class="card popular">
      <span class="popular-badge">Most Popular</span>
      <h2>Pro</h2>
      <p class="price">$29/mo</p>
      <ul><li>All courses</li><li>AI Mentor access</li><li>Certificate of completion</li><li>Priority support</li></ul>
      <button class="btn-primary">Start Pro</button>
    </div>
    <div class="card">
      <h2>Team</h2>
      <p class="price">$99/mo</p>
      <ul><li>Everything in Pro</li><li>5 team seats</li><li>Admin dashboard</li></ul>
      <button>Contact Sales</button>
    </div>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; }
h1 { text-align: center; margin-bottom: 32px; }

/* Build the responsive grid below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing</title>
</head>
<body>
  <h1>Choose Your Plan</h1>
  <div class="pricing-grid">
    <div class="card">
      <h2>Starter</h2>
      <p class="price">Free</p>
      <ul><li>5 courses</li><li>Community access</li><li>Basic progress tracking</li></ul>
      <button>Get Started</button>
    </div>
    <div class="card popular">
      <span class="popular-badge">Most Popular</span>
      <h2>Pro</h2>
      <p class="price">$29/mo</p>
      <ul><li>All courses</li><li>AI Mentor access</li><li>Certificate of completion</li><li>Priority support</li></ul>
      <button class="btn-primary">Start Pro</button>
    </div>
    <div class="card">
      <h2>Team</h2>
      <p class="price">$99/mo</p>
      <ul><li>Everything in Pro</li><li>5 team seats</li><li>Admin dashboard</li></ul>
      <button>Contact Sales</button>
    </div>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; }
h1 { text-align: center; margin-bottom: 32px; font-size: 2rem; color: #111827; }

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr; /* mobile */
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .pricing-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .pricing-grid { grid-template-columns: repeat(3, 1fr); }
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.popular {
  border: 2px solid #6366f1;
  box-shadow: 0 8px 32px rgba(99,102,241,0.2);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6366f1;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 999px;
  white-space: nowrap;
}

h2 { font-size: 1.25rem; color: #111827; }

.price {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #111827;
}

ul { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; }
li::before { content: "✓ "; color: #10b981; font-weight: 700; }
li { font-size: 14px; color: #6b7280; }

button {
  width: 100%; padding: 12px; border-radius: 10px;
  border: 1px solid #e5e7eb; background: white;
  font-weight: 600; font-size: 14px; cursor: pointer;
}

.btn-primary {
  background: #6366f1; color: white; border: none;
}`,
      },
      hints: [
        "Start with `grid-template-columns: 1fr` (single column for mobile). Then add `@media (min-width: 640px)` for two columns.",
        "The `.popular-badge` needs `position: absolute` with `top: -12px; left: 50%; transform: translateX(-50%)` to centre it on the card top edge.",
        "For `clamp(1.75rem, 4vw, 2.5rem)`: minimum 1.75rem, grows with viewport to a max of 2.5rem.",
      ],
      successMessage: "Your layout works on every screen! Mobile-first is the industry standard.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 13. CSS Variables
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "css-variables",
    title: "CSS Variables",
    explanation: `## Design tokens in CSS

CSS custom properties (variables) let you store values and reuse them throughout your stylesheet — like variables in any programming language.

### Defining and using variables

\`\`\`css
/* Define on :root — available everywhere */
:root {
  --color-primary: #6366f1;
  --color-text: #111827;
  --radius: 12px;
  --shadow: 0 4px 16px rgba(0,0,0,0.08);
  --spacing-md: 16px;
}

/* Use with var() */
.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-md) 24px;
}
\`\`\`

### Variable fallbacks

\`\`\`css
color: var(--accent, #6366f1);  /* uses #6366f1 if --accent isn't set */
\`\`\`

### Dynamic theming with variables

\`\`\`css
:root { --bg: white; --text: #111; }

[data-theme="dark"] {
  --bg: #111; --text: white;
}

body { background: var(--bg); color: var(--text); }
\`\`\`

### Variables are reactive

Change a variable in JavaScript and everything using it updates instantly:
\`\`\`javascript
document.documentElement.style.setProperty('--color-primary', '#10b981');
\`\`\``,
    exercise: {
      instructions: `Create a **themed UI card** using CSS variables.

Requirements:
- Define a design token system in \`:root\`: primary colour, text colours, border-radius, shadow, spacing
- Build a card using ONLY \`var()\` references — no hardcoded values (except on \`:root\`)
- Add a \`.dark-theme\` class toggle: when the \`<body>\` has \`.dark-theme\`, all variables switch to dark values
- The card should contain: a coloured icon box, title, description, and action button
- Add a "Toggle Theme" button outside the card that adds/removes \`.dark-theme\` on \`<body>\` via inline JS`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Variables</title>
</head>
<body>
  <button class="theme-toggle" onclick="document.body.classList.toggle('dark-theme')">
    Toggle Theme
  </button>

  <div class="container">
    <div class="card">
      <div class="card-icon">🚀</div>
      <h2>Launch Ready</h2>
      <p>Your project has been built and is ready for deployment to production.</p>
      <button class="btn">Deploy Now</button>
    </div>
  </div>
</body>
</html>`,
        css: `/* Define your design tokens here */
:root {

}

/* Dark theme overrides */
.dark-theme {

}

* { box-sizing: border-box; margin: 0; padding: 0; }

/* Use var() below */
body {

}

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Variables</title>
</head>
<body>
  <button class="theme-toggle" onclick="document.body.classList.toggle('dark-theme')">
    Toggle Theme
  </button>

  <div class="container">
    <div class="card">
      <div class="card-icon">🚀</div>
      <h2>Launch Ready</h2>
      <p>Your project has been built and is ready for deployment to production.</p>
      <button class="btn">Deploy Now</button>
    </div>
  </div>
</body>
</html>`,
        css: `:root {
  --bg-page: #f3f4f6;
  --bg-card: #ffffff;
  --bg-icon: #ede9fe;
  --color-primary: #6366f1;
  --color-text: #111827;
  --color-muted: #6b7280;
  --border-color: #e5e7eb;
  --radius: 16px;
  --shadow: 0 4px 24px rgba(0,0,0,0.08);
  --transition: 0.3s ease;
}

.dark-theme {
  --bg-page: #0f172a;
  --bg-card: #1e293b;
  --bg-icon: #312e81;
  --color-primary: #818cf8;
  --color-text: #f1f5f9;
  --color-muted: #94a3b8;
  --border-color: #334155;
  --shadow: 0 4px 24px rgba(0,0,0,0.4);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg-page);
  color: var(--color-text);
  font-family: system-ui, sans-serif;
  min-height: 100vh;
  transition: background var(--transition), color var(--transition);
}

.theme-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  background: var(--bg-card);
  color: var(--color-text);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 32px;
  max-width: 340px;
  width: 100%;
  box-shadow: var(--shadow);
  transition: background var(--transition), border-color var(--transition), box-shadow var(--transition);
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--bg-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
  transition: background var(--transition);
}

h2 { font-size: 20px; margin-bottom: 8px; color: var(--color-text); }
p { font-size: 14px; color: var(--color-muted); line-height: 1.6; margin-bottom: 24px; }

.btn {
  width: 100%;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition);
}`,
      },
      hints: [
        "Define all your base colours in `:root { --var-name: value; }`. Then in `.dark-theme`, redefine the same variable names with dark values — everything updates automatically.",
        "Replace every hardcoded value with `var(--your-token)`. For transitions to work when the theme switches, add `transition: background 0.3s, color 0.3s` to affected elements.",
        "The toggle button uses inline JS: `document.body.classList.toggle('dark-theme')`. When `dark-theme` is on the `<body>`, CSS variables cascade down to all children.",
      ],
      successMessage: "Theme switching with CSS variables — this is how every modern design system works!",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 14. Animations & Transitions
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "animations",
    title: "Animations & Transitions",
    explanation: `## Motion brings interfaces to life

### Transitions — smooth state changes

\`\`\`css
.button {
  background: #6366f1;
  transition: background 0.2s ease, transform 0.15s ease;
}

.button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}
\`\`\`

\`transition: [property] [duration] [easing] [delay]\`

Common easings: \`ease\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`linear\`

### Keyframe animations

\`\`\`css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeUp 0.5s ease-out forwards;
  animation-delay: 0.1s;
}
\`\`\`

\`animation: [name] [duration] [easing] [delay] [iteration] [direction] [fill-mode]\`

### The Transform functions

\`\`\`css
transform: translateX(10px) translateY(-5px);  /* move */
transform: scale(1.05);                         /* scale */
transform: rotate(45deg);                       /* rotate */
transform: skew(5deg);                          /* skew */
\`\`\`

### Performance tip

Animate only \`transform\` and \`opacity\` for 60fps. Animating \`width\`, \`height\`, or \`margin\` causes layout recalculation (slow).`,
    exercise: {
      instructions: `Create an **animated UI card** with multiple animation effects.

Requirements:
- A card that **fades in from below** on page load (keyframe animation)
- A loading spinner (\`.spinner\`) inside the card that **spins continuously**
- A "Submit" button that:
  - Lifts up on hover (translateY + shadow transition)
  - Has a pulse glow animation that plays on hover
- A pulsing dot that indicates "live" status (ping animation)
- A badge that **slides in from the right** with an animation delay`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Animations</title>
</head>
<body>
  <div class="card">
    <div class="status">
      <span class="ping"></span>
      <span class="status-text">Processing</span>
    </div>
    <div class="spinner"></div>
    <h2>Uploading Project</h2>
    <p>Your code is being reviewed by our AI system.</p>
    <div class="badge">AI Review</div>
    <button class="btn">Submit for Review</button>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #111827;
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; font-family: system-ui, sans-serif;
}

/* Define @keyframes and animations below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Animations</title>
</head>
<body>
  <div class="card">
    <div class="status">
      <span class="ping"></span>
      <span class="status-text">Processing</span>
    </div>
    <div class="spinner"></div>
    <h2>Uploading Project</h2>
    <p>Your code is being reviewed by our AI system.</p>
    <div class="badge">AI Review</div>
    <button class="btn">Submit for Review</button>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #111827;
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; font-family: system-ui, sans-serif; color: white;
}

/* Keyframes */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes ping {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.8); opacity: 0; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
  50%       { box-shadow: 0 4px 32px rgba(99,102,241,0.9); }
}

.card {
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 20px;
  padding: 36px;
  max-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeUp 0.6s ease-out forwards;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ping {
  width: 8px; height: 8px;
  border-radius: 50%; background: #10b981;
  animation: ping 1.5s ease-in-out infinite;
}

.status-text { font-size: 12px; color: #10b981; font-weight: 600; }

.spinner {
  width: 40px; height: 40px;
  border: 3px solid #374151;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

h2 { font-size: 20px; font-weight: 700; }
p  { font-size: 14px; color: #9ca3af; line-height: 1.6; }

.badge {
  display: inline-flex;
  background: rgba(99,102,241,0.15);
  color: #a5b4fc;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(99,102,241,0.3);
  width: fit-content;
  animation: slideIn 0.5s ease-out 0.4s both;
}

.btn {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-3px);
  animation: pulseGlow 1s ease-in-out infinite;
}`,
      },
      hints: [
        "Define `@keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }` then apply with `animation: fadeUp 0.6s ease-out forwards` on `.card`.",
        "The spinner uses `animation: spin 0.8s linear infinite`. The `spin` keyframe just needs `to { transform: rotate(360deg); }` — the browser interpolates from 0 to 360.",
        "For the badge's delayed entrance: `animation: slideIn 0.5s ease-out 0.4s both`. The `both` fill-mode means it starts invisible (from state) before the delay fires.",
      ],
      successMessage: "Buttery smooth animations! Remember: only animate `transform` and `opacity` for peak performance.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 15. Pseudo-classes
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "pseudo-classes",
    title: "Pseudo-classes & Pseudo-elements",
    explanation: `## Style based on state and position

### Pseudo-classes (dynamic state)

\`\`\`css
a:hover  { color: blue; }          /* mouse over */
a:focus  { outline: 2px solid blue; } /* keyboard focus */
a:visited { color: purple; }        /* visited link */

input:disabled { opacity: 0.5; }
input:checked  { accent-color: green; }

/* Structural */
li:first-child  { font-weight: bold; }
li:last-child   { border: none; }
li:nth-child(2) { color: red; }
li:nth-child(odd) { background: #f9f9f9; }
p:not(.intro)   { color: gray; }    /* all p except .intro */
\`\`\`

### Pseudo-elements (virtual elements)

\`\`\`css
/* First letter / line */
p::first-letter { font-size: 2em; float: left; }
p::first-line   { font-weight: bold; }

/* Generated content */
.required::after {
  content: " *";
  color: red;
}

/* Decorative elements */
.card::before {
  content: "";
  display: block;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}
\`\`\``,
    exercise: {
      instructions: `Style a **task list** using pseudo-classes and pseudo-elements.

Requirements:
- Alternating row backgrounds using \`:nth-child(even)\`
- First task (\`:first-child\`) should be bold and have "→ Start here" added via \`::after\`
- Last task (\`:last-child\`) should have no bottom border
- Hovering a row highlights it (smooth transition)
- Completed tasks (\`.done\`) should have strikethrough text and green checkmark via \`::before\`
- Required fields get a red asterisk via \`::after\` in a separate form below`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-classes</title>
</head>
<body>
  <h2>Today's Tasks</h2>
  <ul class="task-list">
    <li>Set up project structure</li>
    <li class="done">Install dependencies</li>
    <li>Write the HTML skeleton</li>
    <li class="done">Design the color palette</li>
    <li>Deploy to production</li>
  </ul>

  <h2>Quick Form</h2>
  <div class="form">
    <label class="required">Email</label>
    <label>Phone (optional)</label>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
h2 { margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.form label { font-size: 14px; font-weight: 500; }

/* Use pseudo-classes and pseudo-elements below */

`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-classes</title>
</head>
<body>
  <h2>Today's Tasks</h2>
  <ul class="task-list">
    <li>Set up project structure</li>
    <li class="done">Install dependencies</li>
    <li>Write the HTML skeleton</li>
    <li class="done">Design the color palette</li>
    <li>Deploy to production</li>
  </ul>

  <h2 style="margin-top:32px">Quick Form</h2>
  <div class="form">
    <label class="required">Email</label>
    <label>Phone (optional)</label>
  </div>
</body>
</html>`,
        css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; color: #111827; }
h2 { margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.form label { font-size: 14px; font-weight: 500; }

.task-list {
  list-style: none;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.task-list li {
  padding: 14px 18px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  transition: background 0.15s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-list li:nth-child(even) { background: #f9fafb; }
.task-list li:hover { background: #eff6ff; }
.task-list li:last-child { border-bottom: none; }

.task-list li:first-child {
  font-weight: 700;
  color: #4f46e5;
}

.task-list li:first-child::after {
  content: "→ Start here";
  font-size: 11px;
  font-weight: 600;
  color: #6366f1;
  background: #ede9fe;
  padding: 2px 10px;
  border-radius: 999px;
  margin-left: auto;
}

.task-list li.done {
  text-decoration: line-through;
  color: #9ca3af;
}

.task-list li.done::before {
  content: "✓";
  color: #10b981;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.required::after {
  content: " *";
  color: #ef4444;
}`,
      },
      hints: [
        "`:nth-child(even)` selects the 2nd, 4th, 6th… items. Apply a background colour there.",
        "For `::before` and `::after`, you must set `content: ''` (even if empty) for the pseudo-element to appear. Without `content`, it won't render.",
        "`.required::after { content: ' *'; color: red; }` — the space before the asterisk prevents it from touching the label text.",
      ],
      successMessage: "Pseudo-classes mastered! These are the secret sauce of professional CSS.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 16. Final Project
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "portfolio",
    title: "Project: Portfolio Page",
    explanation: `## Capstone project — put it all together

You've learned all the fundamentals. Now build a **complete personal portfolio page** from scratch using every technique from this course.

### What you'll build

A professional one-page portfolio with:

1. **Sticky navigation** with smooth scroll links
2. **Hero section** with gradient background, your name, and a CTA
3. **About section** with a two-column layout (Flexbox/Grid)
4. **Projects section** — responsive card grid
5. **Skills section** — animated progress bars or tags
6. **Contact form** with styled inputs
7. **Footer** with social links

### Techniques you'll use

- Semantic HTML throughout
- CSS custom properties for theming
- Flexbox and Grid for layout
- Responsive design with media queries
- Pseudo-classes for interactive states
- Transitions and animations for polish
- The full box model for spacing

### Tips for a professional result

- **Consistency**: stick to 2-3 colors and 2 font sizes
- **Whitespace**: generous padding makes things look premium
- **Typography hierarchy**: clear h1 > h2 > body flow
- **Mobile first**: design narrow, then widen
- **Accessibility**: semantic HTML + sufficient contrast`,
    exercise: {
      instructions: `Build your **complete portfolio page**.

Requirements:
- **Nav**: sticky, logo left, links right, responsive
- **Hero**: full-viewport gradient, large name heading, subtitle, two CTA buttons
- **Projects**: grid of at least 3 project cards with hover effects
- **Skills**: a row of skill badges or a list with visual indicators
- **Contact**: a working-looking form with name, email, message
- **Footer**: copyright and 3 social links (icons optional)

Use CSS variables for your colour scheme. Make it look like something you'd actually show a potential employer!`,
      startCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — Portfolio</title>
</head>
<body>
  <!-- Build your portfolio here -->
  <!-- nav, hero, about, projects, skills, contact, footer -->

</body>
</html>`,
        css: `:root {
  /* Define your colour tokens here */
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; }
`,
      },
      solution: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Chen — Frontend Developer</title>
</head>
<body>

  <nav class="navbar">
    <a class="logo" href="#">AC</a>
    <ul class="nav-links">
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <p class="eyebrow">👋 Hello, I'm</p>
      <h1>Alex Chen</h1>
      <p class="subtitle">Frontend developer who crafts fast, beautiful, accessible web experiences.</p>
      <div class="hero-ctas">
        <a href="#projects" class="btn-primary">View Projects</a>
        <a href="#contact" class="btn-outline">Get In Touch</a>
      </div>
    </div>
  </section>

  <section class="projects" id="projects">
    <h2 class="section-title">Projects</h2>
    <div class="project-grid">
      <div class="project-card">
        <div class="project-img" style="background: linear-gradient(135deg,#667eea,#764ba2)"></div>
        <div class="project-body">
          <h3>DevDash</h3>
          <p>A real-time developer dashboard built with React and WebSockets.</p>
          <div class="tags"><span>React</span><span>Node.js</span><span>WebSockets</span></div>
        </div>
      </div>
      <div class="project-card">
        <div class="project-img" style="background: linear-gradient(135deg,#0ea5e9,#06b6d4)"></div>
        <div class="project-body">
          <h3>ShopFlow</h3>
          <p>E-commerce checkout flow with cart state management and animations.</p>
          <div class="tags"><span>Next.js</span><span>Zustand</span><span>Stripe</span></div>
        </div>
      </div>
      <div class="project-card">
        <div class="project-img" style="background: linear-gradient(135deg,#10b981,#059669)"></div>
        <div class="project-body">
          <h3>LeafStats</h3>
          <p>Environment monitoring dashboard with SVG data visualisations.</p>
          <div class="tags"><span>TypeScript</span><span>D3.js</span><span>CSS</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="skills" id="skills">
    <h2 class="section-title">Skills</h2>
    <div class="skill-tags">
      <span>HTML5</span><span>CSS3</span><span>JavaScript</span>
      <span>TypeScript</span><span>React</span><span>Next.js</span>
      <span>Node.js</span><span>Git</span><span>Figma</span>
    </div>
  </section>

  <section class="contact" id="contact">
    <h2 class="section-title">Get In Touch</h2>
    <form class="contact-form" action="#" method="post">
      <div class="field"><label for="name">Name</label><input type="text" id="name" placeholder="Your name" required></div>
      <div class="field"><label for="email">Email</label><input type="email" id="email" placeholder="you@example.com" required></div>
      <div class="field"><label for="msg">Message</label><textarea id="msg" rows="4" placeholder="Tell me about your project…"></textarea></div>
      <button type="submit" class="btn-primary">Send Message</button>
    </form>
  </section>

  <footer class="footer">
    <p>© 2024 Alex Chen</p>
    <div class="social-links">
      <a href="#">GitHub</a>
      <a href="#">LinkedIn</a>
      <a href="#">Twitter</a>
    </div>
  </footer>

</body>
</html>`,
        css: `:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --text: #111827;
  --muted: #6b7280;
  --bg: #ffffff;
  --bg-alt: #f9fafb;
  --border: #e5e7eb;
  --radius: 12px;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; color: var(--text); }

/* Nav */
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 64px; background: white;
  border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
}
.logo { font-weight: 800; font-size: 1.2rem; color: var(--primary); text-decoration: none; }
.nav-links { display: flex; list-style: none; gap: 8px; }
.nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; font-weight: 500; padding: 8px 12px; border-radius: 8px; }
.nav-links a:hover { color: var(--text); background: var(--bg-alt); }

/* Hero */
.hero {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #1e1b4b 100%);
  padding: 40px 20px; text-align: center;
}
.hero-content { max-width: 640px; }
.eyebrow { color: rgba(255,255,255,0.6); font-size: 16px; margin-bottom: 12px; }
h1 { font-size: clamp(2.5rem, 7vw, 4.5rem); font-weight: 800; color: white; letter-spacing: -0.03em; margin-bottom: 20px; }
.subtitle { font-size: 1.1rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 36px; }
.hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* Buttons */
.btn-primary {
  background: var(--primary); color: white; padding: 12px 28px;
  border-radius: var(--radius); text-decoration: none; font-weight: 600; font-size: 15px;
  transition: transform 0.15s, background 0.15s; border: none; cursor: pointer; display: inline-block;
}
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
.btn-outline {
  background: rgba(255,255,255,0.1); color: white; padding: 12px 28px;
  border-radius: var(--radius); text-decoration: none; font-weight: 600; font-size: 15px;
  border: 2px solid rgba(255,255,255,0.3); transition: all 0.15s; display: inline-block;
}
.btn-outline:hover { background: rgba(255,255,255,0.2); }

/* Sections */
.projects, .skills, .contact { padding: 80px 20px; }
.projects { background: var(--bg-alt); }
.section-title { font-size: 2rem; font-weight: 700; margin-bottom: 40px; text-align: center; }

/* Project grid */
.project-grid {
  display: grid; gap: 20px; max-width: 1000px; margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.project-card {
  background: white; border: 1px solid var(--border); border-radius: 16px;
  overflow: hidden; box-shadow: var(--shadow); transition: transform 0.2s, box-shadow 0.2s;
}
.project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
.project-img { height: 160px; }
.project-body { padding: 20px; }
.project-body h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.project-body p { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 12px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tags span { font-size: 11px; font-weight: 600; background: #ede9fe; color: #5b21b6; padding: 3px 10px; border-radius: 999px; }

/* Skills */
.skill-tags { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; max-width: 600px; margin: 0 auto; }
.skill-tags span {
  background: white; border: 1px solid var(--border); padding: 8px 20px;
  border-radius: 999px; font-size: 14px; font-weight: 500;
  transition: all 0.15s; cursor: default;
}
.skill-tags span:hover { border-color: var(--primary); color: var(--primary); }

/* Contact */
.contact { background: white; }
.contact-form { max-width: 520px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 14px; font-weight: 600; }
.field input, .field textarea {
  border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px;
  font-size: 14px; font-family: inherit; resize: vertical; transition: border 0.15s;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

/* Footer */
.footer {
  background: #111827; color: rgba(255,255,255,0.6); padding: 24px 32px;
  display: flex; align-items: center; justify-content: space-between;
}
.social-links { display: flex; gap: 16px; }
.social-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: color 0.15s; }
.social-links a:hover { color: white; }`,
      },
      hints: [
        "Start with the HTML structure first — all sections empty. Then tackle CSS section by section from top to bottom.",
        "Use your `:root` variables everywhere. This makes it easy to change your colour scheme later.",
        "The project card hover effect: `transition: transform 0.2s, box-shadow 0.2s` on the card, then `.project-card:hover { transform: translateY(-4px); box-shadow: ... }`.",
      ],
      successMessage: "🎉 Congratulations! You've completed the HTML & CSS course. You now have all the skills to build real web projects. Time to earn those Skill Coins!",
    },
  },
];

export function getHtmlCssLesson(slug: string): LessonData | undefined {
  return HTML_CSS_LESSONS.find((l) => l.slug === slug);
}
