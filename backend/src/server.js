// start server
// load environment variables from src/.env (file lives in src/)
require('dotenv').config({ path: __dirname + '/src/.env' });
const app = require('./src/app');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`);
});