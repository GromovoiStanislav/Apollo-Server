import 'dotenv/config'
import {AppDataSource} from "./config/typeorm.js";
import {startServer} from "./app.js";

const main = async () => {
    await AppDataSource.initialize()
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
            process.exit(1)
        })
    console.log("TypeORM has been initialized!")

    const app = await startServer();
    const port = process.env.PORT;
    await app.listen(port)
    console.log(`Express ready at http://localhost:${port}`);
    console.log(`Graphql ready at http://localhost:${port}/graphql`);
}

main();


// AppDataSource
//     .initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//         return startServer();
//     })
//     .then(app => {
//         const port = process.env.PORT || 3000;
//         app.listen(port)
//         return port
//     })
//     .then(port => {
//         console.log(`Express ready at http://localhost:${port}`);
//         console.log(`Graphql ready at http://localhost:${port}/graphql`);
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })