# Font Usage Guide - STACK Mobile App

This guide explains how to use the custom fonts in the STACK mobile app, configured according to the design system specifications in `design.json`.

## Design System Typography

The STACK app uses a two-font system as specified in the design system:

### Primary Font: MD Nichrome
- **Usage**: Headings and prominent text
- **Description**: A modern, bold typeface used to convey strength and clarity
- **Design System Specs**:
  - H1: 36px, bold
  - H2: 24px, bold

### Secondary Font: Gilroy  
- **Usage**: Body text, labels, captions, and UI elements
- **Description**: A clean and legible sans-serif font for consistency and readability
- **Design System Specs**:
  - Body: 16px, regular
  - Label: 14px, medium
  - Caption: 12px, regular

## Available Font Weights

### MD Nichrome (Heading Font)
- `thin` - MDNichrome-Thin
- `light` - MDNichrome-Light  
- `regular` - MDNichrome-Regular
- `bold` - MDNichrome-Bold ⭐ (Default for headings)
- `dark` - MDNichrome-Dark
- `ultra` - MDNichrome-Ultra
- `infra` - MDNichrome-Infra

### Gilroy (Body Font)
- `light` - Gilroy-Light ⭐ (Used for body text and captions)
- `regular` - Gilroy-Light (Mapped to light since no true regular available)
- `medium` - Gilroy-ExtraBold (Used for labels)
- `bold` - Gilroy-ExtraBold

## Usage Methods

### 1. Typography Component (Recommended)

The Typography component automatically applies design system specifications:

```tsx
import { Typography, Heading1, Heading2, BodyText, Label, Caption } from '@/components/Typography';

// Using the main Typography component
<Typography variant="h1">Main Heading</Typography>
<Typography variant="h2">Section Heading</Typography>
<Typography variant="body">Body text content</Typography>
<Typography variant="label">Form Label</Typography>
<Typography variant="caption">Small caption text</Typography>

// Using convenience components
<Heading1>Main Heading</Heading1>
<Heading2>Section Heading</Heading2>
<BodyText>Body text content</BodyText>
<Label>Form Label</Label>
<Caption>Small caption text</Caption>

// Custom weight override
<Typography variant="h1" weight="light">Light Heading</Typography>
<Typography variant="body" weight="bold">Bold Body Text</Typography>
```

### 2. Tailwind CSS Classes

Use semantic font classes that align with the design system:

```tsx
// Design System Typography Classes
<Text className="font-h1 text-h1">Main Heading (36px, bold)</Text>
<Text className="font-h2 text-h2">Section Heading (24px, bold)</Text>
<Text className="font-body text-body">Body Text (16px, regular)</Text>
<Text className="font-label text-label">Label Text (14px, medium)</Text>
<Text className="font-caption text-caption">Caption Text (12px, regular)</Text>

// Font Family Classes
<Text className="font-heading">MD Nichrome Bold (default heading)</Text>
<Text className="font-heading-light">MD Nichrome Light</Text>
<Text className="font-body">Gilroy Light (default body)</Text>
<Text className="font-body-medium">Gilroy ExtraBold (for labels)</Text>

// Font Size Classes
<Text className="text-h1">36px text</Text>
<Text className="text-h2">24px text</Text>
<Text className="text-body">16px text</Text>
<Text className="text-label">14px text</Text>
<Text className="text-caption">12px text</Text>
```

### 3. Direct Font Family Import

For advanced use cases, import font families directly:

```tsx
import { FontFamilies, DesignSystemTypography } from '@/lib/fonts';

// Using font families
<Text style={{ fontFamily: FontFamilies.heading.bold, fontSize: 36 }}>
  Custom Heading
</Text>

// Using design system specifications
<Text style={DesignSystemTypography.h1}>
  Design System H1
</Text>
```

## Design System Mappings

Based on `design.json` specifications:

| Element | Font | Size | Weight | Tailwind Classes |
|---------|------|------|--------|------------------|
| H1 | MD Nichrome | 36px | Bold | `font-h1 text-h1` |
| H2 | MD Nichrome | 24px | Bold | `font-h2 text-h2` |
| Body | Gilroy | 16px | Regular | `font-body text-body` |
| Label | Gilroy | 14px | Medium | `font-label text-label` |
| Caption | Gilroy | 12px | Regular | `font-caption text-caption` |

## Color Classes

Use these color classes with your typography:

```tsx
// Text Colors (from design.json)
<Text className="text-text-primary">Primary text (#000000)</Text>
<Text className="text-text-secondary">Secondary text (#545454)</Text>
<Text className="text-text-tertiary">Tertiary text (#A0A0A0)</Text>
<Text className="text-text-on-primary">Text on primary (#FFFFFF)</Text>
<Text className="text-text-on-accent">Text on accent (#000000)</Text>

// Brand Colors
<Text className="text-primary">Primary brand color (#5852FF)</Text>
<Text className="text-accent">Accent color (#B9FF4B)</Text>

// Semantic Colors
<Text className="text-semantic-success">Success (#28A745)</Text>
<Text className="text-semantic-danger">Danger (#DC3545)</Text>
<Text className="text-semantic-warning">Warning (#FFC107)</Text>
```

## Complete Example

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Heading1, Heading2, BodyText, Label, Caption } from '@/components/Typography';

export default function TypographyShowcase() {
  return (
    <ScrollView className="flex-1 bg-background-main p-6">
      {/* Design System Typography */}
      <View className="mb-8">
        <Heading1 className="text-text-primary mb-4">
          STACK App Typography
        </Heading1>
        
        <Heading2 className="text-text-primary mb-3">
          Design System Specifications
        </Heading2>
        
        <BodyText className="text-text-secondary mb-4">
          This typography system follows the design specifications from design.json, 
          using MD Nichrome for headings and Gilroy for body text.
        </BodyText>
        
        <Label className="text-text-primary mb-2">
          Form Label Example
        </Label>
        
        <Caption className="text-text-tertiary">
          Caption text for additional information
        </Caption>
      </View>

      {/* Brand Colors */}
      <View className="mb-8">
        <Heading2 className="text-primary mb-3">
          Primary Brand Color
        </Heading2>
        
        <BodyText className="text-accent mb-4">
          Accent Color Text
        </BodyText>
      </View>

      {/* Semantic Colors */}
      <View>
        <BodyText className="text-semantic-success mb-2">
          Success Message
        </BodyText>
        <BodyText className="text-semantic-danger mb-2">
          Error Message
        </BodyText>
        <BodyText className="text-semantic-warning">
          Warning Message
        </BodyText>
      </View>
    </ScrollView>
  );
}
```

## Notes

- Font weights are mapped to available font files (we only have Light and ExtraBold for Gilroy)
- The Typography component automatically applies design system specifications
- Use semantic Tailwind classes for consistency with the design system
- All specifications align with the design.json file in the project