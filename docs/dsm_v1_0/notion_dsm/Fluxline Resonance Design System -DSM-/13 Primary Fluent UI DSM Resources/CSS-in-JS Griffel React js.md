# CSS-in-JS Griffel React.js

### 🧠 Bonus Tip: Fluent UI React v9 uses **Griffel** for styling

If you're working in React, you’ll be using Griffel (CSS-in-JS) to manage styles and tokens. This means you can define your own themes, override Fluent defaults, and inject mythic modularity directly into the component tree.

## 🧠 What CSS-in-JS *Really* Means

CSS-in-JS is a styling approach where **styles are written in JavaScript**, often as objects or tagged template literals, and then **compiled into real CSS classes** behind the scenes. It’s not just inline styles—it’s a full styling engine.

```jsx
// CSS-in-JS Griffel styling for React v9
const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--colorNeutralBackground1)',
    padding: '1rem',
    borderRadius: '0.75rem',
    ':hover': {
      backgroundColor: 'var(--colorBrandBackgroundHover)',
    },
  },
});
```

```jsx
// React.js-based setup
const styles = useStyles();
return <div className={styles.root}>My Mythic Card</div>;
```

## ⚠️ Inline Styles vs CSS-in-JS

| Feature | Inline Styles (`style={{...}}`) | CSS-in-JS (Griffel, Emotion, etc.) |
| --- | --- | --- |
| Pseudo-selectors | ❌ Not supported | ✅ Supported (`:hover`, `:focus`) |
| Media queries | ❌ Not supported | ✅ Supported |
| Theming | ❌ Manual | ✅ Token-based, dynamic |
| Performance | ⚠️ Can be slow on large apps | ✅ Optimized with atomic classes |
| Dev experience | ✅ Simple for quick styling | ✅ Scalable for design systems |

### 🌀 Optional Ritual: Style Module Naming

You could even name your style modules symbolically:

```jsx
const useModalGlyphStyles = makeStyles({ ... });
const useBackdropVeilStyles = makeStyles({ ... });
```