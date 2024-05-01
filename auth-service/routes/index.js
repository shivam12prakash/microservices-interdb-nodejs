import { Router } from 'express'
import AuthRoutes from '../routes/authRoutes.js'
import UserRoutes from '../routes/userRoutes.js'
const router = Router()

router.use('/api', AuthRoutes)
router.use('/api', UserRoutes)

export default router
