import { initDatabase } from "@/lib/database";
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from "@/lib/design";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📝</Text>
        </View>
        <Text style={styles.title}>Mini Task App</Text>
        <Text style={styles.subtitle}>Welcome! Manage your tasks efficeitly</Text>
    

        <Pressable 
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
          onPress={() => router.push("/tasks")}
        >
          <Text style={styles.buttonText}>Open Tasks</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xxl,
    ...SHADOWS.lg,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: TYPOGRAPHY.h1,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.primary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxxl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.md,
    minWidth: 200,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.semibold,
    textAlign: "center",
  },
});
