import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Cart from '#models/cart'

export default class CartsController {
  //get all cart
  async getAllCart(ctx: HttpContext) {
    const response = await Cart.all()
    if (Object.keys(response).length === 0) {
      return ctx.response.json({ status: '404', messages: 'not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'success', data: response })
  }

  //get cart by id book
  async getCartByIdBook(ctx: HttpContext) {
    const { user_id, book_id } = ctx.request.body()

    const response = await Cart.query().where('user_id', user_id).where('book_id', book_id)

    if (Object.keys(response).length === 0) {
      return ctx.response.json({ status: '404', messages: 'not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'success', data: response })
  }
  //get cart by id user
  async getCartByIdUser(ctx: HttpContext) {
    const response = await Cart.query()
      .where('user_id', ctx.params.id)
      .orderBy('id', 'asc')
      .preload('books', (book) => {
        book.orderBy('id', 'asc').preload('detailBook').preload('auther')
      })

    if (Object.keys(response).length === 0) {
      return ctx.response.json({ status: '404', messages: 'not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'success', data: response })
  }
  //get cart by id cart
  async getCartByIdCart(ctx: HttpContext) {
    const { user_id, cart_id } = ctx.request.body()
    const response = await Cart.query()
      .where('user_id', user_id)
      .where('id', cart_id)
      .preload('books', (book) => {
        book.orderBy('id', 'asc').preload('detailBook').preload('auther')
      })

    if (response === null) {
      return ctx.response.json({ status: '404', messages: 'not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'success', data: response })
  }

  //create cart
  async createCart(ctx: HttpContext) {
    const { user_id, book_id, amount } = ctx.request.body()

    try {
      const cart = await Cart.query().where('user_id', user_id).where('book_id', book_id).first()

      if (cart) {
        const newAmount = cart.amount + Number.parseInt(amount)
        await Cart.query()
          .where('user_id', user_id)
          .where('book_id', book_id)
          .update({ amount: newAmount })
        return ctx.response.status(200).json({
          status: '200',
          message: 'Book added to cart successfully',
          data: cart,
        })
      } else {
        const cart = await Cart.create({ user_id, book_id, amount })
        const book = await Book.findBy('id', book_id)
        if (book) {
          await cart.related('books').attach({
            [book_id]: { amount: amount },
          })
          return ctx.response.status(200).json({
            status: '200',
            message: 'Book added to cart successfully',
            data: cart,
          })
        } else {
          return ctx.response.status(404).json({ status: '404', message: 'Book not found' })
        }
      }
    } catch (error) {
      console.error(error)
      return ctx.response.status(500).json({ status: '500', message: 'Failed to add book to cart' })
    }
  }
  async updateCart(ctx: HttpContext) {
    const { user_id, book_id, amount } = ctx.request.body()
    await Cart.query()
      .where('user_id', user_id)
      .where('book_id', book_id)
      .update({ amount: amount })
      .first()
    return ctx.response.status(200).json({
      status: '200',
      message: 'updata cart successfully',
    })
  }
  //delete cart
  async deleteCart(ctx: HttpContext) {
    const cart = await Cart.findBy('id', ctx.params.id)
    await cart?.delete()
    if (!cart) {
      return ctx.response.status(404).json({ status: '404', message: 'Cart not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'delete success' })
  }

  async deleteCartWhenOrder(ctx: HttpContext) {
    const { cart_ids } = ctx.request.body()

    const cart = await Cart.query().whereIn('id', cart_ids).delete()

    if (!cart) {
      return ctx.response.status(404).json({ status: '404', message: 'Cart not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'delete success' })
  }
}
