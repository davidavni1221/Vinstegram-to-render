const express = require('express')
const cors = require('cors')
const path = require('path')
// const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

// Express App Config
const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8081', 'http://localhost:8081', 'http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const storyRoutes = require('./api/story/story.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const reviewRoutes = require('./api/review/review.routes')
const adminRoutes = require('./api/admin/admin.routes')
const { connectSockets } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/story', storyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/admin', adminRoutes)

connectSockets(http, session)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`App listening on port ${port}!`)
});

// const port = process.env.PORT || 3030
// http.listen(port, () => {
//   logger.info('Server is running on port: ' + port)
// })

// "start": "set NODE_ENV=development&&nodemon server.js",

// app.use(express.static(path.resolve(__dirname, 'public')))
