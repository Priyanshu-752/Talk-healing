import { Instance, types } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"
// schemas.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  userId: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
  totalCount: number;
  hasMore: boolean;
}

export interface NotificationFilters {
  page?: number;
  limit?: number;
  type?: string;
  read?: boolean;
}

// API Request/Response types
export type GetNotificationsRequest = {
  params?: NotificationFilters;
  signal?: AbortSignal;
};

export type MarkAsReadRequest = {
  notificationId: string;
};

export type DeleteNotificationRequest = {
  notificationId: string;
};
