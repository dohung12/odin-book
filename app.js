require('dotenv').config();
const express = require('express');
require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

// passport auth
const passport = require('passport');
require('./config/passport')(passport);

// connect to database
require('./config/database');

// connect to media server
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middleware
const verifyUser = require('./middleware/verifyUser');

// router
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const uploadRouter = require('./routes/uploadRoute');
const postRouter = require('./routes/postRoute');
const { searchHandler } = require('./controllers/searchController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(fileUpload({ useTempFiles: true }));
app.use(passport.initialize());

/**
 * ROUTE
 */

app.use('/', authRouter);
app.use('/uploads', uploadRouter);
app.use('/user', verifyUser, userRouter);
app.use('/post', verifyUser, postRouter);
app.use('/search', searchHandler);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
start();
