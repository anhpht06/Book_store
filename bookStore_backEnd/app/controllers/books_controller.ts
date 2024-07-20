import Auther from '#models/auther'
import Book from '#models/book'
import CategoryBook from '#models/category_book'
import DetailBook from '#models/detail_book'
import TypeBook from '#models/type_book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  //Type book

  async getTypeBookById(ctx: HttpContext) {
    const typeBook = await TypeBook.findOrFail(ctx.params.id)
    if (Object.keys(typeBook).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: typeBook })
  }
  async showListTypeBook(ctx: HttpContext) {
    const typeBooks = await TypeBook.all()

    if (Object.keys(typeBooks).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: typeBooks })
  }
  async createTypeBook(ctx: HttpContext) {
    const typeBook = await TypeBook.create(ctx.request.body())
    return ctx.response.ok({ messages: 'success', data: typeBook })
  }
  async updateTypeBook(ctx: HttpContext) {
    const typeBook = await TypeBook.findOrFail(ctx.params.id)
    typeBook.merge(ctx.request.body())
    await typeBook.save()
    return ctx.response.ok({ messages: ' updatesuccess', data: typeBook })
  }
  async deleteTypeBook(ctx: HttpContext) {
    const typeBook = await TypeBook.findOrFail(ctx.params.id)
    await typeBook.delete()
    return ctx.response.ok({ messages: 'delete success' })
  }
  //Category book
  //show all category book
  async showListCategoryBook(ctx: HttpContext) {
    const categoryBooks = await CategoryBook.query().preload('typeBook')
    if (Object.keys(categoryBooks).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: categoryBooks })
  }

  async showListCategoryBookToType(ctx: HttpContext) {
    const categoryBooks = await CategoryBook.query().where('type_book_id', ctx.params.id)
    if (Object.keys(categoryBooks).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }

    return ctx.response.ok({ messages: 'success', data: categoryBooks })
  }
  async createCategoryBook(ctx: HttpContext) {
    const data = await CategoryBook.create(ctx.request.body())
    return ctx.response.ok({ messages: 'success', data: data })
  }
  async updateCategotyBook(ctx: HttpContext) {
    const data = await CategoryBook.findOrFail(ctx.params.id)
    data.merge(ctx.request.body())
    await data.save()
    return ctx.response.ok({ messages: 'updata success', data: data })
  }
  async deleteCategotyBook(ctx: HttpContext) {
    const data = await CategoryBook.findByOrFail('id', ctx.params.id)
    await data.delete()
    return ctx.response.ok({ messages: 'delete success' })
  }
  //auther
  async createAuther(ctx: HttpContext) {
    const auther = await Auther.create(ctx.request.body())
    return ctx.response.ok({ messages: 'success', data: auther })
  }
  async showListAuther(ctx: HttpContext) {
    const auther = await Auther.all()

    if (Object.keys(auther).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: auther })
  }
  async updateAuther(ctx: HttpContext) {
    const auther = await Auther.findOrFail(ctx.params.id)
    auther.merge(ctx.request.body())
    await auther.save()
    return ctx.response.ok({ messages: 'update success', data: auther })
  }
  async deleteAuther(ctx: HttpContext) {
    const auther = await Auther.findByOrFail('id', ctx.params.id)
    await auther.delete()
    return ctx.response.ok({ messages: 'delete success' })
  }
  //Books

  async showBookById(ctx: HttpContext) {
    const book = await Book.query()
      .where('id', ctx.params.id)
      .preload('typeBook')
      .preload('catetoryBook')
      .preload('auther')
      .first()
    if (book === null) {
      return ctx.response.json({status: '404', messages: 'not found' })
    }
    return ctx.response.ok({ status: '200', messages: 'success', data: book })
  }

  async showDetailBookByIdBook(ctx: HttpContext) {
    const book = await DetailBook.query().where('book_id', ctx.params.id).first()
    if (book === null) {
      return ctx.response.json({
        status: '404',
        messages: 'not found',
      })
    }
    return ctx.response.ok({
      status: '200',
      messages: 'success',
      data: book,
    })
  }

  async showListBookByIdCategory(ctx: HttpContext) {
    console.log(ctx.params.id)

    const book = await Book.query()
      .where('category_id', ctx.params.id)
      .preload('typeBook')
      .preload('catetoryBook')

    if (Object.keys(book).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: book })
  }

  async showAllListBooks(ctx: HttpContext) {
    const book = await Book.all()

    if (Object.keys(book).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    return ctx.response.ok({ messages: 'success', data: book })
  }
  async createBook(ctx: HttpContext) {
    const book = await Book.create(ctx.request.body())
    if (Object.keys(book).length === 0) {
      return ctx.response.notFound({ messages: 'not found' })
    }
    await DetailBook.create({ book_id: book.id })
    return ctx.response.ok({ messages: 'success', data: book })
  }
  async updateBook(ctx: HttpContext) {
    const book = await Book.findOrFail(ctx.params.id)
    book.merge(ctx.request.body())
    await book.save()
    return ctx.response.ok({ messages: 'update success', data: book })
  }
  async deleteBook(ctx: HttpContext) {
    const book = await Book.findByOrFail('id', ctx.params.id)
    await book.delete()
    return ctx.response.ok({ messages: 'delete success' })
  }
}
