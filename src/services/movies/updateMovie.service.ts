import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { IMovieReturn, IMovieUpdate } from "../../interfaces/movies.interfaces"
import { returnMovieSchema } from "../../schemas/movies.schemas"

export const updateMovieService = async (newMovieData: IMovieUpdate, idMovie: number): Promise<IMovieReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })
    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    })
    await movieRepository.save(movie)
    const updatedMovie = returnMovieSchema.parse(movie)
    return updatedMovie
}