import { DataSource} from 'typeorm'
import path from 'node:path'
// import { fileURLToPath } from 'node:url'
//
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "mydb",
    synchronize: true,
    logging: false,
    entities: [ path.join(__dirname, '../entity/**/**.ts')]
})