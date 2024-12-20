//COMPONENTS_EDITFORM.TSX

import React, { useRef, useState } from 'react'
import { BookCategory, BookStatus, IBook, BookCondition } from '../../interfaces/IBook'
import { useUpdateBookMutation } from '../../app/api/api'
import Spinner from '../Spinner/Spinner'
import TextInput from '../TextInput/TextInput'
import SelectInput from '../SelectInput/SelectInput'
import { IEditFormProps } from './IEditFormProps'

const EditForm: React.FC<IEditFormProps> = ({ initialBookData, onSuccessEdit }) => {
  const priceValueRef = useRef<HTMLInputElement>(null)

  // -> Estados
  const [editedBook, setEditedBook] = useState<IBook>(initialBookData)
  const [updateBook, { isLoading }] = useUpdateBookMutation()
  //DEBUG:
  console.log('data inicial del libro', initialBookData)

  // -> Manejo de los inputs input/select
  const handleChange = (name: string, value: string) => {
    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // -> Manejo del input de precio
  const handlePriceChange = () => {
    if (priceValueRef.current) {
      const priceValue = parseFloat(priceValueRef.current.value)

      setEditedBook((prevState) => ({
        ...prevState,
        price: priceValue,
      }))
      console.log(priceValue)
    }
  }

  // -> Manejo de la publicación del libro Editado
  const handlePostEditedBook = async () => {
    try {
      console.log(initialBookData)

      const editBookToSend = {
        ...editedBook,
        publisherId: initialBookData.publisherId,
      }

      await updateBook({ editedBook: editBookToSend, bookId: initialBookData.id, userId: initialBookData.publisherId })
      onSuccessEdit()
    } catch (error) {
      //mostrar notificación de error
      console.error('Error al actualizar el libro:', error)
    }
  }

  return (
    <form className="mt-10 space-y-4">
      {/* Titulo__________________________________________ */}
      <div>
        <label htmlFor="title">Titulo</label>
        <TextInput
          name="title"
          type="text"
          placeholder="Titulo"
          value={editedBook.title}
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={(value) => handleChange('title', value)}
        />
      </div>

      {/* description__________________________________________ */}

      <div>
        <label htmlFor="description">description</label>
        <TextInput
          name="description"
          type="text"
          required
          value={editedBook.description}
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          placeholder="Descripcion"
          onChange={(value) => handleChange('description', value)}
        />
      </div>

      {/* Autor______________________________________________ */}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="author">Author</label>
        <TextInput
          name="author"
          type="text"
          required
          value={editedBook.author}
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          placeholder="Autor"
          onChange={(value) => handleChange('author', value)}
        />
      </div>

      {/* Precio_______________________________________________*/}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="price">Precio</label>
        <TextInput
          name="price"
          type="number"
          placeholder="Precio"
          value={editedBook.price}
          ref={priceValueRef}
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={handlePriceChange}
        />
      </div>

      {/* -Imagen ____________________________________ */}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="frontCover">Url Imagen</label>
        <TextInput
          name="frontCover"
          type="text"
          value={editedBook.image}
          placeholder="url imagen de tapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={(value) => handleChange('frontCover', value)}
        />
      </div>

      {/* condition______________________________________ */}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="bookCondition">Condición del libro</label>
        <SelectInput
          name="consition"
          value={editedBook.bookCondition}
          options={Object.values(BookCondition)}
          onChange={(value) => handleChange('condition', value)}
        />
      </div>

      {/* Categoria_________________________________________ */}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="category">Categoria:</label>
        <SelectInput
          name="category"
          value={editedBook.category}
          options={Object.values(BookCategory)}
          onChange={(value) => handleChange('category', value)}
        />
      </div>

      {/* Status_______________________________________________ */}

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="">Estado</label>
        <SelectInput
          name="status"
          value={editedBook.status}
          options={Object.values(BookStatus)}
          onChange={(value) => handleChange('status', value)}
        />
      </div>

      {/* botón de envio__________________________________ */}

      <div className="!mt-10">
        <button
          type="button"
          className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
          onClick={handlePostEditedBook}
        >
          {isLoading ? <Spinner /> : 'Publicar'}
        </button>
      </div>
    </form>
  )
}

export default EditForm
