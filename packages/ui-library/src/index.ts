// Atomic components
export { Button } from './components/atoms/Button';
export { Card } from './components/atoms/Card';
export { ProgressBar } from './components/atoms/ProgressBar';
export { ToggleSwitch } from './components/atoms/ToggleSwitch';
export { Modal } from './components/atoms/Modal';
export { InputField } from './components/atoms/InputField';
export { SocialLoginButton, SocialLoginButtons } from './components/atoms/SocialLoginButtons';
export { CountryPicker } from './components/atoms/CountryPicker';
export { PhoneNumberInput } from './components/atoms/PhoneNumberInput';
export { OrSeparator } from './components/atoms/OrSeparator';

// Molecular Components (combinations of atoms)
export { Header } from './components/molecules/Header';
export { FeatureCard } from './components/molecules/FeatureCard';
export { BalanceCard } from './components/molecules/BalanceCard';
export { TextLink } from './components/molecules/TextLink';
export { Illustration } from './components/molecules/Illustration';

// Organism Components (to be added)
// export { Modal } from './components/organisms/Modal';
// export { TabBar } from './components/organisms/TabBar';

// Design System
export { designTokens, colors, typography, spacing, borderRadius, shadows, animations, breakpoints } from './design/tokens';

// Types
export type { 
  BaseComponentProps,
  ButtonProps,
  InputFieldProps,
  CardProps,
  IconProps,
  ProgressBarProps,
  ModalProps,
  HeaderProps,
  FeatureCardProps,
  BalanceCardProps,
  TextLinkProps,
  IllustrationProps,
  TabBarProps,
  TabItem,
  DesignTokens
} from './types';