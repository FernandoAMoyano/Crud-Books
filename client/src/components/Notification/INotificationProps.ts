export interface INotificationProps {
  message: string
  onConfirm?: () => void
  onCancel?: () => void
  type?: 'confirm' | 'success' | 'warning' | 'info'
  autoDismiss?: boolean
  duration?: number
}
