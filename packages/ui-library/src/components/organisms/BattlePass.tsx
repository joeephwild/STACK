import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../atoms/Card';
import { ProgressBar } from '../atoms/ProgressBar';
import { Icon } from '../atoms/Icon';
import { colors, typography, spacing, borderRadius } from '../../design/tokens';

export interface BattlePassTier {
  id: string;
  level: number;
  reward: string;
  isUnlocked: boolean;
  isClaimed: boolean;
  isPremium?: boolean;
  icon?: string;
}

export interface BattlePassProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  tiers: BattlePassTier[];
  hasPremium?: boolean;
  onTierPress?: (tier: BattlePassTier) => void;
  onUpgradePress?: () => void;
  className?: string;
  testID?: string;
}

export const BattlePass: React.FC<BattlePassProps> = ({
  currentLevel,
  currentXP,
  xpToNextLevel,
  totalXP,
  tiers,
  hasPremium = false,
  onTierPress,
  onUpgradePress,
  className,
  testID,
}) => {
  const progressPercentage = totalXP > 0 ? (currentXP / totalXP) * 100 : 0;

  const renderTier = (tier: BattlePassTier) => {
    const isActive = tier.level === currentLevel;
    const canClaim = tier.isUnlocked && !tier.isClaimed;

    return (
      <TouchableOpacity
        key={tier.id}
        onPress={() => onTierPress?.(tier)}
        disabled={!onTierPress}
        className="items-center mx-2"
        accessibilityRole={onTierPress ? 'button' : undefined}
        accessibilityLabel={`Tier ${tier.level}, ${tier.reward}, ${tier.isClaimed ? 'claimed' : tier.isUnlocked ? 'available' : 'locked'}`}
      >
        <View
          className="relative items-center justify-center w-16 h-16 rounded-full mb-2"
          style={{
            backgroundColor: tier.isUnlocked
              ? tier.isPremium
                ? colors.accent.limeGreen
                : colors.primary.royalBlue
              : colors.surface.card,
            borderWidth: isActive ? 3 : 1,
            borderColor: isActive
              ? colors.primary.royalBlue
              : tier.isUnlocked
              ? colors.border.primary
              : colors.border.secondary,
          }}
        >
          {tier.isClaimed && (
            <View
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.semantic.success }}
            >
              <Icon
                name="checkmark"
                library="ionicons"
                size={12}
                color={colors.text.onPrimary}
              />
            </View>
          )}

          {canClaim && (
            <View
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full items-center justify-center animate-pulse"
              style={{ backgroundColor: colors.accent.limeGreen }}
            >
              <Icon
                name="gift"
                library="ionicons"
                size={12}
                color={colors.text.onPrimary}
              />
            </View>
          )}

          <Icon
            name={tier.icon || (tier.isPremium ? 'diamond' : 'trophy')}
            library="ionicons"
            size={24}
            color={tier.isUnlocked ? colors.text.onPrimary : colors.text.tertiary}
          />
        </View>

        <Text
          style={{
            fontFamily: typography.fonts.secondary,
            fontSize: 10,
            fontWeight: typography.weights.bold,
            color: isActive ? colors.primary.royalBlue : colors.text.secondary,
            textAlign: 'center',
          }}
        >
          {tier.level}
        </Text>

        <Text
          style={{
            fontFamily: typography.fonts.secondary,
            fontSize: typography.styles.caption.size,
            color: colors.text.tertiary,
            textAlign: 'center',
            marginTop: spacing.xs,
          }}
          numberOfLines={2}
        >
          {tier.reward}
        </Text>

        {tier.isPremium && !hasPremium && (
          <View
            className="absolute top-0 left-0 right-0 bottom-0 rounded-full items-center justify-center"
            style={{
              backgroundColor: colors.overlay,
            }}
          >
            <Icon
              name="lock-closed"
              library="ionicons"
              size={16}
              color={colors.text.onPrimary}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Card className={`p-4 ${className || ''}`} testID={testID}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text
            style={{
              fontFamily: typography.fonts.primary,
              fontSize: typography.styles.h3.size,
              fontWeight: typography.weights.bold,
              color: colors.text.primary,
            }}
          >
            Battle Pass
          </Text>
          <Text
            style={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.body.size,
              color: colors.text.secondary,
            }}
          >
            Level {currentLevel}
          </Text>
        </View>

        {!hasPremium && onUpgradePress && (
          <TouchableOpacity
            onPress={onUpgradePress}
            className="px-4 py-2 rounded-full"
            style={{ backgroundColor: colors.accent.limeGreen }}
            accessibilityRole="button"
            accessibilityLabel="Upgrade to premium battle pass"
          >
            <Text
              style={{
                fontFamily: typography.fonts.secondary,
                fontSize: typography.styles.label.size,
                fontWeight: typography.weights.semibold,
                color: colors.text.onPrimary,
              }}
            >
              Upgrade
            </Text>
          </TouchableOpacity>
        )}

        {hasPremium && (
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.accent.limeGreen }}
          >
            <Text
              style={{
                fontFamily: typography.fonts.secondary,
                fontSize: typography.styles.caption.size,
                fontWeight: typography.weights.semibold,
                color: colors.text.onPrimary,
              }}
            >
              PREMIUM
            </Text>
          </View>
        )}
      </View>

      {/* Progress */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            style={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.label.size,
              fontWeight: typography.weights.medium,
              color: colors.text.primary,
            }}
          >
            {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
          </Text>
          
          <Text
            style={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.label.size,
              fontWeight: typography.weights.semibold,
              color: colors.primary.royalBlue,
            }}
          >
            {Math.round(progressPercentage)}%
          </Text>
        </View>
        
        <ProgressBar
          progress={progressPercentage}
          height={8}
          progressColor={colors.primary.royalBlue}
          backgroundColor={colors.surface.card}
        />
      </View>

      {/* Tiers */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerStyle={{ paddingHorizontal: spacing.sm }}
      >
        {tiers.map(renderTier)}
      </ScrollView>
    </Card>
  );
};