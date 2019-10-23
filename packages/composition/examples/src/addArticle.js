const { railAsync } = require('../../lib/index')

const dbFake = {
  id: 0,
  save(entry) {
    const result = Promise.resolve(this.id)
    this.id++
    return result
  },
}

const addArticle = railAsync(
  (article) => ({ type: 'article', data: article }),
  (entry) => dbFake.save(entry),
  (id) => `Article id: ${id}`,
)

const main = async () => {
  const article = {
    title: 'Railway oriented programming',
    content: 'Lorem ipsum...',
  }

  const result = await addArticle(article)
  console.log(result)
}

main() // -> "Article id: 0"
