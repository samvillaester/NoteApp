import { updateTask } from "@/lib/database";
import { useState } from "react";

import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY, getStatusColor } from "@/lib/design";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }

      updateTask(Number(params.id), title, description, status);
      Alert.alert("Success", `Task updated successfully.`);
      router.replace("//tasks");
    } catch (error) {
      Alert.alert(
        "Update Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Edit Task</Text>
          <Text style={styles.subtitle}>Update the task details below</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              placeholderTextColor={COLORS.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter task description (optional)"
              placeholderTextColor={COLORS.textLight}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((option) => {
                const statusColor = getStatusColor(option);
                const isActive = status === option;
                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.statusButton,
                      isActive && { 
                        backgroundColor: statusColor,
                        borderColor: statusColor,
                      },
                    ]}
                    onPress={() => setStatus(option)}
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        isActive && styles.statusButtonTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable 
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>Update Task</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textLight,
    marginBottom: SPACING.xxl,
  },
  formGroup: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  statusButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textLight,
  },
  statusButtonTextActive: {
    color: COLORS.textInverse,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.xl,
    ...SHADOWS.md,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.semibold,
  },
});
