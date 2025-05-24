import { ThemeColors } from "@/src/constants";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ThemeColors.primary,
      }}
    >
      <Text>Nexus</Text>
    </SafeAreaView>
  );
}
