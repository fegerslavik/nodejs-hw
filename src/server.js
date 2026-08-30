import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { celebrate, isCelebrateError } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.use(notesRoutes);

app.use((err, _req, res, _next) => {
  if (isCelebrateError(err)) {
    const errorDetails = {};

    for (const [segment, joiError] of err.details.entries()) {
      errorDetails[segment] = joiError.details.map((detail) => detail.message);
    }

    return res.status(400).json({
      message: 'Validation error',
      details: errorDetails,
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
