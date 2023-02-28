import {
    movieSchema,
    returnMovieSchema,
    returnMultipleMoviesSchema,
    returnAllMovies
} from '../schemas/movies.schemas'
import { z } from 'zod'
import { DeepPartial } from 'typeorm'

export type IMovie = z.infer<typeof movieSchema>
export type IMovieReturn = z.infer<typeof returnMovieSchema>
export type IMoviesReturn = z.infer<typeof returnMultipleMoviesSchema>
export type IMovieUpdate = DeepPartial<IMovie>
export type IMoviesReturnAll = z.infer<typeof returnAllMovies>