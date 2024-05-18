import express  from 'express';
import http  from 'http';
import bodyParser  from 'body-parser';
import cookieParser  from 'cookie-parser';
import compression  from 'compression';
import cors  from 'cors';
import dotenv  from 'dotenv';

import router  from './router/index.js';
import mongoose  from 'mongoose';

dotenv.config();

const DB = process.env.DATABASE

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on 8080');
});



mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://Yash123:Yash123@cluster0.wxkpxlk.mongodb.net/").then(() => {
  console.log('connected successfully');
}).catch(() => console.log('not connected'));
// mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());