import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Check,
} from 'typeorm'

@Entity('movies')
@Check(`"price" > 0`)
export class Movie {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ length: 50, unique: true })
    name: string

    @Column({ type: 'text', nullable: true })
    description?: string | undefined | null

    @Column({ type: 'integer' })
    duration: number

    @Column({ type: 'integer' })
    price: number
}