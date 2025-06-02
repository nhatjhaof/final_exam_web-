import { Request, Response } from "express"
import webRoutes from "routes/web";

const express = require('express')
const app = express()
const port = 8081

//config web static
app.use(express.static('public'));

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config web routes
webRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
