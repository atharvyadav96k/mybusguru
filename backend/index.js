const express = require('express');
const app = express();
const api = require('./routes/api');

app.use(express.json());

function middleware(req, res, next) {
    console.log(`${req.method} request for '${req.url}' data: ${JSON.stringify(req.body)}`);
    next();
}
app.use('/api', middleware,api);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
