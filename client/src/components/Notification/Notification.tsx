import React, { useEffect } from 'react'
import { INotificationProps } from './INotificationProps'

const Notification: React.FC<INotificationProps> = ({
  message,
  onConfirm,
  onCancel,
  type = 'info', // Valor por defecto
  autoDismiss = false,
  duration = 2000,
}) => {
  // Estilos basados en el tipo de notificación
  const backgroundColors = {
    success: 'bg-green-500',
    warning: 'bg-red-500',
    info: 'bg-blue-500',
    confirm: 'bg-gray-900',
  }

  const backgroundColor = backgroundColors[type] || 'bg-gray-500'

  useEffect(() => {
    if (autoDismiss && type !== 'confirm') {
      const timer = setTimeout(() => {
        onCancel && onCancel()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, duration, onCancel, type])

  // Notificación de tipo "success" posicionada en el margen superior derecho
  if (type === 'success' || type === 'info' || type === 'warning') {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className={`w-96 ${backgroundColor} shadow-md rounded-xl duration-500`}>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-bold text-white">{message}</p>
          </div>
        </div>
      </div>
    )
  }

  // Notificación de tipo "confirm" con botones, centrada en la pantalla
  if (type === 'confirm') {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className={`w-96 bg-white shadow-md rounded-xl duration-500 ${backgroundColor}`}>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-bold text-black">{message}</p>
            <div className="flex items-center justify-evenly mt-4">
              <button
                onClick={onConfirm}
                className={`${backgroundColor} text-center py-2 px-6 rounded-md text-white hover:opacity-90 focus:outline-none`}
              >
                Confirmar
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-500 text-center py-2 px-6 rounded-md text-white hover:bg-gray-600 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notification
