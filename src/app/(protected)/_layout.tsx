import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { token } = useAuthState();

  if (!token) {
    return <Redirect href="/(auth)/Welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
