import * as curry from 'ramda.curry'
import {
  FirstArgumentError,
  NoArgumentsError,
  NoMethodError,
  NotMethodError,
  NotMultimethodError,
} from './errors'
import { multi, method, fromMulti, __ } from './index'

describe('multi', () => {
  describe('executed without any arguments', () => {
    it('throws an error (not enough arguments)', () => {
      expect(multi).toThrowError(NoArgumentsError)
    })
  })

  describe('executed with dispatch function only', () => {
    it('creates multimethod that throws error: no matching method', () => {
      const fn = multi(() => true)
      expect(fn).toThrowError(NoMethodError)
    })

    it('works also for chunked dispatch', () => {
      const fn = multi(() => () => true)
      expect(fn()).toThrowError(NoMethodError)
    })
  })

  describe('executed with dispatch function and list of methods', () => {
    it('creates multimethod that executes matching method', () => {
      const spellNumber = multi(
        (x) => x,
        method(0, (x) => 'zero'),
        method(1, (x) => 'one'),
        method(2, (x) => 'two'),
        method((x) => 'other number'),
      )

      const results = [
        spellNumber(0),
        spellNumber(1),
        spellNumber(2),
        spellNumber(7),
      ]

      const expected = ['zero', 'one', 'two', 'other number']

      expect(results).toEqual(expected)
    })
  })

  describe('executed with list of methods only', () => {
    describe('creates multimethod that executes matching method using implicit dispatch', () => {
      it('that works like identity function for single argument', () => {
        const spellNumber = multi(
          method(0, (x) => 'zero'),
          method(1, (x) => 'one'),
          method(2, (x) => 'two'),
          method((x) => 'other number'),
        )

        const results = [
          spellNumber(0),
          spellNumber(1),
          spellNumber(2),
          spellNumber(7),
        ]

        const expected = ['zero', 'one', 'two', 'other number']

        expect(results).toEqual(expected)
      })

      it('that returns an array of arguments if there is more than one argument', () => {
        const spellNumber = multi(
          method([0, 0], () => 'zero'),
          method([1, 1], () => 'one'),
          method([2, 2], () => 'two'),
          method(() => 'other numbers'),
        )

        const results = [
          spellNumber(0, 0),
          spellNumber(1, 1),
          spellNumber(2, 2),
          spellNumber(7, 7),
        ]

        const expected = ['zero', 'one', 'two', 'other numbers']

        expect(results).toEqual(expected)
      })

      it('that works like identity function for single argument - default only', () => {
        const sayHello = multi(method((x) => 'hello'))

        const result = sayHello('foo')
        const expected = 'hello'

        expect(result).toEqual(expected)
      })
    })
  })

  describe('throws readable error when first argument is nether dispatch function nor partial method', () => {
    const createIncorrectMultimethod = () => {
      // @ts-ignore
      multi('oops')
    }
    expect(createIncorrectMultimethod).toThrowError(FirstArgumentError)
  })

  describe('throws readable error when other arguments are not partial methods', () => {
    const createIncorrectMultimethod = () => {
      // @ts-ignore
      multi((x) => x, 'oops')
    }
    expect(createIncorrectMultimethod).toThrowError(NotMethodError)
  })
})

