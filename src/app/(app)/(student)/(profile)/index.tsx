// ProfileScreen.tsx
import ViewContainer from '@/src/components/layouts/container';
import TextBase from '@/src/components/shared/TextBase';
import { useAuthState } from '@/src/core/hooks/zustand/useAuthState';
import { useUserState } from '@/src/core/hooks/zustand/useUserState';
import { Palete, TextFontSize } from '@/src/styles/global.styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export default function Profile() {
  const { user } = useUserState()
  const { clearToken } = useAuthState()

  const menuItems: MenuItem[] = [
    {
      icon: 'person-outline',
      label: 'Editar Perfil',
      onPress: () => console.log('Editar perfil')
    },
    // {
    //   icon: 'location-outline',
    //   label: 'Mis Direcciones',
    //   onPress: () => console.log('Mis direcciones')
    // },
    // {
    //   icon: 'receipt-outline',
    //   label: 'Historial de Pedidos',
    //   onPress: () => console.log('Historial')
    // },
    // {
    //   icon: 'card-outline',
    //   label: 'Métodos de Pago',
    //   onPress: () => console.log('Métodos de pago')
    // },
    {
      icon: 'notifications-outline',
      label: 'Notificaciones',
      onPress: () => console.log('Notificaciones')
    },
    {
      icon: 'settings-outline',
      label: 'Configuración',
      onPress: () => console.log('Configuración')
    },
  ];

  const MenuItem = ({ icon, label, onPress }: MenuItem) => (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: pressed ? '#f5f5f5' : '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
      })}
    >
      <View style={{
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
        marginRight: 15
      }}>
        <Ionicons name={icon} size={24} color="#007AFF" />
      </View>
      <TextBase size={TextFontSize.PARAGRAPH}>{label}</TextBase>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="#999"
        style={{ marginLeft: 'auto' }}
      />
    </Pressable>
  );

  return (
		<ViewContainer bgColor={Palete.background}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ alignItems: "center", marginBottom: 30 }}>
					<View
						style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							backgroundColor: "#f0f0f0",
							marginBottom: 15,
							overflow: "hidden",
						}}>
						<Image
							source={{ uri: "https://i.pravatar.cc/300" }}
							style={{ width: "100%", height: "100%" }}
						/>
					</View>
					<TextBase size={TextFontSize.H3} weight="bold">
						{user?.username}
					</TextBase>
					<TextBase style={{ color: "#666", marginTop: 5 }}>
						{user?.email}
					</TextBase>
				</View>

				<View style={{ marginBottom: 20 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							backgroundColor: "#fff",
							borderRadius: 15,
							padding: 20,
							marginBottom: 20,
						}}>
						<View style={{ alignItems: "center" }}>
							<TextBase size={TextFontSize.H3} weight="bold">
								{user?.studentCode}
							</TextBase>
							<TextBase style={{ color: "#666" }}>Codigo Estudiantil</TextBase>
						</View>
						<View
							style={{
								width: 1,
								backgroundColor: "#e0e0e0",
							}}
						/>
						<View style={{ alignItems: "center" }}>
							<TextBase size={TextFontSize.H3} weight="bold">
								{user?.rol === "STUDENT" ? "Estudiante" : "Profesor"}
							</TextBase>
							<TextBase style={{ color: "#666" }}>Rol</TextBase>
						</View>
					</View>

					{menuItems.map((item, index) => (
						<MenuItem key={index} {...item} />
					))}
				</View>

        <Pressable
          onPressIn={() => clearToken()}
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						padding: 15,
						backgroundColor: "#FFE5E5",
						borderRadius: 10,
						marginTop: 20,
					}}
					onPress={() => console.log("Cerrar sesión")}>
					<Ionicons name="log-out-outline" size={24} color="#FF3B30" />
					<TextBase
						style={{
							color: "#FF3B30",
							marginLeft: 10,
							fontWeight: "bold",
						}}>
						Cerrar Sesión
					</TextBase>
				</Pressable>
			</ScrollView>
		</ViewContainer>
	);
}