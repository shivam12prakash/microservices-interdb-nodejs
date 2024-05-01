import bcrypt from 'bcrypt'
import prisma from '../config/db.config.js'
import jwt from 'jsonwebtoken'

class AuthController {
  static async register(req, res) {
    try {
      const payload = req.body
      const salt = bcrypt.genSaltSync(10)
      payload.password = bcrypt.hashSync(payload.password, salt)

      // saving to db
      const user = await prisma.user.create({
        data: payload,
      })

      return res.json({ message: 'Account has been created !!!', user })
    } catch (error) {
      return res
        .status(500)
        .json({ messgae: 'Something went Wrong, Please try again' })
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({
        where: { email: email },
      })

      if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ message: `Invalid Password` })
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '365d',
        })

        return res.json({
          message: 'Logged In Sucessfully',
          access_token: `Bearer ${token}`,
        })
      }

      return res.status(401).json({ message: `Invalid Credentials` })
    } catch (error) {
      return res.status(500).json({ messsage: `Try Logging again` })
    }
  }
  static async user(req, res) {
    const user = req.user
    return res.status(200).json({ user: user })
  }
}

export default AuthController
