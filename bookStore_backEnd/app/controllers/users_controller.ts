import ProfileUser from '#models/profile_user'
import User from '#models/user'
import { createUserValidators } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class UsersController {
  async register(ctx: HttpContext) {
    const userdata = await createUserValidators.validate(ctx.request.body())
    const user = await User.create(userdata)

    await ProfileUser.create({ user_id: user.id })

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
    return ctx.response.ok({
      status: 'SUCCESS',
      messages: 'delete success',
    })
  }

  async updateProfieUser(ctx: HttpContext) {
    const profileUser = await ProfileUser.findOrFail(ctx.params.id)
    profileUser.merge(ctx.request.body())
    await profileUser.save()
    return ctx.response.ok(profileUser)
  }

  async getAllUser(ctx: HttpContext) {
    const users = await User.all()
    return ctx.response.ok(users)
  }

  async getProUserById(ctx: HttpContext) {
    const profileUser = await ProfileUser.query()
      .where('user_id', ctx.params.id)
      .preload('user')
      .first()
    return ctx.response.ok({
      status: 'SUCCESS',
      data: profileUser,
    })
  }
  async getIdUserByEmail(ctx: HttpContext) {
    const user = await User.query().where('email', ctx.params.email)
    return ctx.response.ok(user)
  }
}
