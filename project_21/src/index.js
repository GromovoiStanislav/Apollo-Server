import "dotenv/config";
import {app} from "./app.js";
import {apolloServer} from "./apollo.js";
import {connectDB} from "./db.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import {expressMiddleware} from "@apollo/server/express4";


const main = async () => {
    // connecting to Mongodb
    await connectDB();

    // add the upload middleware
    app.use(graphqlUploadExpress());

    // Starting the apollo Server
    await apolloServer.start();

    // Apollo server setup
    app.use("/graphql", expressMiddleware(apolloServer));


    // Start http server
    const PORT = process.env.PORT || 3000
    await app.listen(PORT)
    console.log(`Express ready at http://localhost:${PORT}`);
    console.log(`Graphql ready at http://localhost:${PORT}/graphql`);
}

main();
