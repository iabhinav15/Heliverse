import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//routes import
import userRouter from './routes/user.route.js'
import teamRouter from './routes/team.route.js'

//routes declaration
app.use("/api/users", userRouter)
app.use("/api/teams", teamRouter)


export { app }










