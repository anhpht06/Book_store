import ProfileUser from '#models/profile_user'
import User from '#models/user'
import { createUserValidators } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async register(ctx: HttpContext) {
    const userdata = await createUserValidators.validate(ctx.request.body())
    const user = await User.create(userdata)
    const profile_user = await ProfileUser.create({ user_id: user.id })
    console.log(profile_user)
    return ctx.response.ok(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()
    try {
      const user = await User.verifyCredentials(email, password)
      const accessToken = await User.accessTokens.create(user)
      return response.ok({ status: 'SUCCESS', data: accessToken })
    } catch (error) {
      return response.json({
        status: 'FAIL',
        error: 'Wrong password or email',
      })
    }
  }

  async logout(ctx: HttpContext) {
    return console.log({
      status: 'logout thanh cong',
    })
  }

  async delete(ctx: HttpContext) {
    const user = await User.findOrFail(ctx.params.id)
    console.log(user)
    await user.delete()
    return ctx.response.ok('xoa thanh cong')
  }

  async updateProfieUser(ctx: HttpContext) {
    const profileUser = await ProfileUser.findOrFail(ctx.params.id)
    profileUser.merge(ctx.request.body())
    await profileUser.save()
    return ctx.response.ok(profileUser)
  }
}
