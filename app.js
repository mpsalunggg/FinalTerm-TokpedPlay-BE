const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./config/db')
const routerAuth = require('./routes/auth.route')
const routerPrivate = require('./routes/private.route')
const routerPublic = require('./routes/public.route')

app.use(cors())
require('dotenv').config()

connectDb()
app.use(express.json())
app.use(routerAuth)
app.use(routerPublic)
app.use(routerPrivate)

app.listen(process.env.PORT || 3004, () => {
  console.log('Server Listening On Port 3004')
})
