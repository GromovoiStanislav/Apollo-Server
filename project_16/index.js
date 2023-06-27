import {connectDB} from "./src/db.js";
import {startApolloServer} from "./src/app.js";

// Connect to database
connectDB();

// Start Apollo Server
startApolloServer();
