const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');
const { v4: uuidv4 } = require('uuid');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

// var url = 'mongodb+srv://maximilian:1fTl973JsCzkgzNf@cluster0-ntrwp.mongodb.net/restAPI';


const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null,uuidv4()
        //  new Date().toISOString() + '-' +
        //   file.originalname
          );
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const massage = error.massage;
    const data = error.data;
    res.status(status).json({massage: massage, data: data });
});


mongoose.connect('mongodb+srv://neeraj:niru143@cluster0.cf2jj.mongodb.net/restPI?retryWrites=true&w=majority')
.then(result => {
app.listen(8080);
console.log('Database Connected')

})
.catch(err => console.log(err));


// mongoose
// .connect('mongodb+srv://maximilian:1fTl973JsCzkgzNf@cluster0-ntrwp.mongodb.net/restAPI',
// )
// .then(result => {
//     app.listen(8080)
   
// })
// .catch(err => 
//     console.log(err,'31')
// );
 

