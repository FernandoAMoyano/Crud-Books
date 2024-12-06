import { useState } from 'react'
import { useDeleteBookMutation } from '../app/api/api'
import { useDispatch } from 'react-redux'
import { deletePublishedBook } from '../features/books/booksSlie'

const useDeleteBook = () => {
  //estados para los pop up de confirmacion de eliminacion / eliminacion satisfactoria
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bookIdToDelete, setBookIdToDelete] = useState('')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [showSuccessDelete, setShowSuccessDelete] = useState<boolean>(false)

  // -> Hook provisto por Redux
  const [deleteBook] = useDeleteBookMutation()
  const dispatch = useDispatch()

  // -> Funcion que maneja la confirmacion de eliminación
  const handleDelete = (bookId: string): void => {
    setBookIdToDelete(bookId)
    setShowDeleteConfirmation(true)
  }

  // -> Funcion que maneja la eliminación satisfactoria
  const handleConfirmDelete = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await deleteBook(bookIdToDelete).unwrap()
      dispatch(deletePublishedBook(bookIdToDelete))
      setShowDeleteConfirmation(false)
      setShowSuccessDelete(true)
      setTimeout(() => setShowSuccessDelete(false), 3000)
    } catch (error) {
      alert('Error al eliminar el libro')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  return {
    isLoading,
    showDeleteConfirmation,
    showSuccessDelete,
    handleDelete,
    handleCancelDelete,
    handleConfirmDelete,
  }
}

export default useDeleteBook
