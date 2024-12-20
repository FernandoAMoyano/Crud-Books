import { NextFunction, Request, Response } from 'express'
/* import { bookSchema } from '../schema/bookSchema' */
import { ZodSchema } from '../interfaces/Book.interface'
import { ZodRawShape } from 'zod'

export const validatorSchema = <T extends ZodRawShape>(schema: ZodSchema<T>, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property as keyof Request]
      console.log('data recibida:', data)
      const validate = schema.parse(data)
      console.log('validación exitosa' + validate)
      next()
    } catch (error) {
      next(error)
    }
  }
}
