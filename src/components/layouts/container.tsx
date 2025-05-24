import { StyleSheet, View } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
}

export default function ViewContainer({ children, bgColor ="#FFFFFF" }: Props) {
  return <View style={[containerStyles.container, { backgroundColor: bgColor } ]}>{children}</View>;
}

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
