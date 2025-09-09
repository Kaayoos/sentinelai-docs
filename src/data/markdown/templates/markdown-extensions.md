# Markdown Extensions

ModernWiki supports GitHub-flavored markdown plus additional extensions.


## Syntax Highlighting

Code blocks support syntax highlighting for many languages:

### JavaScript


```javascript
const modernWiki = {
  name: 'ModernWiki',
  version: '1.0.0',
  features: ['dark-theme', 'markdown', 'search']
};

console.log('Hello from ModernWiki!');
```

### Python
```python
def hello_modernwiki():
    """A simple greeting function"""
    return "Hello from ModernWiki!"

if __name__ == "__main__":
    print(hello_modernwiki())
```

### CSS
```css
.modern-wiki {
  background: hsl(var(--docs-bg));
  color: hsl(var(--foreground));
  border-radius: var(--radius);
}
```

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Dark Theme | ✅ | Default theme |
| Syntax Highlighting | ✅ | Multiple languages |
| Search | ✅ | Full-text search |
| Mobile Responsive | ✅ | Works on all devices |

## Alerts & Callouts

> **Note**: This is an informational callout.

> **Warning**: This is a warning callout.

> **Tip**: This is a helpful tip callout.

## Images

Images are automatically optimized and responsive:

![ModernWiki Logo](https://sentinelai.dev/img/logo2.png)

## Links

- Internal links: [Getting Started](/Getting%20Started/introduction)
- External links: [GitHub](https://github.com)
- Anchor links: [Back to top](#markdown-extensions)
