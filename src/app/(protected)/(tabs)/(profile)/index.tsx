import ViewContainer from "@/src/components/layouts/container";
import { useUser } from "@/src/features/user/hooks/useUser";
import React, { useEffect } from "react";
import { Text } from "react-native";

export default function Profile() {
  const { profile } = useUser()

  useEffect(() => {
    const user = profile.profile;
    console.log("Informacion del usuario", user)
  }, [profile.profile])

  return (
    <ViewContainer bgColor="rgb(239, 239, 239)">
      <Text>Pantalla para el perfil del usuario</Text>
    </ViewContainer>
  );
}
