import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { ProgressBar } from '../atoms/ProgressBar';
import { colors, spacing, borderRadius, typography, shadows } from '../../design/tokens';

export interface QuestFeedCardProps {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  streakCount?: number;
  onPress: () => void;
  className?: string;
}

export const QuestFeedCard: React.FC<QuestFeedCardProps> = ({
  id,
  title,
  description,
  progress,
  xpReward,
  difficulty,
  isCompleted,
  streakCount,
  onPress,
  className,
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return colors.semantic.success;
      case 'medium':
        return colors.semantic.warning;
      case 'hard':
        return colors.semantic.danger;
      default:
        return colors.semantic.success;
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'easy':
        return 'star';
      case 'medium':
        return 'zap';
      case 'hard':
        return 'flame';
      default:
        return 'star';
    }
  };

  const getBackgroundColor = () => {
    if (isCompleted) {
      return colors.accent.limeGreen + '10';
    }
    return colors.surface.card;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} quest. ${description}. Progress: ${progress}%. Reward: ${xpReward} XP`}
      accessibilityHint="Tap to start or continue quest"
      className={className}
    >
      <Card variant="quest" padding="none" style={[shadows.md]}>
        <View
          style={{
            backgroundColor: getBackgroundColor(),
            borderRadius: borderRadius.xl,
            padding: spacing.md,
          }}
        >
          {/* Header with Quest Icon and Difficulty */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            {/* Quest Icon */}
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: isCompleted ? colors.accent.limeGreen : getDifficultyColor(),
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
                ...shadows.sm,
              }}
            >
              <Icon
                name={isCompleted ? 'check-circle' : getDifficultyIcon()}
                size={28}
                color={isCompleted ? colors.text.onAccent : colors.text.onPrimary}
                accessibilityLabel=""
              />
            </View>

            {/* Quest Info */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                <Text
                  style={{
                    fontFamily: typography.fonts.secondary,
                    fontSize: 18,
                    fontWeight: typography.weights.bold,
                    color: colors.text.primary,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {title}
                </Text>

                {/* Streak Badge */}
                {streakCount && streakCount > 0 && (
                  <View
                    style={{
                      backgroundColor: colors.semantic.warning + '20',
                      paddingHorizontal: spacing.sm,
                      paddingVertical: spacing.xs,
                      borderRadius: borderRadius.lg,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: spacing.sm,
                    }}
                  >
                    <Icon
                      name="flame"
                      size={12}
                      color={colors.semantic.warning}
                      accessibilityLabel=""
                    />
                    <Text
                      style={{
                        fontFamily: typography.fonts.primary,
                        fontSize: 12,
                        fontWeight: typography.weights.bold,
                        color: colors.semantic.warning,
                        marginLeft: 2,
                      }}
                    >
                      {streakCount}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={{
                  fontFamily: typography.fonts.primary,
                  fontSize: 14,
                  color: colors.text.secondary,
                  lineHeight: 20,
                }}
                numberOfLines={2}
              >
                {description}
              </Text>
            </View>
          </View>

          {/* Progress Section */}
          {!isCompleted && (
            <View style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                <Text
                  style={{
                    fontFamily: typography.fonts.primary,
                    fontSize: 12,
                    color: colors.text.tertiary,
                  }}
                >
                  Progress
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fonts.primary,
                    fontSize: 12,
                    fontWeight: typography.weights.medium,
                    color: colors.text.secondary,
                  }}
                >
                  {progress}%
                </Text>
              </View>
              <ProgressBar
                progress={progress}
                height={8}
                backgroundColor={colors.surface.card}
                progressColor={getDifficultyColor()}
                style={{ borderRadius: borderRadius.sm }}
              />
            </View>
          )}

          {/* Bottom Section with XP and CTA */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* XP Reward */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: colors.primary.royalBlue + '15',
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                  borderRadius: borderRadius.lg,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name="award"
                  size={16}
                  color={colors.primary.royalBlue}
                  accessibilityLabel=""
                />
                <Text
                  style={{
                    fontFamily: typography.fonts.primary,
                    fontSize: 14,
                    fontWeight: typography.weights.bold,
                    color: colors.primary.royalBlue,
                    marginLeft: spacing.xs,
                  }}
                >
                  {xpReward} XP
                </Text>
              </View>

              {/* Difficulty Badge */}
              <View
                style={{
                  backgroundColor: getDifficultyColor() + '15',
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                  borderRadius: borderRadius.lg,
                  marginLeft: spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fonts.primary,
                    fontSize: 12,
                    fontWeight: typography.weights.medium,
                    color: getDifficultyColor(),
                    textTransform: 'capitalize',
                  }}
                >
                  {difficulty}
                </Text>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: isCompleted ? colors.accent.limeGreen : colors.primary.royalBlue,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                borderRadius: borderRadius.lg,
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: 80,
                justifyContent: 'center',
              }}
              accessibilityRole="button"
              accessibilityLabel={isCompleted ? "Quest completed" : "Start quest"}
            >
              <Text
                style={{
                  fontFamily: typography.fonts.primary,
                  fontSize: 14,
                  fontWeight: typography.weights.bold,
                  color: isCompleted ? colors.text.onAccent : colors.text.onPrimary,
                  marginRight: spacing.xs,
                }}
              >
                {isCompleted ? 'Done' : 'Start'}
              </Text>
              <Icon
                name={isCompleted ? 'check' : 'play'}
                size={16}
                color={isCompleted ? colors.text.onAccent : colors.text.onPrimary}
                accessibilityLabel=""
              />
            </TouchableOpacity>
          </View>

          {/* Completion Celebration */}
          {isCompleted && (
            <View
              style={{
                position: 'absolute',
                top: spacing.sm,
                right: spacing.sm,
                backgroundColor: colors.accent.limeGreen,
                borderRadius: borderRadius.lg,
                padding: spacing.xs,
              }}
            >
              <Icon
                name="sparkles"
                size={16}
                color={colors.text.onAccent}
                accessibilityLabel="Quest completed"
              />
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
