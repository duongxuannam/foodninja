import React from 'react';
import {StyleSheet, Text as TextRN, TextProps} from 'react-native';

interface Props extends TextProps {
  f?: string;
  fw?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  s?: number;
  fs?: 'normal' | 'italic' | undefined;
  cl?: string;
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
  ct?: boolean;
  lh?: number;
}

const Text = ({style = {}, children, ...rest}: Props) => {
  return (
    <TextRN {...rest} style={[styles(rest).textStyle, style]}>
      {children}
    </TextRN>
  );
};

export default Text;

const styles = ({
  // f,
  fw,
  s,
  fs,
  cl,
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
  ct,
  lh,
}: Props) =>
  StyleSheet.create({
    textStyle: {
      color: cl,
      // fontFamily: f || 'BentonSans',
      fontSize: s || 20,
      fontWeight: fw || 'normal',
      fontStyle: fs || 'normal',
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
      textAlign: ct ? 'center' : undefined,
      lineHeight: lh,
    },
  });
