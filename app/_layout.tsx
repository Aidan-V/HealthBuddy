import { Redirect, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="list" options={{ headerShown: false }} />
      <Redirect href="/list" />
    </Stack>
  );
}
