import express from 'express';
import apiRouter from './routes/apiRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static('client'));


app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));