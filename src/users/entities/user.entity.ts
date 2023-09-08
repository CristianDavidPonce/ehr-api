import { Entity, Column, ManyToOne } from 'typeorm'
import { Record } from 'src/common/record.common'

@Entity()
export class User extends Record {
  @Column({ unique: true })
  userName: string

  @Column()
  password: string

  @Column({ type: 'varchar', length: 230 })
  firstName: string

  @Column()
  lastName: string

  @Column({ default: true })
  isActive: boolean

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string
}
