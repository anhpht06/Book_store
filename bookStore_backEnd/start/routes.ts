import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'

router
  .group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login', [UsersController, 'login'])
    router.post('/logout', [UsersController, 'logout'])
    router.delete('/delete/:id', [UsersController, 'delete'])
    router
      .group(() => {
        router.post('/:id', [UsersController, 'updateProfieUser'])
      })
      .prefix('/profile-user')
  })
  .prefix('/user')
router
  .group(() => {
    router.get('', [BooksController, 'showListTypeBook'])
    router.post('/create', [BooksController, 'createTypeBook'])
    router.patch('/update/:id', [BooksController, 'updateTypeBook'])
    router.delete('/delete/:id', [BooksController, 'deleteTypeBook'])
  })
  .prefix('/type-book')
router
  .group(() => {
    router.get('/:id', [BooksController, 'showListCategoryBookToType'])
    router.post('/create', [BooksController, 'createCategoryBook'])
    router.patch('/update/:id', [BooksController, 'updateCategotyBook'])
    router.delete('/delete/:id', [BooksController, 'deleteCategotyBook'])
  })
  .prefix('/category-book')
router
  .group(() => {
    router.get('', [BooksController, 'showListAuther'])
    router.post('/create', [BooksController, 'createAuther'])
    router.patch('/update/:id', [BooksController, 'updateAuther'])
    router.delete('/delete/:id', [BooksController, 'deleteAuther'])
  })
  .prefix('/auther')
router
  .group(() => {
    router.get('', [BooksController, 'showListBookToID'])
    router.post('/create', [BooksController, 'createBook'])
    router.patch('/update/:id', [BooksController, 'updateBook'])
    router.delete('/delete/:id', [BooksController, 'deleteBook'])
  })
  .prefix('/books')
