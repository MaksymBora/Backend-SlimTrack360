import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRoutes.js';
import recommendedFoodRouter from './routes/recommendedFood.js';
import foodIntakeRouter from './routes/foodIntakeRouter.js';
import waterIntakeRouter from './routes/waterIntakeRouter.js';
import errorNotFound from './helpers/Error/errorNotFound.js';
import globalError from './helpers/Error/globalError.js';
import userStatistics from './routes/userStatisticRouter.js';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';

const rawdata = readFileSync('./swagger.json');
const swaggerDocument = JSON.parse(rawdata);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use('/api', recommendedFoodRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/user', foodIntakeRouter);
app.use('/api/user', waterIntakeRouter);
app.use('/api/user', userStatistics);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorNotFound);

app.use(globalError);

export default app;
