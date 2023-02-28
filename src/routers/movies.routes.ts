import { Router } from 'express'
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from '../controllers/movies.controllers'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware'
import { ensureItIsAUniqueMovie } from '../middlewares/ensureItIsAUniqueMovie.middleware'
import { ensureMovieIdExistsMiddleware } from '../middlewares/ensureMovieExists.middleware'
import { movieSchema, movieUpdateSchema } from '../schemas/movies.schemas'

const movieRoutes: Router = Router()

movieRoutes.post('', ensureDataIsValidMiddleware(movieSchema), ensureItIsAUniqueMovie, createMovieController)
movieRoutes.get('', listMoviesController)
movieRoutes.delete('/:id', ensureMovieIdExistsMiddleware, deleteMovieController)
movieRoutes.patch('/:id', ensureDataIsValidMiddleware(movieUpdateSchema), ensureMovieIdExistsMiddleware, ensureItIsAUniqueMovie, updateMovieController)

export default movieRoutes