export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.ts'],
  synchronize: true,
  logging: true,
};
