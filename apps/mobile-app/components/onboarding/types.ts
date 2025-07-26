export interface OnboardingStepProps {
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

export interface FreeStarterSliceStepProps {
  onAccept: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}
