import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { IMoviesReturnAll } from "../../interfaces/movies.interfaces"
import { returnAllMovies } from "../../schemas/movies.schemas"

export const listMoviesService = async (page:any, perPage:any, order:any, sort:any): Promise<IMoviesReturnAll> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    
    if(!sort) order = 'ASC'
    page = parseInt(page) > 0 ? parseInt(page) : 1
    perPage = parseInt(perPage) > 0 && parseInt(perPage) <= 5 ? parseInt(perPage) : 5
    order = ['ASC', 'DESC'].includes(order) ? order : 'ASC'
    sort = ['price', 'duration', 'id'].includes(sort) ? sort : 'id'
    
    const findMovies = await movieRepository.find({
        skip: perPage*(page - 1),
        take: perPage,
        order:{ [sort]: order },
    })

    const registeredMoviesCounter = await movieRepository.count()
    const baseUrl: string = `http://localhost:3000/movies`

    const allMoviesReturned: IMoviesReturnAll = {
        prevPage: page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null,
        nextPage:
            registeredMoviesCounter > perPage * page
            ? `${baseUrl}?page=${page + 1}&perPage=${perPage}` : null,
        count: registeredMoviesCounter,
        data: findMovies,
        
    }
    return returnAllMovies.parse(allMoviesReturned)
}