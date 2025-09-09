# Themes & Styling

ModernWiki uses a sophisticated theming system based on CSS custom properties.

## Color System

The color system is built around semantic tokens:

```css
:root {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 217 91% 60%;
  --docs-accent: 217 91% 60%;
}
```

## Dark Mode

Dark mode is enabled by default. The theme automatically switches based on system preferences, but users can manually toggle it.

### Customizing Dark Mode

To customize the dark theme colors, edit the `.dark` section in your CSS:

```css
.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  /* Your custom colors here */
}
```

## Typography

ModernWiki uses a carefully crafted typography system:

- **Headings**: Semi-bold with proper spacing
- **Body text**: Optimized line height and spacing
- **Code**: Monospace with syntax highlighting

### Font Customization

You can customize fonts by updating the CSS:

```css
body {
  font-family: 'Your Font', sans-serif;
}
```

## Component Styling

All components use the design token system. Never use hardcoded colors - always use semantic tokens.

### Example: Custom Button

```tsx
<Button className="bg-docs-accent hover:bg-docs-accent-hover">
  Custom Button
</Button>
```