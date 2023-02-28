import { Router } from 'express'
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from '../controllers/movies.controllers'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid'
import { ensureMovieExistsMiddleware } from '../middlewares/ensureMovieExists.middleware'
import { movieSchema, movieUpdateSchema } from '../schemas/movies.schemas'

const movieRoutes: Router = Router()

movieRoutes.post('', ensureDataIsValidMiddleware(movieSchema), createMovieController)
movieRoutes.get('', listMoviesController)
movieRoutes.delete('/:id', ensureMovieExistsMiddleware, deleteMovieController)
movieRoutes.patch('/:id', ensureDataIsValidMiddleware(movieUpdateSchema), ensureMovieExistsMiddleware, updateMovieController)

export default movieRoutes