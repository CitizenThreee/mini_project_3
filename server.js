const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./dbConnect");
const init = require('./init');
const plantRoutes = require('./routes/plantRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json')

app.use(express.json());
app.use('/plants', plantRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});