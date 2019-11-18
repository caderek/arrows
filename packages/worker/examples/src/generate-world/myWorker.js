const { worker } = require("@arrows/worker")
const seedrandom = require("seedrandom")

/**
 * A good example of utilizing worker threads
 * - generating pseudo-random data.
 *
 * @param {Object} payload
 * @param {string} payload.seed
 * @param {number} payload.width
 * @param {number} payload.height
 */
const generateWorld = ({ seed, width, height }) => {
  const rng = seedrandom(seed)
  const map = []

  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const isWall = rng() > 0.7 ? "💣 " : "🌳 "
      row.push(isWall)
    }
    map.push(row)
  }

  return map
}

module.exports = worker(generateWorld)
