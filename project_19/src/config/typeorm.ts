import {DataSource} from 'typeorm'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
// import {Product} from "../entity/Product.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    //entities: [Product],
    entities: [path.join(__dirname, '../entity/**/**{.ts,.js}')],
})
