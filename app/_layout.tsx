import { Stack } from "expo-router";

export default function RootLayout(){
  return <Stack/>;
}





















/*import { COLORS, TYPOGRAPHY } from "@/lib/design";
import { Stack } from "expo-router";

export const screenOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: COLORS.textInverse,
  headerTitleStyle: {
    fontWeight: TYPOGRAPHY.semibold,
    fontSize: TYPOGRAPHY.h4,
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: COLORS.background,
  },
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tasks"
        options={{
          title: "My Tasks",
        }}
      />
      <Stack.Screen
        name="add-task"
        options={{
          title: "Add Task",
        }}
      />
      <Stack.Screen
        name="edit-task"
        options={{
          title: "Edit Task",
        }}
      />
      <Stack.Screen
        name="task-detail"
        options={{
          title: "Task Details",
        }}
      />
    </Stack>
  );
}
*/
