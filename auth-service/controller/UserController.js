import prisma from '../config/db.config.js'

class UserController {
  static async getUser(req, res) {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      return res.json({ user: user })
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

  static async getUsers(req, res) {
    try {
      const { userIds } = req.body
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      return res.json({ users: users })
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

export default UserController
