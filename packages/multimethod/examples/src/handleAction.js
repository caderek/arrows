const { multi, method } = require('@arrows/multimethod')

const store = {
  add(text) {
    console.log('todo added')
  },
  remove(id) {
    console.log('todo removed')
  },
  toggle(id) {
    console.log('todo toggled')
  },
}

/**
 * Function with a custom dispatch.
 * Dispatch function can produce any arbitrary value.
 *
 * @param {Object} action
 * @param {Object} store
 * @returns {void}
 */
const handleAction = multi(
  (action, store) => action.type, // custom dispatch
  method('ADD_TODO', (action, store) => store.add(action.text)),
  method('REMOVE_TODO', (action, store) => store.remove(action.id)),
  method('TOGGLE_TODO', (action, store) => store.toggle(action.id)),
)

handleAction({ type: 'ADD_TODO', text: 'Eat banana.' }, store) // -> "todo added"
handleAction({ type: 'TOGGLE_TODO', id: 0 }, store) // -> "todo toggled"
