import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/authRoute.js'
import connectDB from './config/db.js';
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.get('/keep-alive', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "HotDrop Server is Awake! 🔥",
    timestamp: new Date().toLocaleString()
  });
});
const PORT = process.env.PORT || 3000

app.use('/auth',authRouter)
app.get('/', (req, res) => res.send("HotDrop Backend is Live! 🚀"));
app.listen(PORT, () => {
    connectDB(),
    // startLiveTracking();
  console.log(`Example app listening on port ${PORT}`)
})