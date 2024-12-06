import { useState } from 'react'
import { IBook } from '../interfaces/IBook'

const useEditBook = () => {
  const [bookIdToEdit, setBookIdToEdit] = useState<IBook | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [showSuccessEdit, setShowSuccesEdit] = useState<boolean>(false)

  const handleEdit = (book: IBook): void => {
    setBookIdToEdit(book)
    setIsOpenModal(true)
  }

  const closeModal = (): void => {
    setIsOpenModal(false)
  }

  const handleSuccessEdit = () => {
    setShowSuccesEdit(true)
    setTimeout(() => setShowSuccesEdit(false), 3000)
  }

  return {
    bookIdToEdit,
    isOpenModal,
    showSuccessEdit,
    handleEdit,
    closeModal,
    handleSuccessEdit,
  }
}

export default useEditBook
