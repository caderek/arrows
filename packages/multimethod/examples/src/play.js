const curry = require('curry')
const { multi, method } = require('@arrows/multimethod')

/**
 * Currying with a generic `curry` function.
 * Explicit dispatch function (length: 2).
 *
 * Note that you can still use non-functions as corresponding values.
 *
 * @param {string} type
 * @param {string} source
 * @returns {string} info
 */
const play = multi(
  (type, source) => type,
  method('audio', (type, source) => `Playing audio from: ${source}`),
  method('video', (type, source) => `Playing video from: ${source}`),
)

const curriedPlay = curry(play)

const playAudio = curriedPlay('audio')
const playVideo = curriedPlay('video')

console.log(
  playAudio('songs.io/123'), // -> "Playing audio from: songs.io/123"
  playVideo('movies.com/123'), // -> "Playing video from: movies.com/123"
)
