import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import apiRouter from './routes/apiRouter.js';

app.use(express.static('client'));

app.use('/api', apiRouter);
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));