const express = require('express');
const socket = require('socket.io');
const socks = require('./routes/socket')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
    console.error('Error connecting to mongo', err);
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => { console.log(`Server running on Port ${PORT}`) })

app.use('/', (req, res) => { res.send('hello') })

var io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});

io.on('connection', socks)