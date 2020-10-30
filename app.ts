import express from 'express';
// import expressOasGenerator  from 'express-oas-generator';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connect } from 'mongoose';
require('dotenv').config();

import todosRouter from './server/todos/routes';

import { NOT_FOUND } from './server/utility/httpStatusCodes';
import { errorHandler } from './server/utility/errorLogger';

const app = express();
// expressOasGenerator.init(app, spec => spec, 'api-spec.json', 60000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') app.use(helmet());

app.use('/api/todos', todosRouter);

app.get('*', (_, res) => { res.sendFile('./build/index.html', { root: __dirname }) });

app.use((_, res) => res.sendStatus(NOT_FOUND));
app.use(errorHandler);

connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB Connected'));

export default app;
