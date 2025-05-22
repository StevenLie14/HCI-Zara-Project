import { toast } from "sonner"
import React from "react";

export const ToastService = {
  success: (message: string, title?: string) => {
    toast.success(title || "Success", {
      description: message,
    })
  },

  error: (message: string, title?: string) => {
    toast.error(title || "Error", {
      description: message,
    })
  },

  info: (message: string, title?: string) => {
    toast.info(title || "Information", {
      description: message,
    })
  },

  warning: (message: string, title?: string) => {
    toast.warning(title || "Warning", {
      description: message,
    })
  },

  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string
      success: (data: T) => string
      error: (error: Error) => string
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    })
  },

  custom: (
    title: string,
    message: string,
    options?: {
      icon?: React.ReactNode
      duration?: number
      action?: {
        label: string
        onClick: () => void
      }
    }
  ) => {
    toast(title, {
      description: message,
      duration: options?.duration || 4000,
      icon: options?.icon,
      action: options?.action
        ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
        : undefined,
    })
  },
}
