//BOOKCONTROLLER.ts
import { Request, Response } from 'express'
import { BookId, CreateBook } from '../interfaces/Book.interface'
import { BookService } from '../services/book.service'

//Instancia del servicio
const bookService = new BookService()

export class BookController {
  // → GET - Obtener un libro

  async getBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      const book = await bookService.getOne(id)
      if (!book) {
        res.status(404).json('Libro no encontrado')
        return
      }
      res.status(200).json(book)
    } catch (error) {
      console.error(error)
    }
  }

  // → GET - Obtener todos los libros publicados por un usuario

  async getBooksByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId
      const books = await bookService.getAllByUserId(userId)
      if (!books) {
        res.status(404).json({ message: 'No se encontraron Libros para este usuario' })
      } else {
        res.status(200).json({ message: 'Libros encontrados', data: books })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // → GET - Obtener todos los libros

  async getBooks(req: Request, res: Response) {
    try {
      const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1) // Página actual, mínimo 1
      const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1) // Límite de elementos por página, mínimo 1
      const offset = (page - 1) * limit // Calcular el desplazamiento

      // Depuración: Verificar los valores antes de la consulta
      console.log(`Page: ${page}, Limit: ${limit}, Offset: ${offset}`)

      const booksData = await bookService.getAll(limit, offset)

      if (!booksData || !booksData.foundBooks) {
        return res.status(404).json('No se encontraron libros')
      }

      return res.status(200).json({
        books: booksData.books,
        totalBooks: booksData.totalBooks,
      })
    } catch (error) {
      console.error('Error en getBooks:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // → PATCH - Actualizar los datos de un libro

  async updateBook(req: Request, res: Response) {
    try {
      const { userId, bookId } = req.params
      const changes = req.body

      //DEBUG:
      console.log('Parámetros recibidos en req.params:', req.params)
      console.log('Datos recibidos en req.body:', req.body)

      const result = await bookService.update(userId, bookId, changes)

      res.status(200).json({
        message: 'Libro actualizado exitosamente',
        data: result,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error el actualizar el libro',
      })
    }
  }

  // → POST - Crear un nuevo libro

  async creteBook(req: Request, res: Response) {
    try {
      const bookData: CreateBook = req.body
      //DEBUG:
      console.log('Datos del libro recibidos:', bookData)
      const newBook = await bookService.create(bookData)
      res.status(201).json({ message: 'Libro Creado con Éxito', result: newBook })
    } catch (error) {
      //DEBUG:
      console.error(error)
    }
  }

  // → DELETE - Eliminar un libro

  async deleteBook(req: Request, res: Response) {
    try {
      const id: BookId = req.params.id
      //DEBUG:
      console.log('El id recibido es :' + id)
      const deleteBook = await bookService.delete(id)
      res.status(200).json({ message: 'Libro eliminado con éxito' })
      return deleteBook
    } catch (error) {
      console.error(error)
    }
  }
}
