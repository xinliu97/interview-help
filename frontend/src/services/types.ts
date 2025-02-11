// Response wrapper type from backend
export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
  error?: string;
}
