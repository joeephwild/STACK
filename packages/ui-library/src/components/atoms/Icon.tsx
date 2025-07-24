import React from 'react';
import { View, ViewProps } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { colors } from '../../design/tokens';

export type IconLibrary = 'ionicons' | 'material' | 'fontawesome' | 'antdesign' | 'entypo' | 'feather';

export interface IconProps extends Omit<ViewProps, 'children'> {
  name: string;
  library?: IconLibrary;
  size?: number;
  color?: string;
  className?: string;
  testID?: string;
}

const IconComponents = {
  ionicons: Ionicons,
  material: MaterialIcons,
  fontawesome: FontAwesome,
  antdesign: AntDesign,
  entypo: Entypo,
  feather: Feather,
} as const;

export const Icon: React.FC<IconProps> = ({
  name,
  library = 'ionicons',
  size = 24,
  color = colors.text.primary,
  className,
  testID,
  style,
  ...props
}) => {
  const IconComponent = IconComponents[library];

  return (
    <View 
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      className={className}
      testID={testID}
      {...props}
    >
      <IconComponent 
        name={name as any}
        size={size}
        color={color}
      />
    </View>
  );
};