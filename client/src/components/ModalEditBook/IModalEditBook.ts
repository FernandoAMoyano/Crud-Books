import { IBook } from '../../interfaces/IBook'

export interface IModalEditBook {
  initialBookData: IBook
  closeModal: () => void
  isOpen: boolean
  onSuccessEdit: () => void
}
