const { rail } = require('../../lib/index')

const addUser = rail(
  (user) => ({ type: 'user', data: user }),
  (entry) => {
    console.log(`Saving ${entry.data.name} to the database.`)
    // Returns undefined, argument will be automatically
    // passed to the next function.
  },
  (entry) => `Saved user: ${entry.data.name}`,
)

const user = { name: 'Joe' }

console.log(addUser(user))

/* Output
Saving Joe to the database.
Saved user: Joe
*/
