// Load environment variables from a file
process.loadEnvFile();

import express from "express";
import router from "./routes/router";
import errorMiddleware from "./middleware/error.middleware";
import cors from "cors";
const app = express();

app.use(cors());

// Middleware
app.use(express.json()); // parse json bodies in the request object


// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", router);

// Error middleware
app.use(errorMiddleware);

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
