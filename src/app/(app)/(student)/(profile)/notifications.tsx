import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ViewContainer from '@/src/components/layouts/container';
import TextBase from '@/src/components/shared/TextBase';
import { Palete, TextFontSize } from '@/src/styles/global.styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
		<ViewContainer bgColor={Palete.background}>
			<TouchableOpacity
				onPress={() => router.replace("/(app)/(student)/(profile)")}>
				<Ionicons name="arrow-back" size={22} color="#333" />
			</TouchableOpacity>
			<View style={styles.container}>
				<TextBase size={TextFontSize.H2} weight="bold">
					Notificaciones
				</TextBase>
				{/* Add your notifications components here */}
				<Text>Lista de notificaciones</Text>
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