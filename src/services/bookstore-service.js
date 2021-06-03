export default class BookstoreService {
  getBooks() {
    return [
      {
        id:1,
        title: 'First book',
        author: 'Friend'
      },
      {
        id:2,
        title: 'Second book',
        author: 'Another friend'
      }
    ]
  }
}