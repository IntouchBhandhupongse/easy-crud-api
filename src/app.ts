import express, { Request, Response } from 'express'
require('dotenv').config();
import taskRoutes from './routes/task';

const app = express()

app.use(express.json());
app.use('/task', taskRoutes);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

app.listen(port, () => console.log(`Application is running on port ${port}`))