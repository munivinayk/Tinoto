const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import Passport config
require('./config/passport');

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    if (err.name === 'MongoServerError') {
      console.error("MongoDB Server Error Code:", err.code);
      console.error("MongoDB Server Error Message:", err.errmsg);
    }
  }
}

// Call the run function to connect to MongoDB
run();

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;  // Change 5000 to 5001 or another free port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
