import "dotenv/config";
import express from 'express';
import {ApolloServer} from "@apollo/server";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import {expressMiddleware} from "@apollo/server/express4";
import schema from "./schema/index.mjs";


// Ensure the upload directory exists.
import {fileURLToPath} from "node:url";
import makeDir from "make-dir";
import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";

await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));


// Express server setup
const app = express();
app.use(express.json());
// add the upload middleware
app.use(graphqlUploadExpress());
app.get("/", (req, res) => res.send("Go to /graphql"));


// Apollo server setup
export const apolloServer = new ApolloServer({schema});
await apolloServer.start();
app.use("/graphql", expressMiddleware(apolloServer));


// Start Express server
const PORT = process.env.PORT || 8000
await app.listen(PORT)
console.log(`Express ready at http://localhost:${PORT}`);
console.log(`Graphql ready at http://localhost:${PORT}/graphql`);