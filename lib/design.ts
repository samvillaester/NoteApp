// Centralized Design System for NoteApp

export const COLORS = {
  // Primary colors
  primary: "#4f46e5",
  primaryLight: "#6366f1",
  primaryDark: "#4338ca",
  
  // Background colors
  background: "#f8fafc",
  surface: "#ffffff",
  backgroundDark: "#1e293b",
  
  // Text colors
  text: "#1e293b",
  textLight: "#64748b",
  textInverse: "#ffffff",
  
  // Status colors
  statusPending: "#f59e0b",
  statusOngoing: "#3b82f6",
  statusFinished: "#22c55e",
  
  // Semantic colors
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  
  // Border & Divider
  border: "#e2e8f0",
  divider: "#f1f5f9",
};

export const TYPOGRAPHY = {
  // Font sizes
  h1: 34,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  bodySmall: 14,
  caption: 12,
  
  // Font weights
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Helper function to get status color
export function getStatusColor(status: string): string {
  switch (status) {
    case "Pending":
      return COLORS.statusPending;
    case "Ongoing":
      return COLORS.statusOngoing;
    case "Finished":
      return COLORS.statusFinished;
    default:
      return COLORS.textLight;
  }
}
