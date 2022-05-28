import React from 'react';

type Props = {
  width?: string | number;
  height?: string | number;
  Logo: any;
};

export default function SVGImage({
  width = '100%',
  height = '100%',
  Logo,
}: Props) {
  return <Logo width={width} height={height} />;
}
