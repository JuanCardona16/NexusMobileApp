import ViewContainer from "@/src/components/layouts/container";
import CustomModal from "@/src/components/UI/Modal";
import useAuth from "@/src/features/auth/basic/hooks/useAuth";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
	const { logout } = useAuth();

	return (
		<ViewContainer bgColor="rgb(239, 239, 239)">
			<View>
				<Text>Pantalla de inicio</Text>
			</View>
			<CustomModal
        modalId="logout"
				variant="confirmation"
				title="Cerrar sesión"
				message="¿Estás seguro de que quieres salir de tu cuenta?"
				cancelText="Cancelar"
				confirmText="Cerrar sesión"
        onConfirm={logout}
			/>
		</ViewContainer>
	);
}
