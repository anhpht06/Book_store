import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'

router
  .group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login', [UsersController, 'login'])
    router.get('/login/:email', [UsersController, 'getIdUserByEmail'])
    router.post('/logout', [UsersController, 'logout'])
    router.delete('/delete/:id', [UsersController, 'delete'])
    router.get('/', [UsersController, 'getAllProfileUser'])
    router
      .group(() => {
        router.get('', [UsersController, 'getAllUser'])
        router.get('/:id', [UsersController, 'getProUserById'])
        router.put('/:id', [UsersController, 'updateProfieUser'])
      })
      .prefix('/profile-user')
  })
  .prefix('/user')
router
  .group(() => {
    router.get('/:id', [BooksController, 'getTypeBookById'])
    router.get('', [BooksController, 'showListTypeBook'])
    router.post('/create', [BooksController, 'createTypeBook'])
    router.put('/update/:id', [BooksController, 'updateTypeBook'])
    router.delete('/delete/:id', [BooksController, 'deleteTypeBook'])
  })
  .prefix('/type-book')
router
  .group(() => {
    router.get('', [BooksController, 'showListCategoryBook'])
    router.get('/:id', [BooksController, 'showListCategoryBookToType'])
    router.post('/create', [BooksController, 'createCategoryBook'])
    router.put('/update/:id', [BooksController, 'updateCategotyBook'])
    router.delete('/delete/:id', [BooksController, 'deleteCategotyBook'])
  })
  .prefix('/category-book')
router
  .group(() => {
    router.get('', [BooksController, 'showListAuther'])
    router.post('/create', [BooksController, 'createAuther'])
    router.put('/update/:id', [BooksController, 'updateAuther'])
    router.delete('/delete/:id', [BooksController, 'deleteAuther'])
  })
  .prefix('/auther')
router
  .group(() => {
    router.get('/detail-book/:id', [BooksController, 'showDetailBookByIdBook'])
    router.get('/category/:id', [BooksController, 'showListBookByIdCategory'])
    router.get('', [BooksController, 'showAllListBooks'])
    router.get('/:id', [BooksController, 'showBookById'])
    router.post('/create', [BooksController, 'createBook'])
    router.patch('/update/:id', [BooksController, 'updateBook'])
    router.delete('/delete/:id', [BooksController, 'deleteBook'])
  })
  .prefix('/books')
