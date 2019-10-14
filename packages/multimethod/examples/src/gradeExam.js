const { multi, method, fromMulti } = require('@arrows/multimethod')

/**
 * @param {number} points
 * @returns {number} grade
 */
const baseGradeExam = multi(
  method((points) => points < 10, 'failed'),
  method((points) => points <= 15, 'ok'),
  method((points) => points > 15, 'good'),
)

const gradeExam = fromMulti(
  method((points) => points === 0, 'terrible'),
  method((points) => points > 20, 'excellent'),
)(baseGradeExam)

console.log(
  gradeExam(0), // -> 'terrible'
  gradeExam(5), // -> 'failed'
  gradeExam(10), // -> 'ok'
  gradeExam(15), // -> 'ok'
  gradeExam(20), // -> 'good'
  gradeExam(25), // -> 'excellent'
)
