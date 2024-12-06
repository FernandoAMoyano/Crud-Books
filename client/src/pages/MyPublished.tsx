//PAGES - MyPublished.tsx

import NavBar from '../components/NavBar/NavBar'
import { useGetMyPublishedBooksQuery } from '../app/api/api'
import { useParams } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../components/Spinner/Spinner'
import Notification from '../components/Notification/Notification'
import ModalEditedBook from '../components/ModalEditBook/ModalEditBook'
import useDeleteBook from '../hooks/useDeleteBook'
import useEditBook from '../hooks/useEditBook'

const MyPublished = () => {
  // -> custom Hook useDeleteBook
  const {
    isLoading: isLoadingBook,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    showDeleteConfirmation,
    showSuccessDelete,
  } = useDeleteBook()

  // -> desestructuración custom Hook useEditBook
  const { bookIdToEdit, isOpenModal, showSuccessEdit, handleEdit, closeModal, handleSuccessEdit } = useEditBook()

  const { userId } = useParams()
  const { data, error, isLoading } = useGetMyPublishedBooksQuery(userId ?? '')

  //DEBUG: ↴
  console.log(data)

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (error) {
    return <div>Error al cargar los detalles</div>
  }

  return (
    <>
      <NavBar />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data?.map((book) => (
          <div
            key={book.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
              <div className="flex items-center justify-evenly">
                <p className="text-lg font-semibold text-black cursor-auto my-3">${formatearNumero(book.price)}</p>

                {/* Icono de eliminacion___________ */}
                <FontAwesomeIcon
                  onClick={() => handleDelete(book.id)}
                  icon={faTrashCan}
                  style={{ cursor: isLoadingBook ? 'not-allowed' : 'pointer' }}
                  opacity={isLoadingBook ? 0.5 : 1}
                />

                {/* Icono de edición________________ */}
                <FontAwesomeIcon
                  onClick={() => handleEdit(book)}
                  icon={faEdit}
                  style={{ cursor: isLoadingBook ? 'not-allowed' : 'pointer' }}
                  opacity={isLoadingBook ? 0.5 : 1}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {showDeleteConfirmation && (
        <Notification
          message="¿Desea eliminar este libro?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          type="confirm"
        />
      )}

      {/* Notificación de éxito en la eliminacón */}
      {showSuccessDelete && (
        <Notification
          message="Libro eliminado satisfactoriamente"
          autoDismiss={true}
          // Oculta la notificación al cerrar
          duration={3000}
          type="warning"
        />
      )}

      {isOpenModal && bookIdToEdit && (
        <ModalEditedBook
          initialBookData={bookIdToEdit}
          closeModal={closeModal}
          isOpen={isOpenModal}
          onSuccessEdit={handleSuccessEdit}
        />
      )}

      {/* Notificacion de exito en la edicion */}
      {showSuccessEdit && (
        <Notification message="Libro editado satisfactoriamente" autoDismiss={true} duration={3000} type="success" />
      )}
    </>
  )
}
export default MyPublished
