import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { TextFontSize } from "./../../../styles/global.styles";

interface Props {
  children: React.ReactNode;
  size?: number | TextFontSize;
  color?: string;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  align?: "left" | "center" | "right";
  style?: StyleProp<TextStyle>;
}

export default function TextBase({
  children,
  size = TextFontSize.PARAGRAPH,
  color,
  weight = "normal",
  align = "left",
  style,
}: Props) {
  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          fontWeight: weight,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
