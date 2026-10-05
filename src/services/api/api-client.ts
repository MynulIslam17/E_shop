import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ApiError } from "./api-error";
import { env } from "@/config/env";

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const base = env.API_URL || "/api";
    this.client = axios.create({
      baseURL: base.endsWith("/") ? base : `${base}/`,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private normalizeUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return url.replace(/^\//, "");
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {
        // In client-side or future auth, attach tokens here if available
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
        if (!error.response) {
          // Network failure or timeout
          if (error.code === "ECONNABORTED") {
            return Promise.reject(
              new ApiError("Request timed out. Please check your internet connection.", 408, undefined, true)
            );
          }
          return Promise.reject(
            new ApiError("Network error. Please check your connection.", 0, undefined, true)
          );
        }

        const statusCode = error.response.status;
        const data = error.response.data;
        const message = data?.message || error.message || "An unexpected error occurred.";
        const errors = data?.errors;

        return Promise.reject(new ApiError(message, statusCode, errors));
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(this.normalizeUrl(url), config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(this.normalizeUrl(url), data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(this.normalizeUrl(url), data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(this.normalizeUrl(url), config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
