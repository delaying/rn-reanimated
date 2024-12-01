import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function PagesLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="onboarding-pagination-indicator"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
