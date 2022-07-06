import express from 'express'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import './middlewares/passport'
import 'dotenv/config'
import {connectMongo} from './db/dbConnect'
import { myLogger } from './middlewares/logger'

import viewsRoute from './routes/viewRoutes'
import authRoute from './routes/authRoutes'
import prodRoute from './routes/prodRoutes'
import cartRoute from './routes/cartRoutes'

const app = express()

connectMongo()

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO,
    }),
    secret: String(process.env.SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: Number(process.env.TIME_COOKIE)
    }
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())



app.use('/api/auth', authRoute)
app.use('/', viewsRoute)
app.use('/api/productos', prodRoute)
app.use( '/api/carrito', cartRoute)

app.use(myLogger)

export default app