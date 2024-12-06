// BOOKREPOSITORIE.TS
import { pool } from '../db/connection'
import { BookId, CreateBook, IBookRow } from '../interfaces/Book.interface'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class BookRepository {
  // → Query para obtener un libro por Id

  static async getBookById(bookId: BookId): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      WHERE books.id = ?;
    `
    const [results] = await pool.execute<RowDataPacket[]>(query, [bookId])
    return results as IBookRow[]
  }

  // → Query para obtener los libros publicados por un usuario.

  static async getBooksByUserId(userId: string): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      WHERE books.publisherId = ?;
    `
    const [results] = await pool.execute<RowDataPacket[]>(query, [userId])
    return results as IBookRow[]
  }

  // → Query para obtener todos los libros

  /* static async getAllBooks(limit: number, offset: number): Promise<IBookRow[]> {
    const query = `
      SELECT books.*, 
             users.username AS publisherName 
      FROM books 
      JOIN users ON books.publisherId = users.id 
      LIMIT ${limit} OFFSET ${offset};
    `

    console.log('Limit:', limit, typeof limit)
    console.log('Offset:', offset, typeof offset)

    const [results] = await pool.execute<RowDataPacket[]>(query, [limit, offset])

    console.log('Query Results:', results)

    return results as IBookRow[]
  } */

  static async getAllBooks(limit: number, offset: number): Promise<IBookRow[]> {
    try {
      // Validar y sanitizar los parámetros
      limit = parseInt(limit.toString(), 10)
      offset = parseInt(offset.toString(), 10)

      if (isNaN(limit) || limit <= 0) limit = 10 // Valor por defecto
      if (isNaN(offset) || offset < 0) offset = 0 // Valor por defecto

      const query = `
              SELECT books.*, 
                     users.username AS publisherName 
              FROM books 
              JOIN users ON books.publisherId = users.id 
              LIMIT ${limit} OFFSET ${offset};
          `

      console.log('Query:', query)

      const [results] = await pool.query<RowDataPacket[]>(query)

      console.log('Query Results:', results)

      return results as IBookRow[]
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

  // → Query para obtener el total de libros

  static async countTotalBooks(): Promise<number> {
    const query = `SELECT COUNT(*) as totalBooks FROM books;`
    const [results] = await pool.execute<RowDataPacket[]>(query)
    return (results[0] as RowDataPacket).totalBooks
  }

  // → Query para eliminar un libro

  static async deleteBook(bookId: BookId): Promise<void> {
    const query = 'DELETE FROM books WHERE id = ?;'
    await pool.execute(query, [bookId])
  }

  // → Query para insertar un libro

  static insertBook = async (bookValues: CreateBook): Promise<ResultSetHeader> => {
    const query = `
        INSERT INTO books
            (id, title, author, description, price, image, bookCondition, category, publisherId, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const [insertedBookResult] = await pool.execute(query, bookValues)
    return insertedBookResult as ResultSetHeader
  }

  // → Query para actualizar un libro

  static updateBookById = async (
    columnsToUpdate: string,
    filteredChanges: unknown[],
    bookId: string,
    userId: string,
  ): Promise<ResultSetHeader> => {
    const query = `
        UPDATE books SET ${columnsToUpdate}
        WHERE id = ? AND publisherId = ?;
    `

    const values = [...filteredChanges, bookId, userId]
    const [result] = await pool.execute(query, values)
    return result as ResultSetHeader
  }

  // → Query para encontrar buscar usuario por id

  static findUserById = async (userId: string): Promise<RowDataPacket[]> => {
    const query = `SELECT * FROM users WHERE id = ?;`
    const [dataUserResult] = await pool.execute(query, [userId])
    return dataUserResult as RowDataPacket[]
  }
}
