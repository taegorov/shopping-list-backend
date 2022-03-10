'use strict';

const express = require('express');
const cors = require('cors');

// const userRoutes = require('./routes/user.js');
const listRoutes = require('./routes/list.js')
// const authRoutes = require('./routes/auth.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, 'to', req.url, 'route')
  next()
})

// app.use(userRoutes);
app.use(listRoutes);


module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`🚦 shopping list server running on ${PORT} 🚦`));
  }
}
