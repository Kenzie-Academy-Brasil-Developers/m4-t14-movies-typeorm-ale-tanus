import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { IMoviesReturn } from "../../interfaces/movies.interfaces"
import { returnMultipleMoviesSchema } from "../../schemas/movies.schemas"

export const listMoviesService = async (): Promise<IMoviesReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const findMovies: Array<Movie> = await movieRepository.find()
    const movies = returnMultipleMoviesSchema.parse(findMovies)
    return movies
}