describe('method', () => {
  describe('when run separately', () => {
    it('creates new multimethod based on supplied one (with new method)', () => {
      const greet = multi(
        (user) => user.lang,
        method('en', () => 'Hello!'),
      )
      const polyGreet = method('pl', () => 'Cześć!')(greet)

      const result = polyGreet({ name: 'Maciej', lang: 'pl' })
      const expected = 'Cześć!'

      expect(result).toEqual(expected)
    })

    it('always returns new multimethod, base multimethod remains intact', () => {
      const oldMultimethod = multi(
        (x) => x,
        method(0, () => 'zero'),
        method(() => 'other'),
      )

      const newMultimethod = method(0, () => 'oh')(oldMultimethod)
      const newerMultimethod = method(() => 'unknown')(newMultimethod)

      expect(newMultimethod).not.toBe(oldMultimethod)
      expect(newerMultimethod).not.toBe(newMultimethod)
      expect(oldMultimethod(0)).toEqual('zero')
      expect(oldMultimethod(1)).toEqual('other')
      expect(newMultimethod(0)).toEqual('oh')
      expect(newMultimethod(1)).toEqual('other')
      expect(newerMultimethod(0)).toEqual('oh')
      expect(newerMultimethod(1)).toEqual('unknown')
    })

    it('throws error if function that you try to extend is not multimethod', () => {
      const notMultimethod = () => {} // tslint:disable-line
      const execute = () => {
        // @ts-ignore
        method('default')(notMultimethod)
      }

      expect(execute).toThrowError(NotMultimethodError)
    })
  })

  it('when only function is provided creates default method', () => {
    const multimethod = multi(
      (x) => x,
      method(() => 'default'),
    )

    const result = multimethod(1)
    const expected = 'default'

    expect(result).toEqual(expected)
  })

  it('when both arguments are provided adds method for specific case', () => {
    const multimethod = multi(
      (x) => x,
      method(1, () => 'one'),
      method(() => 'default'),
    )

    expect(multimethod(1)).toEqual('one')
    expect(multimethod(2)).toEqual('default')
  })

  it('when you pass other value instead of function, returns that value', () => {
    const multimethod = multi(
      (x) => x,
      method(1, 'one'),
      method(2, 'two'),
      method('default'),
    )

    expect(multimethod(1)).toEqual('one')
    expect(multimethod(2)).toEqual('two')
    expect(multimethod(3)).toEqual('default')
  })
})

