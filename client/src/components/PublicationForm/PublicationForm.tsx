// PUBLICATIONFORM.tsx

import { BookCategory, BookCondition, BookStatus, NewBook } from '../../interfaces/IBook'
import { usePostNewBookMutation } from '../../app/api/api'
import Spinner from '../Spinner/Spinner'
import useFormValidate from '../../hooks/useFormValidate'
import { validateErrors } from '../../utilities'

const userDataString = localStorage.getItem('userLoggedIn')
let userId = null

if (userDataString) {
  try {
    const userData = JSON.parse(userDataString)
    if (userData && typeof userData === 'object' && 'userId' in userData) {
      userId = userData.userId
    }
  } catch (error) {
    console.error('Error al parsear userData:', error)
  }
}

const initialState = {
  dataNewBook: {
    title: '',
    description: '',
    author: '',
    price: 0,
    image: '',
    bookCondition: BookCondition.NEW,
    category: BookCategory.OTHER,
    status: BookStatus.AVAILABLE,
    publisherId: userId,
  } as NewBook,
  showNotification: false,
  showSuccessNotification: false,
  isConfirming: false,
}

const PublicationForm: React.FC = () => {
  //const priceValueRef = useRef<HTMLInputElement>(null)
  const [postNewBook, { isLoading }] = usePostNewBookMutation()

  // Integración del custom hook useFormValidate
  const { formData, errors, handleChange, handleSubmit, handlePriceChange, priceValueRef } = useFormValidate(
    initialState.dataNewBook,
    validateErrors, // Aquí usamos la función validate que toma un argumento
  )

  // -> Publicación del libro
  const handleConfirmPublish = async () => {
    try {
      const result = await postNewBook(formData)
      if ('data' in result) {
        console.log('Libro publicado exitosamente')
        // Mostrar notificación de éxito o redirigir
      } else if ('error' in result) {
        console.error('Error al publicar el libro:', result.error)
        // Mostrar notificación de error
      }
    } catch (error) {
      console.error('Error al publicar el libro:', error)
      // Mostrar notificación de error
    }
  }

  return (
    <>
      <form className="mt-10 space-y-4" onSubmit={handleSubmit(handleConfirmPublish)}>
        {/* Título del libro */}
        <div>
          <input
            name="title"
            type="text"
            autoComplete="title"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Descripción */}
        <div>
          <textarea
            name="description"
            autoComplete="description"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Autor */}
        <div>
          <input
            name="author"
            type="text"
            autoComplete="author"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Autor"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        {/* Precio */}
        <div>
          <input
            ref={priceValueRef}
            name="price"
            type="number"
            autoComplete="price"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Precio"
            onChange={handlePriceChange}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* -Imagen */}
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="image">Imagen de Tapa</label>
          <input
            name="image"
            type="text"
            placeholder="url imagen de tapa"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            onChange={handleChange}
          />
        </div>

        {/* Condición del libro */}
        <div>
          <select
            name="bookCondition"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            value={formData.bookCondition}
            onChange={handleChange}
          >
            <option value="">Seleccionar condición</option>
            {Object.values(BookCondition).map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
          {errors.bookCondition && <p className="text-red-500 text-sm">{errors.bookCondition}</p>}
        </div>

        {/* Categoría */}
        <div>
          <select
            name="category"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleccionar categoría</option>
            {Object.values(BookCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Estado */}
        <div>
          <select
            name="status"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Seleccionar estado</option>
            {Object.values(BookStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        {/* Botón de publicación */}
        <div className="!mt-10">
          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
          >
            {isLoading ? <Spinner /> : 'Publicar'}
          </button>
        </div>
      </form>
    </>
  )
}

export default PublicationForm
