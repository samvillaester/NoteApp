import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4F46E5",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "#F5F7FA",
        },
      }}
    >
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