const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

import apiRouter from './Routes/apiRouter'

app.use(express.static('client'));
app.use('./api', apiRouter);
app.use(express.json());
app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));