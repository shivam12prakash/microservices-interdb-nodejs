import { Router } from 'express'
import PostRoutes from '../routes/postRoutes.js'

const router = Router()

router.use('/api', PostRoutes)

export default router
