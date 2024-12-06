//COMPONENTS_MODALEDITEDBOOK

import EditForm from '../EditForm/EditForm'
import React from 'react'
import { IModalEditBook } from './IModalEditBook'

const ModalEditedBook: React.FC<IModalEditBook> = ({ initialBookData, closeModal, isOpen, onSuccessEdit }) => {
  // -> Función para cerrar el modal
  const handleCloseModal = () => {
    closeModal()
  }

  // -> Manejo de la edición exitosa
  const handleSuccesEdit = () => {
    if (onSuccessEdit) {
      onSuccessEdit()
    }
    handleCloseModal()
  }

  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black bg-opacity-55">
            <div className="relative w-auto max-w-lg mx-auto my-6">
              <div className="bg-white rounded-lg shadow-lg outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-semibold">Editar Libro</h3>
                  <button onClick={handleCloseModal}>X</button>
                </div>
                <div className="p-5" style={{ backgroundColor: 'white' }}>
                  <EditForm initialBookData={initialBookData} onSuccessEdit={handleSuccesEdit} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ModalEditedBook
