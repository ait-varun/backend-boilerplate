// Load environment variables from a file
process.loadEnvFile();

import express, { Request, Response, NextFunction } from "express";
import router from "./routes/router";
import errorMiddleware from "./middleware/error.middleware";
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object

// Error middleware
app.use(errorMiddleware);

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", router);

// Global Error Handler. IMPORTANT function params MUST start with err
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.log(err.stack);
//   console.log(err.name);
//   console.log(err.message);

//   res.status(500).json({
//     message: "Something went rely wrong",
//   });
// });

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));