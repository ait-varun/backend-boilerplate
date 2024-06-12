// Load environment variables from a file
process.loadEnvFile();

import express from "express";
import router from "./routes/router.js";
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object

// Use the middleware logger
// app.use(require('./middleware/logger'));

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", router);

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
