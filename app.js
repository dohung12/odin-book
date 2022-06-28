require('dotenv').config();
const express = require('express');
require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
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
const searchRouter = require('./routes/searchRoute');

const app = express();

app.use(cors());
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

app.use('/api/v1/', authRouter);
app.use('/api/v1/uploads', verifyUser, uploadRouter);
app.use('/api/v1/user', verifyUser, userRouter);
app.use('/api/v1/post', verifyUser, postRouter);
app.use('/api/v1/search', verifyUser, searchRouter);

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
