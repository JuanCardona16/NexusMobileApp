import { useAuthState } from '@/src/core/hooks/zustand/useAuthState'
import { SplashScreen } from 'expo-router'

export default function SplashScreenController() {
  
  const { isAuthenticated } = useAuthState()

  if (!isAuthenticated) {
    SplashScreen.hideAsync();
  }

  return null;

}