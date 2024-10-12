import React from 'react';
import {Image, ImageStyle, StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';
import {ICONS} from '../../assets';
import {IconTypes} from '../../assets/icons';

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;
  /**
   * An optional tint color for the icon
   */
  color?: string;
  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  width?: number;
  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  height?: number;
  /**
   * Style overrides for the icon image
   */
  iconStyle?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress'];

  isPressable?: boolean;
}

export default function AppIcon(props: IconProps) {
  /*
   ** Destructuring props
   */
  const {icon, color, height, width, containerStyle, onPress, isPressable = false, iconStyle, ...IconProps} = props;

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} {...IconProps} disabled={!isPressable}>
      <Image style={iconStyle} source={ICONS[icon]} width={width} height={height} tintColor={color && color} />
    </TouchableOpacity>
  );
}
