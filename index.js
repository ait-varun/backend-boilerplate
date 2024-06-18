// Load environment variables from a file
process.loadEnvFile();

import express from "express";
import router from "./src/routes/router.js";
import logger from "./src/middleware/logger.js";
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(express.urlencoded()); // parse urlencoded bodies in the request Object
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.


// Use the middleware logger
// app.use(require('./middleware/logger'));

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", logger, router);

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
