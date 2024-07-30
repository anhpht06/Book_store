import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import Cart from '#models/cart'

export default class OdersController {
  async createOrder(ctx: HttpContext) {
    const { user_id, name_user, address, phone, total_quantity, total_price, cart_ids } =
      ctx.request.body()

    try {
      const order = await Order.create({
        user_id: user_id,
        name_user: name_user,
        address: address,
        phone: phone,
        total_quantity: total_quantity,
        total_price: total_price,
      })
      const orders = await Cart.query().where('user_id', user_id).whereIn('id', cart_ids)
      console.log(orders)

      if (Array.isArray(orders) && orders.length > 0) {
        const orderData = orders.map((orders) => ({
          book_id: orders.book_id,
          amount: orders.amount,
        }))

        const bookData = orderData.reduce(
          (acc, { book_id, amount }) => {
            acc[book_id] = { amount }
            return acc
          },
          {} as Record<number, { amount: number }>
        )

        await order.related('books').attach(bookData)

        return ctx.response.status(200).json({
          status: '200',
          message: 'Order created successfully',
          data: order,
        })
      } else {
        console.log('No books found or invalid book_ids.')
      }
    } catch (error) {
      return ctx.response.status(500).json({
        status: '500',
        message: 'Error creating order',
      })
    }
  }
  async getOdersByUser(ctx: HttpContext) {
    const orders = await Order.query()
      .where('user_id', ctx.params.id)
      .preload('books', (book) => {
        book.orderBy('id', 'asc').preload('detailBook').preload('auther')
      })

    if (Object.keys(orders).length === 0) {
      return ctx.response.json({ status: '404', messages: 'not found' })
    } else {
      const ordersWithAmount = orders.map((order) => ({
        id: order.id,
        user_id: order.user_id,
        total_quantity: order.total_quantity,
        total_price: order.total_price,
        books: order.books.map((book: any) => ({
          id: book.id,
          amount: book.$extras.pivot_amount,
          nameBook: book.name_book,
          image_book: book.image_book,
          price: book.detailBook.price,
          auther: book.auther.name,
        })),
      }))

      return ctx.response.json({ status: '200', data: ordersWithAmount })
    }
  }
}
