export interface NotificationDto<T> {
  ID: string;
  subject: string;
  content: T;
}
