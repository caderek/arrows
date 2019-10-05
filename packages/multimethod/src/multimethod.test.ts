import * as curry from 'ramda.curry'
import method from './method'
import multi from './multi'

describe('multi', () => {
  describe('executed without any arguments', () => {
    it('creates multimethod that throws error: no matching method', () => {
      const fn = multi()
      expect(fn).toThrowError('No method specified for provided arguments')
    })

    it('sets default dispatcher as identity function', () => {
      const fn = multi()
      const fnWithMethod = method('hello', 'world')(fn)
      expect(fnWithMethod('hello')).toEqual('world')
    })
  })

  describe('executed with dispatch function only', () => {
    it('creates multimethod that throws error: no matching method', () => {
      const fn = multi(() => true)
      expect(fn).toThrowError('No method specified for provided arguments')
    })

    it('works also for chunked dispatch', () => {
      const fn = multi(() => () => true)
      expect(fn()).toThrowError('No method specified for provided arguments')
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
    })
  })

  describe('throws readable error when first argument is nether dispatch function nor partial method', () => {
    const createIncorrectMultimethod = () => {
      // @ts-ignore
      multi('oops')
    }
    expect(createIncorrectMultimethod).toThrowError(
      'First argument of multi must be either dispatch function or partially applied method',
    )
  })

  describe('throws readable error when other arguments are not partial methods', () => {
    const createIncorrectMultimethod = () => {
      // @ts-ignore
      multi((x) => x, 'oops')
    }
    expect(createIncorrectMultimethod).toThrowError(
      'Second or further argument of multi must be a partially applied method',
    )
  })
})

describe('method', () => {
  describe('when run separately', () => {
    it('creates new multimethod based on supplied one (with new method)', () => {
      const greet = multi((user) => user.lang, method('en', () => 'Hello!'))
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

      expect(execute).toThrowError('Function is not a multimethod')
    })
  })

  it('when only function is provided creates default method', () => {
    const multimethod = multi((x) => x, method(() => 'default'))

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

  describe('when case value is a function and dispatch is not chunked', () => {
    it('executes that function with initial arguments', () => {
      const multimethod = multi(
        method((a, b) => b === 1, 'one'),
        method((a, b) => b === 2, 'two'),
      )

      expect(multimethod(0, 1)).toEqual('one')
      expect(multimethod(0, 2)).toEqual('two')
    })
  })

  describe('when case value is a function and dispatch is chunked', () => {
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

  describe('when case value is a constructor and dispatch is not chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}

      const multimethod = multi(method(Cat, 'cat'), method(Dog, 'dog'))

      expect(multimethod(new Cat())).toEqual('cat')
      expect(multimethod(new Dog())).toEqual('dog')
    })
  })

  describe('when case value is a constructor and dispatch is chunked', () => {
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

  describe('when case value is an array of constructor | value and dispatch is not chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        (animal1, animal2, action) => [animal1, animal2, action],
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
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
    })
  })

  describe('when case value is an array of constructor | value and default dispatch', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
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
    })
  })

  describe('when case value is an array of constructor | value and dispatch is chunked', () => {
    it('matches the dispatch value with instanceof operator', () => {
      class Cat {}
      class Dog {}
      class Mouse {}

      const fn = multi(
        (animal1) => (animal2) => (action) => [animal1, animal2, action],
        method([Cat, Mouse, 'eat'], 'The cat ate the mouse!'),
        method([Dog, Mouse, 'eat'], 'The dog did not eat the mouse.'),
        method([Dog, Cat, 'eat'], 'The dog did not eat the cat.'),
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
    })
  })
})
