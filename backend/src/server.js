// start server
// load environment variables from .env
require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./app');



const connectDB = require('./db/db');
connectDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`);
});