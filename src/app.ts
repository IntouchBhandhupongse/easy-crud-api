import express, { Request, Response } from 'express'
require('dotenv').config();
import usersRoutes from './routes/users';
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })  
})

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

app.listen(port, () => console.log(`Application is running on port ${port}`))