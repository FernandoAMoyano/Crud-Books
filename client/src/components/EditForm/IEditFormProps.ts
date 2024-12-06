import { IBook } from '../../interfaces/IBook'

export interface IEditFormProps {
  initialBookData: IBook
  onSuccessEdit: () => void
}