describe('multimethod', () => {
  describe('when both dispatch and method are manually curried', () => {
    it('dispatch starts after calling lust chunk of the dispatch function', () => {
      const add = multi(
        (a) => (b) => [typeof a, typeof b],
        method(['number', 'number'], (a) => (b) => a + b),
        method(['string', 'string'], (a) => (b) => `${a} ${b}`),
        method(['function', 'function'], (a) => (b) => (...args) =>
          b(a(...args)),
        ),
        method((a) => (b) => `No method for arguments ${a} and ${b}`),
      )

      expect(add(1)(1)).toEqual(2)
      expect(add('foo')('bar')).toEqual('foo bar')
      expect(add(Math.max)(Math.sqrt)).toBeInstanceOf(Function)
      expect(add(Math.max)(Math.sqrt)(1, 2, 3, 4)).toEqual(2)
      expect(add(1)('foo')).toEqual('No method for arguments 1 and foo')
    })

    it('works also when methods have values other than functions', () => {
      const add = multi(
        (a) => (b) => [typeof a, typeof b],
        method(['number', 'number'], 'adding numbers'),
        method(['string', 'string'], 'adding strings'),
        method('no idea how to add that'),
      )

      expect(add(1)(1)).toEqual('adding numbers')
      expect(add('foo')('bar')).toEqual('adding strings')
      expect(add(1)('foo')).toEqual('no idea how to add that')
    })
  })

  it('works with automatic currying functions', () => {
    const add = multi(
      (a, b) => [typeof a, typeof b],
      method(['number', 'number'], (a, b) => a + b),
    )

    const curriedAdd = curry(add)

    expect(curriedAdd(1, 2)).toEqual(3)
    expect(curriedAdd(1)(2)).toEqual(3)
  })

  it('uses deep strict equality to match cases', () => {
    const multimethod = multi(
      (x) => x,
      method({ foo: 1, bar: '2' }, 'first'),
      method({ foo: 1, bar: 2 }, 'second'),
    )

    expect(multimethod({ foo: 1, bar: '2' })).toEqual('first')
    expect(multimethod({ foo: 1, bar: 2 })).toEqual('second')
  })

  describe('when case is a function and dispatch is not chunked', () => {
    it('executes that function with initial arguments', () => {
      const multimethod = multi(
        method((a, b) => b === 1, 'one'),
        method((a, b) => b === 2, 'two'),
      )

      expect(multimethod(0, 1)).toEqual('one')
      expect(multimethod(0, 2)).toEqual('two')
    })
  })

  describe('when case is a function and dispatch is chunked', () => {
    it('executes that function with all arguments that would be otherwise passed to dispatch (dechunked)', () => {
      const multimethod = multi(
        (a) => (b) => {}, // tslint:disable-line
        method((a, b) => b === 1, 'one'),
        method((a, b) => b === 2, 'two'),
      )

      expect(multimethod(0)(1)).toEqual('one')
      expect(multimethod(0)(2)).toEqual('two')
    })
  })

  describe('when case is a skip __ symbol and dispatch is not chunked', () => {
    it('matches any value', () => {
      const multimethod = multi(method(__, 'ok'), method('default'))

      expect(multimethod(__)).toEqual('ok')
      expect(multimethod('hello')).toEqual('ok')
      expect(multimethod(/abc/)).toEqual('ok')
    })
  })

  describe('when case is a skip __ symbol and dispatch is chunked', () => {
    it('matches any value', () => {
      const multimethod = multi(
        () => () => (val) => val,
        method(__, 'ok'),
        method('default'),
      )

      expect(multimethod()()(__)).toEqual('ok')
      expect(multimethod()()('hello')).toEqual('ok')
      expect(multimethod()()(/abc/)).toEqual('ok')
    })
  })

  describe('when case is a constructor and dispatch is not chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}

      const multimethod = multi(method(Cat, 'cat'), method(Dog, 'dog'))

      expect(multimethod(new Cat())).toEqual('cat')
      expect(multimethod(new Dog())).toEqual('dog')
    })
  })

  describe('when case is a constructor and dispatch is chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}

      const multimethod = multi(
        () => () => (animal) => animal,
        method(Cat, 'cat'),
        method(Dog, 'dog'),
      )

      expect(multimethod()()(new Cat())).toEqual('cat')
      expect(multimethod()()(new Dog())).toEqual('dog')
    })
  })

  describe('when case is a regex and dispatch is not chunked', () => {
    it('matches the dispatch value with RegExp.test() ', () => {
      const multimethod = multi(
        method(/cat/, 'cat'),
        method(/dog/, 'dog'),
        method('default'),
      )

      expect(multimethod("I'm a cat")).toEqual('cat')
      expect(multimethod('Woof - dog barked')).toEqual('dog')
      expect(multimethod(new RegExp('dog'))).toEqual('dog')
      expect(multimethod(/cat/)).toEqual('cat')
      expect(multimethod(123)).toEqual('default')
      expect(multimethod(/cow/)).toEqual('default')
      expect(multimethod(new RegExp('horse'))).toEqual('default')
      expect(multimethod('bird')).toEqual('default')
    })
  })

  describe('when case is a regex and dispatch is chunked', () => {
    it('matches the dispatch value with RegExp.test() ', () => {
      const multimethod = multi(
        () => () => (val) => val,
        method(/cat/, 'cat'),
        method(/dog/, 'dog'),
        method('default'),
      )

      expect(multimethod()()("I'm a cat")).toEqual('cat')
      expect(multimethod()()('Woof - dog barked')).toEqual('dog')
      expect(multimethod()()(new RegExp('dog'))).toEqual('dog')
      expect(multimethod()()(/cat/)).toEqual('cat')
      expect(multimethod()()(123)).toEqual('default')
      expect(multimethod()()(/cow/)).toEqual('default')
      expect(multimethod()()(new RegExp('horse'))).toEqual('default')
      expect(multimethod()()('bird')).toEqual('default')
    })
  })

  describe('when case is a constructor and dispatch is chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}

      const multimethod = multi(
        () => () => (animal) => animal,
        method(Cat, 'cat'),
        method(Dog, 'dog'),
      )

      expect(multimethod()()(new Cat())).toEqual('cat')
      expect(multimethod()()(new Dog())).toEqual('dog')
    })
  })

  describe('when case is an array of mixed cases and dispatch is not chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        (animal1, animal2, action) => [animal1, animal2, action],
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
        method([Dog, Cat, /play/], 'Having fun.'),
        method([Dog, Cat, __], 'They just stare.'),
      )

      expect(fn(new Cat(), new Mouse(), 'eat')).toEqual(
        'The cat ate the mouse!',
      )
      expect(fn(new Dog(), new Mouse(), 'eat')).toEqual(
        'The dog did not eat the mouse.',
      )
      expect(fn(new Dog(), new Cat(), 'eat')).toEqual(
        'The dog did not eat the cat.',
      )
      expect(fn(new Dog(), new Cat(), 'play with the ball')).toEqual(
        'Having fun.',
      )
      expect(fn(new Dog(), new Cat(), 'read')).toEqual('They just stare.')
    })
  })

  describe('when case is an array of mixed cases and default dispatch', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
        method([Dog, Cat, /play/], 'Having fun.'),
        method([Dog, Cat, __], 'They just stare.'),
      )

      expect(fn(new Cat(), new Mouse(), 'eat')).toEqual(
        'The cat ate the mouse!',
      )
      expect(fn(new Dog(), new Mouse(), 'eat')).toEqual(
        'The dog did not eat the mouse.',
      )
      expect(fn(new Dog(), new Cat(), 'eat')).toEqual(
        'The dog did not eat the cat.',
      )
      expect(fn(new Dog(), new Cat(), 'play with the ball')).toEqual(
        'Having fun.',
      )
      expect(fn(new Dog(), new Cat(), 'read')).toEqual('They just stare.')
    })
  })

  describe('when case is an array of mixed cases and dispatch is chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        (animal1) => (animal2) => (action) => [animal1, animal2, action],
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
        method([Dog, Cat, /play/], 'Having fun.'),
        method([Dog, Cat, __], 'They just stare.'),
      )

      expect(fn(new Cat())(new Mouse())('eat')).toEqual(
        'The cat ate the mouse!',
      )
      expect(fn(new Dog())(new Mouse())('eat')).toEqual(
        'The dog did not eat the mouse.',
      )
      expect(fn(new Dog())(new Cat())('eat')).toEqual(
        'The dog did not eat the cat.',
      )
      expect(fn(new Dog())(new Cat())('play with the ball')).toEqual(
        'Having fun.',
      )
      expect(fn(new Dog())(new Cat())('read')).toEqual('They just stare.')
    })
  })

  describe('when methods are added they have natural priority order', () => {
    it('when added by `multi` - top to bottom', () => {
      const fn = multi(
        method((x) => x > 5, 'higher than 5'),
        method((x) => x > 3, 'higher than 3'),
      )

      expect(fn(9)).toEqual('higher than 5')
      expect(fn(4)).toEqual('higher than 3')
    })

    it('when extended by `fromMulti` - top to bottom, but all above old methods', () => {
      const baseFn = multi(
        method((x) => x > 5, 'higher than 5'),
        method((x) => x > 1, 'higher than 1'),
      )

      const fn = fromMulti(
        method((x) => x > 7, 'higher than 7'),
        method((x) => x > 3, 'higher than 3'),
      )(baseFn)

      expect(fn(9)).toEqual('higher than 7')
      expect(fn(4)).toEqual('higher than 3')
      expect(fn(2)).toEqual('higher than 1')
    })

    it('when added by `method` - above old methods', () => {
      const baseFn = multi(
        method((x) => x > 5, 'higher than 5'),
        method((x) => x > 1, 'higher than 1'),
      )

      const fn = method((x) => x > 7, 'higher than 7')(baseFn)

      expect(fn(9)).toEqual('higher than 7')
      expect(fn(6)).toEqual('higher than 5')
      expect(fn(2)).toEqual('higher than 1')
    })
  })
})

describe('fromMulti', () => {
  it('throws when no arguments are provided', () => {
    const base = multi((x) => x)

    const execute = () => fromMulti()(base)

    expect(execute).toThrowError(NoArgumentsError)
  })

  it('throws when wrong methods are provided', () => {
    const base = multi((x) => x)

    const execute = () => fromMulti(() => null)(base)

    expect(execute).toThrowError(NotMethodError)
  })

  it('throws when wrong multimethod is provided', () => {
    // @ts-ignore
    const execute = () => fromMulti(method(1, 1))(() => null)

    expect(execute).toThrowError(NotMultimethodError)
  })
})
