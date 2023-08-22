export const config = () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../typeorm-migrations/*.{ts,js}'],
    synchronize: true,
    autoLoadEntities: true,
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
})
