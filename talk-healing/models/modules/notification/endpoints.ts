import {
    API_ENDPOINT,
    REQUEST_METHOD,
} from "../../api/endpoint.types"

// endpoints.ts
import { 
  Notification, 
  NotificationResponse, 
  GetNotificationsRequest,
  MarkAsReadRequest,
  DeleteNotificationRequest 
} from './schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class NotificationAPI {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getNotifications({ params, signal }: GetNotificationsRequest = {}): Promise<NotificationResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    const url = `/notifications${queryString ? `?${queryString}` : ''}`;

    return this.request<NotificationResponse>(url, { signal });
  }

  async markAsRead({ notificationId }: MarkAsReadRequest): Promise<Notification> {
    return this.request<Notification>(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  }

  async deleteNotification({ notificationId }: DeleteNotificationRequest): Promise<void> {
    return this.request<void>(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  async markAllAsRead(): Promise<void> {
    return this.request<void>('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }
}

export const notificationAPI = new NotificationAPI();
