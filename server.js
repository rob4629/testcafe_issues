var express = require('express');
var app = express();

app.use(express.static(__dirname));
const server = app.listen(4000, () => {
    console.log(`Server is listening on port ${server.address().port}`)
});