import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/user_auth.js'
import connectDB from './config/db.js';
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/keep-alive', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "HotDrop Server is Awake! 🔥",
    timestamp: new Date().toLocaleString()
  });
});
const PORT = process.env.PORT || 3000
const URL=process.env.FRONTEND_URL
const corsOptions ={
  origin: URL,
  credentials: true ,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}; 
app.use(cors(corsOptions));

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.get('/', (req, res) => res.send("HotDrop Backend is Live! 🚀"));
app.listen(PORT, () => {
    connectDB(),
    // startLiveTracking();
  console.log(`Example app listening on port ${PORT}`)
})