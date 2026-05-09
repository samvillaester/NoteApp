import { deleteTask, getTasks, Task } from "@/lib/database";
import { BORDER_RADIUS, COLORS, getStatusColor, SHADOWS, SPACING, TYPOGRAPHY } from "@/lib/design";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    try {
      const data = getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              deleteTask(id);
              loadTasks();
            } catch (error) {
              Alert.alert("Delete Error", "Failed to delete task");
            }
          },
        },
      ]
    );
  };

  const renderTaskCard = ({ item }: { item: Task }) => {
    const statusColor = getStatusColor(item.status);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.taskDescription} numberOfLines={2}>
          {item.description || "No description"}
        </Text>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.detailButton, pressed && styles.buttonPressed]}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/tasks/task-detail",
                params: {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  status: item.status,
                },
              })
            }
          >
            <Text style={styles.detailButtonText}>View Details</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} total
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        onPress={() => router.push("/(tabs)/tasks/add-task")}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>No Tasks yet.</Text>
          <Text style={styles.emptySubtext}>
            Tap the button above to add your first task
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTaskCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.bodySmall,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.md,
  },
  addButtonPressed: {
    backgroundColor: COLORS.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  addButtonIcon: {
    fontSize: 24,
    color: COLORS.textInverse,
    marginRight: SPACING.sm,
    fontWeight: TYPOGRAPHY.bold,
  },
  addButtonText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.semibold,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  taskTitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.semibold,
  },
  taskDescription: {
    fontSize: TYPOGRAPHY.bodySmall,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  detailButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  detailButtonText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.semibold,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.danger + "15",
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.semibold,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
