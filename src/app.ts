import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import config from './app/config'

const app: Application = express()
// const port = 5000

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', StudentRoutes)

const getAController = (req: Request, res: Response) => {

    const a = 10;
    res.send(a)
}

app.get('/', getAController)

// app.listen(config.port, () => {
//     console.log(`Example app listening on port ${config.port}`)
// })

// console.log(process.cwd())
// D:\Level-2 Batch-4\All Milestone\Milestone-2\module-7\first-project

export default app;