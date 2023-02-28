import { Request, Response } from 'express'
import { IMovie, IMovieUpdate, IMoviesReturnAll } from '../interfaces/movies.interfaces'
import { createMovieService } from '../services/movies/createUser.service'
import { listMoviesService } from '../services/movies/listMovies.service'
import { deleteMovieService } from '../services/movies/deleteMovie.service'
import { updateMovieService } from '../services/movies/updateMovie.service'

export const createMovieController = async (req: Request, res: Response) => {

    const movieData: IMovie = req.body
    const newMovie = await createMovieService(movieData)
    return res.status(201).json(newMovie)
}

export const listMoviesController = async (req: Request, res: Response) => {

    const {page, perPage, sort } = req.query
    const order = (req.query.order)?.toString().toUpperCase()
    const allMovies: IMoviesReturnAll = await listMoviesService(page, perPage, order, sort)
    return res.status(200).json(allMovies)
}

export const deleteMovieController = async (req: Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id))
    return res.status(204).send()
}

export const updateMovieController = async (req: Request, res: Response) => {

    const movieData: IMovieUpdate = req.body
    const idMovie = parseInt(req.params.id)
    const updatedMovie = await updateMovieService(movieData, idMovie)
    return res.json(updatedMovie)
}