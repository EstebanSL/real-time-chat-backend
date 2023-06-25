import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';
import messagesRoutes from './routes/messages.js';
import roomsRoutes from './routes/rooms.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

//Enviroment variables configuration
dotenv.config();

//express initialization and configuration
const app = express();
app.use(express.json());

//
const httpServer = createServer(app);
const options = {
  cors: {
    origin: "http://localhost:5173"
}
};

const io = new Server(httpServer, options);

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit('connected', 'its working');
  socket.on("addContact", (data) => {
    io.emit('addedContact', data)
  });
  socket.on("deleteContact", (data) => {
    io.emit('deletedContact', data)
  });
  socket.on("addMessage", (data) => {
    io.emit('addedMessage', data)
  });
  socket.on("typping", (data) => {
    io.emit('typpingMsg', data)
  });
});

//request security configuration
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//logger request configuration
app.use(morgan('common'));

//parse responses
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//Cross origin resource policy configuration
app.use(cors());

//Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/rooms', roomsRoutes);

/** MONGOOSE CONFIGURATION */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`listening on port: ${process.env.PORT}`);
    });
  });
