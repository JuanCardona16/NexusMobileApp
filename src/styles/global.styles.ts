import { StyleSheet } from "react-native";
import { ThemeColors } from "../constants";

export enum TextFontSize {
  H1 = 28,
  H2 = 22,
  H3 = 18,
  PARAGRAPH = 16,
  SUB_PARAGRAPH = 14,
  BUTTON_TEXT = 17,
  INPUT_TEXT = 16,
}

// #4C4F6B -> Azul secundario cristacion

// Estilos globales
export const GlobalStyles = StyleSheet.create({
  buttonPrimary: {
    borderColor: ThemeColors.border,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#6C63FF",
  },
  bottonGoogle: {
    borderColor: ThemeColors.border,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
