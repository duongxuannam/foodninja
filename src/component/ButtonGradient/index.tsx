import React from 'react';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {COLORS} from 'util/palette';

interface ButtonGradientProps extends Partial<LinearGradientProps> {}

const ButtonGradient = ({
  style = {},
  children,
  colors,
  ...rest
}: ButtonGradientProps) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors || [COLORS.GROTESQUE_GREEN, COLORS.TIMES_SQUARE_SCREENS]}
      style={style}
      {...rest}>
      {children}
    </LinearGradient>
  );
};

export default ButtonGradient;
