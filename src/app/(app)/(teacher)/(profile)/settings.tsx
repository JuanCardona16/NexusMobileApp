import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ViewContainer from '@/src/components/layouts/container';
import TextBase from '@/src/components/shared/TextBase';
import { Palete, TextFontSize } from '@/src/styles/global.styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ViewContainer bgColor={Palete.background}>
      <TouchableOpacity onPress={() => router.replace("/(app)/(teacher)/(profile)")}>
        <Ionicons name="arrow-back" size={22} color="#333" />
      </TouchableOpacity>
      <View style={styles.container}>
        <TextBase size={TextFontSize.H2} weight="bold">Configuración</TextBase>
        {/* Add your settings components here */}
        <Text>Opciones de configuración del profesor</Text>
      </View>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});