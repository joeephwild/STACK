import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { 
  FontFamilies, 
  DesignSystemTypography, 
  HeadingFontWeight, 
  BodyFontWeight, 
  TypographyVariant 
} from '../lib/fonts';

interface TypographyProps extends RNTextProps {
  variant?: TypographyVariant | 'h3'; // h3 is not in design.json but commonly used
  weight?: HeadingFontWeight | BodyFontWeight;
  className?: string;
}

/**
 * Typography component that follows the design system specifications from design.json
 * Uses MD Nichrome for headings and Gilroy for body text
 * 
 * Design System Specifications:
 * - h1: MD Nichrome, 36px, bold
 * - h2: MD Nichrome, 24px, bold  
 * - body: Gilroy, 16px, regular
 * - label: Gilroy, 14px, medium
 * - caption: Gilroy, 12px, regular
 */
export function Typography({ 
  variant = 'body', 
  weight,
  className = '',
  style,
  children,
  ...props 
}: TypographyProps) {
  const getTypographyStyles = () => {
    // Use design system specifications directly
    if (variant in DesignSystemTypography) {
      const designSpec = DesignSystemTypography[variant as TypographyVariant];
      return {
        fontFamily: weight ? 
          (variant === 'h1' || variant === 'h2' ? 
            FontFamilies.heading[weight as HeadingFontWeight] : 
            FontFamilies.body[weight as BodyFontWeight]
          ) : designSpec.fontFamily,
        fontSize: designSpec.fontSize,
      };
    }
    
    // Handle h3 which is not in design.json but commonly used
    if (variant === 'h3') {
      return {
        fontFamily: weight ? FontFamilies.heading[weight as HeadingFontWeight] : FontFamilies.heading.regular,
        fontSize: 20,
      };
    }
    
    // Fallback to body style
    return {
      fontFamily: DesignSystemTypography.body.fontFamily,
      fontSize: DesignSystemTypography.body.fontSize,
    };
  };

  return (
    <RNText
      style={[getTypographyStyles(), style]}
      className={className}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Convenience components for common use cases based on design.json
export const Heading1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const Heading2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const Heading3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const BodyText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const Label = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="label" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);