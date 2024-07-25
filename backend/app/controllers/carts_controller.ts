import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class CartsController {
  //get all cart
  async getAllCart(ctx: HttpContext) {
    return ctx.response.ok({
      status: '200',
      messages: 'success',
      data: 'hello',
    })
  }

  //get cart by id
  async getCartById(ctx: HttpContext) {}

  //create cart
  async createCart(ctx: HttpContext) {}
  //update cart
  async updateCart(ctx: HttpContext) {}
  //delete cart
  async deleteCart(ctx: HttpContext) {}
  //test
  public async index({ request, response }: HttpContext) {
    const { book_id, amount } = request.body()
    const book = await Book.find(book_id)
    // await cart = await Cart.create({
    //     book_id: book_id,
    //     amount: amount
    // })
    // return response.ok({
    //     status: '200',
    //     messages: 'success',
    //     data: cart, price = book?.price * amount
    // })
  }
}
