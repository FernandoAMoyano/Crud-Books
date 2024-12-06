import { useRef, useState } from 'react'
import { NewBook } from '../interfaces/IBook'
import { Errors } from '../interfaces/IErrors'

const useFormValidate = (initialState: NewBook, validate: (values: NewBook) => Errors) => {
  const [formData, setFormData] = useState<NewBook>(initialState)
  const [errors, setErrors] = useState<Errors>({})

  // Crear una referencia para el campo de precio
  const priceValueRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = parseFloat(e.target.value) // Obtiene el valor directamente del evento
    setFormData((prevData) => ({
      ...prevData,
      price: priceValue, // Actualiza el precio en formData
    }))
  }

  const handleSubmit = (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      callback() // Si no hay errores, se ejecuta el callback
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handlePriceChange,
    priceValueRef,
  }
}

export default useFormValidate
