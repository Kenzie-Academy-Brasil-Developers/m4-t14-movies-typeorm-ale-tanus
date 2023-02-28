import { z } from 'zod'

export const movieSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().nullish(),
    duration: z.number().min(1, {message: "Number must be greater than 0"}),
    price: z.number().min(0).int()
})
  
export const movieUpdateSchema = movieSchema.partial()

export const returnMovieSchema = movieSchema.extend({
    id: z.number()
})

export const returnMultipleMoviesSchema = returnMovieSchema.array()

export const returnMovies = z.array(returnMovieSchema)

export const returnAllMovies = z.object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    count: z.number(),
    data: returnMovies
})