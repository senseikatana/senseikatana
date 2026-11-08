# Bulma + TailwindCSS Integration Guide

This guide explains how to integrate Bulma CSS with TailwindCSS in your Katana UI project, combining the best of both frameworks.

## Overview

The integration provides:
- **Bulma**: Component-based CSS framework with pre-designed components
- **TailwindCSS**: Utility-first CSS framework for rapid custom styling
- **Katana UI**: Custom components with consistent design system

## Installation

1. Install the required dependencies:
```bash
bun add bulma tailwindcss sass
```

2. Initialize TailwindCSS configuration:
```bash
# Create tailwind.config.js manually if needed
```

3. Configure the build process to include Bulma and TailwindCSS styles.

## Configuration

### TailwindCSS Configuration

Create a `tailwind.config.js` file:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}",
    "./packages/ui/**/*.{js,ts,jsx,tsx,scss}"
  ],
  theme: {
    extend: {
      colors: {
        'bulma-primary': '#00d1b2',
        'bulma-secondary': '#209cee',
        'bulma-dark': '#23d160',
        'bulma-light': '#3273dc',
      }
    }
  },
  plugins: []
}
```

### SCSS Files Structure

```
src/styles/
├── main.scss          # Main SCSS file with Bulma imports
├── variables.scss     # Custom variables
└── custom.scss       # Custom styles combining both frameworks
```

## Usage

### Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Bulma CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
    
    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom combined styles -->
    <link rel="stylesheet" href="path/to/combined-styles.css">
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

### Combining Components

#### Buttons

```html
<!-- Pure Bulma button -->
<button class="button is-primary">Bulma Button</button>

<!-- Pure TailwindCSS button -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    Tailwind Button
</button>

<!-- Combined button -->
<button class="btn-combined is-primary">Combined Button</button>
```

#### Cards

```html
<!-- Bulma card -->
<div class="card">
    <div class="card-header">
        <p class="card-header-title">Bulma Card</p>
    </div>
    <div class="card-content">
        <p class="content">Card content</p>
    </div>
</div>

<!-- TailwindCSS card -->
<div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold mb-2">Tailwind Card</h3>
    <p class="text-gray-600">Card content</p>
</div>

<!-- Combined card -->
<div class="card-combined">
    <div class="card-header">
        <p class="card-header-title">Combined Card</p>
    </div>
    <div class="card-content">
        <p class="content">Combined content</p>
    </div>
</div>
```

#### Forms

```html
<form class="form-combined">
    <div class="field">
        <label class="label">Name</label>
        <div class="control">
            <input type="text" class="input-combined" placeholder="Your name">
        </div>
    </div>
    
    <div class="field">
        <label class="label">Email</label>
        <div class="control">
            <input type="email" class="input-combined" placeholder="your@email.com">
        </div>
    </div>
    
    <button type="submit" class="button is-primary">Submit</button>
</form>
```

#### Alerts

```html
<!-- Bulma alert -->
<div class="notification is-primary">
    This is a Bulma notification
</div>

<!-- TailwindCSS alert -->
<div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
    This is a Tailwind alert
</div>

<!-- Combined alert -->
<div class="alert-combined is-info">
    <p class="title">Information</p>
    <p>This is a combined alert</p>
</div>
```

## Available Components

### Combined Components

- `.btn-combined` - Buttons combining Bulma and TailwindCSS
- `.card-combined` - Cards with enhanced styling
- `.form-combined` - Form components with both frameworks
- `.alert-combined` - Alert/notification components
- `.table-combined` - Enhanced table styling
- `.nav-combined` - Navigation components

### Utility Classes

The integration provides utility classes that combine both frameworks:

- `.is-primary`, `.is-secondary`, `.is-success`, `.is-danger` - Color variants
- `.hover:shadow-lg`, `.hover:shadow-xl` - Enhanced hover effects
- `.transition-colors`, `.transition-shadow` - Smooth transitions

## Customization

### Variables

You can customize the integration by modifying `src/styles/variables.scss`:

```scss
// Override Bulma variables
$primary: #ff6b6b;
$secondary: #4ecdc4;
$success: #45b7d1;
$danger: #f9ca24;

// Add custom TailwindCSS utilities
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Mixins

Use the provided mixins to create custom components:

```scss
// Bulma mixin
.my-bulma-button {
    @include bulma-button;
}

// TailwindCSS mixin
.my-tailwind-button {
    @include tailwind-button;
}
```

## Build Process

The build process automatically compiles and concatenates all styles:

1. **Bulma SCSS** → `dist/bulma-tailwind.css`
2. **TailwindCSS** → `dist/bulma-tailwind.css`
3. **Katana UI** → `dist/components.css`
4. **Concatenation** → `dist/styles.css`

## Best Practices

### 1. Use the Right Tool for the Job

- **Bulma**: Use for pre-designed components that need consistency
- **TailwindCSS**: Use for rapid prototyping and custom layouts
- **Combined**: Use when you need the best of both worlds

### 2. Maintain Consistency

- Use the combined components for consistency across your application
- Follow the established naming conventions
- Test thoroughly across different screen sizes

### 3. Performance Considerations

- Use the combined styles to avoid loading multiple CSS files
- Minimize custom CSS to maintain performance
- Use CSS variables for theming

### 4. Responsive Design

- Both frameworks include responsive utilities
- Combine them for enhanced responsive behavior
- Test on multiple devices

## Troubleshooting

### Common Issues

1. **CSS Conflicts**: Use cascade layers to avoid conflicts
2. **Missing Styles**: Ensure all imports are correct
3. **Build Errors**: Check SCSS syntax and file paths

### Debugging

- Use browser dev tools to inspect styles
- Check the generated CSS files
- Test with minimal examples first

## Examples

See the `examples/bulma-tailwind-demo.html` file for a complete working example of the integration.

## Conclusion

The Bulma + TailwindCSS integration provides the best of both worlds:
- Rapid development with pre-designed components
- Custom styling capabilities
- Consistent design system
- Enhanced responsive design

Use this integration to create beautiful, responsive, and maintainable user interfaces.