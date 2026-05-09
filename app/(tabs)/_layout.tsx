import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#9CA3AF",

        headerStyle: {
          backgroundColor: "#4F46E5",
        },

        headerTintColor: "#FFFFFF",

        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
        },

        headerShadowVisible: false,

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: -3,
          },
        },

        sceneStyle: {
          backgroundColor: "#F5F7FA",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}