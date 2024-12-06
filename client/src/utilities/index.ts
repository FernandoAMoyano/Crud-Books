// → Funcion para formatear el precio

import { NewBook } from '../interfaces/IBook'
import { Errors } from '../interfaces/IErrors'

export function formatearNumero(numero: number) {
  // Convertir el número a una cadena y dividirlo en partes entera y decimal
  const partes = String(numero).split('.')
  // Obtener la parte entera del número
  let parteEntera = partes[0]
  // Formatear la parte entera agregando separadores de miles
  parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  // Obtener la parte decimal del número (si existe)
  const parteDecimal = partes.length > 1 ? ',' + partes[1] : ',00'
  // Combinar la parte entera y la parte decimal
  const numeroFormateado = parteEntera + parteDecimal

  return numeroFormateado
}

// → funcion para validar los inputs del formulario

export const validateErrors = (values: NewBook): Errors => {
  const errors: Errors = {}

  if (!values.title) {
    errors.title = 'Por favor ingrese el título del libro'
  } else if (!/^(?=.*[a-zA-Z0-9])[\w\s.,;:!?'"()-]{3,100}$/.test(values.title)) {
    errors.title = 'El título debe tener entre 3 y 100 caracteres y no contener solo espacios o caracteres especiales.'
  }

  if (!values.description) {
    errors.description = 'Por favor ingrese la descripción del libro'
  } else if (!/^(?=.*[a-zA-Z0-9])[\w\s.,;:!?()-]{10,1000}$/.test(values.description)) {
    errors.description =
      'La descripción debe tener entre 10 y 1000 caracteres y no contener solo espacios o caracteres especiales.'
  }

  if (!values.author) {
    errors.author = 'Por favor ingrese el nombre del autor'
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'´-]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ'´-]+)*$/.test(values.author)) {
    errors.author = 'El nombre del autor solo puede contener letras, espacios, apóstrofes y guiones, y debe ser válido.'
  }

  if (!values.price) {
    errors.price = 'Por favor ingrese el precio del libro'
  } else if (values.price <= 0 || !/^\d+(\.\d{1,2})?$/.test(String(values.price))) {
    errors.price = 'Por favor ingrese un precio válido. Ejemplos: 10, 10.99, 1000, 1000.50'
  }

  if (!values.image) {
    errors.image = 'Por favor ingresa una URL de imagen para el libro'
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(values.image)) {
    errors.image =
      'La URL de la imagen debe ser una dirección válida y debe tener una de las siguientes extensiones: jpg, jpeg, png, gif, bmp, webp.'
  }

  return errors
}
