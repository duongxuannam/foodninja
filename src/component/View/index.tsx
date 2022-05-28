import React from 'react';
import {StyleSheet, View as ViewRN, ViewProps} from 'react-native';

interface Props extends ViewProps {
  flex?: number;
  h?: number | number;
  w?: number | number;
  r?: boolean;
  contentCenter?: boolean;
  itemCenter?: boolean;
  bg?: string;
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mv?: number;
  mh?: number;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  ph?: number;
  pv?: number;
}

const View = ({style = {}, children, ...rest}: Props) => {
  return (
    <ViewRN {...rest} style={[styles(rest).viewStyle, style]}>
      {children}
    </ViewRN>
  );
};

export default View;

const styles = ({
  flex,
  r,
  h,
  w,
  bg,
  m,
  mv,
  mh,
  mt,
  mb,
  ml,
  mr,
  p,
  ph,
  pv,
  pt,
  pb,
  pl,
  pr,
  itemCenter,
  contentCenter,
}: Props) =>
  StyleSheet.create({
    viewStyle: {
      flex: flex,
      backgroundColor: bg,
      height: h,
      width: w,
      flexDirection: r ? 'row' : 'column',
      margin: m,
      marginHorizontal: mh,
      marginVertical: mv,
      marginBottom: mb,
      marginTop: mt,
      marginLeft: ml,
      marginRight: mr,
      padding: p,
      paddingHorizontal: ph,
      paddingVertical: pv,
      paddingBottom: pb,
      paddingTop: pt,
      paddingLeft: pl,
      paddingRight: pr,
      alignItems: itemCenter ? 'center' : undefined,
      justifyContent: contentCenter ? 'center' : undefined,
    },
  });
