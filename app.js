const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

require('dotenv').config(); // Config local .env

const app = express();

/**
 * Let's connect to the DB
 */
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@expresstest01-okzaa.azure.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

/**
 * Setup CORS headers
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * Easily parse request data
 */
app.use(bodyParser.json());

// app.post('/api/stuff', (req, res, next) => {
//     const thing = new Thing({
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     thing.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Post saved successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

// app.get('/api/stuff/:id', (req, res, next) => {
//     Thing.findOne({
//         _id: req.params.id
//     }).then(
//         (thing) => {
//             res.status(200).json(thing);
//         }
//     ).catch(
//         (error) => {
//             res.status(404).json({
//                 error: error
//             });
//         }
//     );
// });

// app.put('/api/stuff/:id', (req, res, next) => {
//     const thing = new Thing({
//         _id: req.params.id,
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     Thing.updateOne({ _id: req.params.id }, thing).then(
//         () => {
//             res.status(201).json({
//                 message: 'Thing updated successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

// app.delete('/api/stuff/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id }).then(
//         () => {
//             res.status(200).json({
//                 message: 'Deleted!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

// app.use('/api/stuff', (req, res, next) => {
//     Thing.find().then(
//         (things) => {
//             res.status(200).json(things);
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
