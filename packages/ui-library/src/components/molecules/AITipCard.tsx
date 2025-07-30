import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { colors, spacing, borderRadius, typography, shadows } from '../../design/tokens';

export interface AITipCardProps {
  id: string;
  title: string;
  content: string;
  category: 'investment' | 'savings' | 'budgeting' | 'general';
  readTime: string; // e.g., "2 min read"
  isBookmarked?: boolean;
  onPress: () => void;
  onBookmark?: () => void;
  className?: string;
}

export const AITipCard: React.FC<AITipCardProps> = ({
  id,
  title,
  content,
  category,
  readTime,
  isBookmarked = false,
  onPress,
  onBookmark,
  className,
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case 'investment':
        return colors.primary.royalBlue;
      case 'savings':
        return colors.accent.limeGreen;
      case 'budgeting':
        return colors.semantic.warning;
      case 'general':
        return colors.text.secondary;
      default:
        return colors.primary.royalBlue;
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'investment':
        return 'trending-up';
      case 'savings':
        return 'piggy-bank';
      case 'budgeting':
        return 'calculator';
      case 'general':
        return 'lightbulb';
      default:
        return 'lightbulb';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`AI tip: ${title}. ${content}. Category: ${category}. ${readTime}`}
      accessibilityHint="Tap to read full tip"
      className={className}
    >
      <Card variant="default" padding="none" style={[shadows.md]}>
        <View
          style={{
            backgroundColor: colors.surface.light,
            borderRadius: borderRadius.xl,
            padding: spacing.md,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* AI Sparkle Background Effect */}
          <View
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: getCategoryColor() + '08',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.accent.limeGreen + '05',
            }}
          />

          {/* Header Section */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md }}>
            {/* AI Icon */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: getCategoryColor() + '15',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
                ...shadows.sm,
              }}
            >
              <Icon
                name="sparkles"
                size={24}
                color={getCategoryColor()}
                accessibilityLabel=""
              />
            </View>

            {/* Title and Category */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                <View
                  style={{
                    backgroundColor: getCategoryColor() + '15',
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                    borderRadius: borderRadius.lg,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: spacing.sm,
                  }}
                >
                  <Icon
                    name={getCategoryIcon()}
                    size={12}
                    color={getCategoryColor()}
                    accessibilityLabel=""
                  />
                  <Text
                    style={{
                      fontFamily: typography.fonts.primary,
                      fontSize: 12,
                      fontWeight: typography.weights.medium,
                      color: getCategoryColor(),
                      marginLeft: spacing.xs,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category}
                  </Text>
                </View>

                {/* Read Time */}
                <Text
                  style={{
                    fontFamily: typography.fonts.primary,
                    fontSize: 12,
                    color: colors.text.tertiary,
                  }}
                >
                  {readTime}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: typography.fonts.secondary,
                  fontSize: 18,
                  fontWeight: typography.weights.bold,
                  color: colors.text.primary,
                  lineHeight: 24,
                }}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>

            {/* Bookmark Button */}
            {onBookmark && (
              <TouchableOpacity
                onPress={onBookmark}
                style={{
                  padding: spacing.sm,
                  borderRadius: borderRadius.lg,
                  backgroundColor: isBookmarked ? colors.accent.limeGreen + '15' : colors.surface.card,
                }}
                accessibilityRole="button"
                accessibilityLabel={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Icon
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={isBookmarked ? colors.accent.limeGreen : colors.text.secondary}
                  accessibilityLabel=""
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Content Preview */}
          <Text
            style={{
              fontFamily: typography.fonts.primary,
              fontSize: 14,
              color: colors.text.secondary,
              lineHeight: 20,
              marginBottom: spacing.md,
            }}
            numberOfLines={3}
          >
            {content}
          </Text>

          {/* Bottom Section with AI Badge and CTA */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* AI Powered Badge */}
            <View
              style={{
                backgroundColor: colors.primary.royalBlue + '10',
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.lg,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name="cpu"
                size={14}
                color={colors.primary.royalBlue}
                accessibilityLabel=""
              />
              <Text
                style={{
                  fontFamily: typography.fonts.primary,
                  fontSize: 12,
                  fontWeight: typography.weights.medium,
                  color: colors.primary.royalBlue,
                  marginLeft: spacing.xs,
                }}
              >
                AI Powered
              </Text>
            </View>

            {/* Read More Button */}
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: getCategoryColor(),
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                borderRadius: borderRadius.lg,
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: 100,
                justifyContent: 'center',
              }}
              accessibilityRole="button"
              accessibilityLabel="Read full tip"
            >
              <Text
                style={{
                  fontFamily: typography.fonts.primary,
                  fontSize: 14,
                  fontWeight: typography.weights.bold,
                  color: colors.text.onPrimary,
                  marginRight: spacing.xs,
                }}
              >
                Read More
              </Text>
              <Icon
                name="arrow-right"
                size={16}
                color={colors.text.onPrimary}
                accessibilityLabel=""
              />
            </TouchableOpacity>
          </View>

          {/* Floating AI Indicator */}
          <View
            style={{
              position: 'absolute',
              top: spacing.sm,
              right: spacing.sm,
              backgroundColor: colors.accent.limeGreen,
              borderRadius: borderRadius.lg,
              padding: spacing.xs,
              ...shadows.sm,
            }}
          >
            <Icon
              name="zap"
              size={12}
              color={colors.text.onAccent}
              accessibilityLabel="AI generated tip"
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
