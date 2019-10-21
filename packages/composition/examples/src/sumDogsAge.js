const { rail } = require('../../lib/index')
const { filter, map, reduce } = require('@arrows/array')

const sumDogsAge = rail(
  filter((pet) => pet.specie === 'dog'),
  map((pet) => {
    if (pet.age < 0) {
      throw new Error('Wrong age!')
    }
    return pet.age
  }),
  reduce((a, b) => a + b, 0),
)

const pets = [
  { specie: 'dog', name: 'Charlie', age: 4 },
  { specie: 'cat', name: 'Luna', age: 6 },
  { specie: 'dog', name: 'Ollie', age: -10 },
]

const result = sumDogsAge(pets)

if (result instanceof Error) {
  console.log('Oops!')
} else {
  console.log(`Sum: ${result}`)
}

// -> "Oops!"
