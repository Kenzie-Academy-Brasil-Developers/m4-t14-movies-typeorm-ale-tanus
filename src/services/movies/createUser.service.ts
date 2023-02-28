import { IMovie, IMovieReturn } from '../../interfaces/movies.interfaces'
import { AppDataSource } from '../../data-source'
import { Movie } from '../../entities'
import { Repository } from 'typeorm'
import { returnMovieSchema } from '../../schemas/movies.schemas'

export const createMovieService = async (userData: IMovie): Promise<IMovieReturn> => {

    const userRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const user: Movie = userRepository.create(userData)
    await userRepository.save(user)
    const newUser = returnMovieSchema.parse(user)
    return newUser
}