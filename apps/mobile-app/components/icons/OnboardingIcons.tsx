import React from 'react';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const WelcomeIcon: React.FC<IconProps> = ({ size = 120, color = '#4F46E5' }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <Defs>
      <LinearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#4F46E5" />
        <Stop offset="100%" stopColor="#7C3AED" />
      </LinearGradient>
    </Defs>
    <Circle cx="60" cy="60" r="50" fill="url(#welcomeGradient)" />
    <Path
      d="M40 45h40v30H40z"
      fill="white"
      fillOpacity="0.2"
    />
    <Path
      d="M45 50h10v5H45zm15 0h10v5H60zm-15 10h25v5H45zm0 10h20v5H45z"
      fill="white"
    />
    <Circle cx="75" cy="35" r="8" fill="#10B981" />
    <Path
      d="M72 35l2 2 4-4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const GiftIcon: React.FC<IconProps> = ({ size = 120, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <Defs>
      <LinearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#10B981" />
        <Stop offset="100%" stopColor="#059669" />
      </LinearGradient>
    </Defs>
    <Circle cx="60" cy="60" r="50" fill="url(#giftGradient)" />
    
    {/* Gift box */}
    <Rect x="35" y="50" width="50" height="35" rx="4" fill="white" fillOpacity="0.9" />
    <Rect x="35" y="45" width="50" height="10" rx="2" fill="white" />
    
    {/* Ribbon vertical */}
    <Rect x="57" y="30" width="6" height="55" fill="#EF4444" />
    
    {/* Ribbon horizontal */}
    <Rect x="30" y="47" width="60" height="6" fill="#EF4444" />
    
    {/* Bow */}
    <Path
      d="M50 35c0-5 5-8 10-5s5 8 0 10c5 2 10-2 10-5s-5-8-10-5"
      fill="#EF4444"
    />
    
    {/* Sparkles */}
    <Circle cx="45" cy="35" r="2" fill="#FCD34D" />
    <Circle cx="75" cy="40" r="1.5" fill="#FCD34D" />
    <Circle cx="80" cy="65" r="2" fill="#FCD34D" />
    <Circle cx="40" cy="70" r="1.5" fill="#FCD34D" />
  </Svg>
);

export const ChartIcon: React.FC<IconProps> = ({ size = 48, color = '#4F46E5' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Defs>
      <LinearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#4F46E5" />
        <Stop offset="100%" stopColor="#7C3AED" />
      </LinearGradient>
    </Defs>
    <Circle cx="24" cy="24" r="20" fill="url(#chartGradient)" />
    <Path
      d="M14 28l6-6 4 4 10-10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Circle cx="34" cy="16" r="2" fill="white" />
    <Circle cx="24" cy="22" r="2" fill="white" />
    <Circle cx="20" cy="22" r="2" fill="white" />
    <Circle cx="14" cy="28" r="2" fill="white" />
  </Svg>
);

export const AIIcon: React.FC<IconProps> = ({ size = 48, color = '#7C3AED' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Defs>
      <LinearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#7C3AED" />
        <Stop offset="100%" stopColor="#A855F7" />
      </LinearGradient>
    </Defs>
    <Circle cx="24" cy="24" r="20" fill="url(#aiGradient)" />
    
    {/* Brain/AI symbol */}
    <Path
      d="M16 20c0-4 4-6 8-6s8 2 8 6c0 2-1 4-2 5 1 1 2 3 2 5 0 4-4 6-8 6s-8-2-8-6c0-2 1-4 2-5-1-1-2-3-2-5z"
      fill="white"
      fillOpacity="0.9"
    />
    
    {/* Neural connections */}
    <Circle cx="20" cy="20" r="1.5" fill="#7C3AED" />
    <Circle cx="28" cy="20" r="1.5" fill="#7C3AED" />
    <Circle cx="24" cy="24" r="1.5" fill="#7C3AED" />
    <Circle cx="20" cy="28" r="1.5" fill="#7C3AED" />
    <Circle cx="28" cy="28" r="1.5" fill="#7C3AED" />
    
    <Path
      d="M20 20l4 4m4-4l-4 4m-4 4l4-4m4 4l-4-4"
      stroke="#7C3AED"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
  </Svg>
);

export const TrackingIcon: React.FC<IconProps> = ({ size = 48, color = '#059669' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Defs>
      <LinearGradient id="trackingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#059669" />
        <Stop offset="100%" stopColor="#10B981" />
      </LinearGradient>
    </Defs>
    <Circle cx="24" cy="24" r="20" fill="url(#trackingGradient)" />
    
    {/* Monitor/screen */}
    <Rect x="12" y="16" width="24" height="16" rx="2" fill="white" fillOpacity="0.9" />
    <Rect x="14" y="18" width="20" height="12" rx="1" fill="#059669" />
    
    {/* Chart line */}
    <Path
      d="M16 26l4-3 4 2 4-4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Data points */}
    <Circle cx="16" cy="26" r="1" fill="white" />
    <Circle cx="20" cy="23" r="1" fill="white" />
    <Circle cx="24" cy="25" r="1" fill="white" />
    <Circle cx="28" cy="21" r="1" fill="white" />
  </Svg>
);

export const FractionalIcon: React.FC<IconProps> = ({ size = 48, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Defs>
      <LinearGradient id="fractionalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#F59E0B" />
        <Stop offset="100%" stopColor="#D97706" />
      </LinearGradient>
    </Defs>
    <Circle cx="24" cy="24" r="20" fill="url(#fractionalGradient)" />
    
    {/* Coin stack */}
    <Circle cx="24" cy="26" r="8" fill="white" fillOpacity="0.9" />
    <Circle cx="24" cy="24" r="8" fill="white" fillOpacity="0.9" />
    <Circle cx="24" cy="22" r="8" fill="white" />
    
    {/* Dollar sign */}
    <Path
      d="M24 18v8m-2-6h4c1 0 2 1 2 2s-1 2-2 2h-4c-1 0-2 1-2 2s1 2 2 2h4"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const SecurityIcon: React.FC<IconProps> = ({ size = 20, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2L3 6v4c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-4z"
      fill={color}
    />
    <Path
      d="M8 10l2 2 4-4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);