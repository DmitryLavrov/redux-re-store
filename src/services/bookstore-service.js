export default class BookstoreService {
  data = [
    {
      id: 1,
      title: 'Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization',
      author: 'Susan J. Fowler',
      price: 18,
      coverImg: 'https://m.media-amazon.com/images/I/71kPW3SLQSL._AC_UY218_.jpg'
    },
    {
      id: 2,
      title: 'Release It!: Design and Deploy Production-Ready Software',
      author: 'Michael T. Nygard',
      price: 28,
      coverImg: 'https://m.media-amazon.com/images/I/711kreNLLNL._AC_UY218_.jpg'
    }
  ]

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rnd4 = Math.ceil(Math.random() * 4)
        console.log('rnd4:', rnd4)
        if (rnd4 > 1) {
          resolve(this.data)
        } else {
          reject('Something goes wrong...')
        }
      }, 800)
    })
  }
}