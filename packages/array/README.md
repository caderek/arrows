![arrows - array](https://raw.githubusercontent.com/caderek/arrows/master/assets/arrows-array.svg)

# Arrows - array

![npm (scoped)](https://img.shields.io/npm/v/@arrows/array)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Farray)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/array)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API reference](#api-reference)
4. [License](#license)

## Introduction

The purpose of the library is to provide functional wrappers for `Array.prototype methods` and provide some additional functions for common tasks.

All wrappers try to mimic original methods as close as possible while providing composable, auto-curried versions of the array methods. One exception is that all functions do not mutate the input arrays (even `sort`, `reverse`, etc.).

For convenience, some functions have additional methods to execute the most common use cases of the function. For example - `sort` function, in addition to the generic form, contains also static methods (that are also auto-curried, pure functions) like `sort.num`, `sort.numDesc`, etc.

Functions that do not have a native equivalent contain `_` suffix. That way we can implement native-like version in the future (if an equivalent method will be added to the language), without potentially breaking backward-compatibility of the library.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/array
```

Via Yarn:

```sh
yarn add @arrows/array
```

All modules can be imported independently (to reduce bundle size), here are some import methods (you can use either CommonJS or ES modules):

```js
import arr from '@arrows/array'
```

```js
import { filter } from '@arrows/array'
```

```js
import filter from '@arrows/array/filter'
```

## API reference

### Index

- [append\_](#append_)
- [butLast\_](#butlast_)
- [clear\_](#clear_)
- [concat](#concat)
- [entries](#entries)
- [every](#every)
- [fill](#fill)
- [fill.all](#fillall)
- [fill.end](#fillend)
- [fill.start](#fillstart)
- [filter](#filter)
- [filterNot\_](#filternot_)
- [find](#find)
- [findIndex](#findindex)
- [first\_](#first_)
- [flat](#flat)
- [flat.one](#flatone)
- [flatMap](#flatmap)
- [forEach](#foreach)
- [get\_](#get_)
- [groupBy\_](#groupby_)
- [has\_](#has_)
- [includes](#includes)
- [indexOf](#indexof)
- [indexOf.all](#indexofall)
- [insert\_](#insert_)
- [join](#join)
- [keys](#keys)
- [last\_](#last_)
- [lastIndexOf](#lastindexof)
- [lastIndexOf.all](#lastindexofall)
- [map](#map)
- [prepend\_](#prepend_)
- [range\_](#range_)
- [reduce](#reduce)
- [reduce.first](#reducefirst)
- [reduceRight](#reduceright)
- [reduceRight.first](#reducerightfirst)
- [remove\_](#remove_)
- [rest\_](#rest_)
- [reverse](#reverse)
- [set\_](#set_)
- [setSize\_](#setsize_)
- [size\_](#size_)
- [slice](#slice)
- [slice.from](#slicefrom)
- [slice.to](#sliceto)
- [some](#some)
- [sort](#sort)
- [sort.num](#sortnum)
- [sort.numDesc](#sortnumdesc)
- [sort.str](#sortstr)
- [sort.strDesc](#sortstrdesc)
- [sort.locale](#sortlocale)
- [sort.localeDesc](#sortlocaledesc)
- [sortBy\_](#sortby_)
- [sortBy\_.num](#sortby_num)
- [sortBy\_.numDesc](#sortby_numdesc)
- [sortBy\_.str](#sortby_str)
- [sortBy\_.strDesc](#sortby_strdesc)
- [sortBy\_.locale](#sortby_locale)
- [sortBy\_.localeDesc](#sortby_localedesc)
- [toLocaleString](#tolocalestring)
- [toString](#tostring)
- [update\_](#update_)
- [values](#values)
- [zip\_](#zip_)
- [zip\_.all](#zip_all)
- [zipWith\_](#zipwith_)
- [zipWith\_.all](#zipwith_all)

### append\_

Adds a value at the end of the array.
Similar to Array.prototype.push, but immutable.

#### Parameters

- `value` Additional value
- `arr` Initial array

**Returns:** New array

### butLast\_

Creates a new array from the initial one, without the last element.

#### Parameters

- `arr` Initial array

**Returns:** New array

### clear\_

Creates a new, empty array.

#### Parameters

- `arr` Initial array

**Returns:** New array

### concat

Functional wrapper for Array.prototype.concat

Combines two arrays.
If the concatenated value is not an array, adds it as a last element.

#### Parameters

- `value` An array or single value to be concatenated
- `arr` Initial array

**Returns:** New array

### entries

Functional wrapper for Array.prototype.entries

Creates an iterable of index, value pairs for every entry in the array.

#### Parameters

- `arr` Initial array

**Returns:** Iterable of index-value pairs

### every

Functional wrapper for Array.prototype.every

Determines whether all the members of an array satisfy the specified test.

#### Parameters

- `testFn` Test function
- `arr` Initial array

**Returns:** True if all elements satisfy test function, false otherwise

### fill

Creates a new array with section identified by start and end index
filled with provided value.
Have built-in methods for common cases.

#### Parameters

- `startIndex` Start index (if undefined - fill from start)
- `endIndex` End index (if undefined - fill to the end)
- `value` Value with which selected section will be filled.
- `arr` Initial array

**Returns:** New array

### fill.all

Fill from the start to the end.

#### Parameters

- `value` Value with which selected section will be filled.
- `arr` Initial array

**Returns:** New array

### fill.end

Fill from the start to the specified index.

#### Parameters

- `endIndex` End index
- `value` Value with which selected section will be filled.
- `arr` Initial array

**Returns:** New array

### fill.start

Fill from the specified index to the end.

#### Parameters

- `startIndex` Start index
- `value` Value with which selected section will be filled.
- `arr` Initial array

**Returns:** New array

### filter

Functional wrapper for Array.prototype.filter

Creates a new array from the initial one, without the values
that does not meet the condition specified in a filtering function.

#### Parameters

- `fn` Filtering function
- `arr` Initial array

**Returns:** New array

### filterNot\_

Creates a new array from the initial one, without the values
that meet the condition specified in a filtering function.

It is useful when you have a ready-to-use filtering function,
that you want to pass as an argument, otherwise you would have
to manually wrap it in a function to negate its results.

#### Parameters

- `fn` Filtering function
- `arr` initial array

**Returns:** New array

### find

Functional wrapper for Array.prototype.find

Retrieves the value of the first element in the array
where predicate is true, and undefined otherwise.

#### Parameters

- `testFn` Test function
- `arr` Initial array

**Returns:** Item that matches predicate or undefined

### findIndex

Functional wrapper for Array.prototype.findIndex

Retrieves the index of the first element in the array
where predicate is true, and -1 otherwise.

#### Parameters

- `testFn` Test function
- `arr` Initial array

**Returns:** Index of the matching element or -1

### first\_

Retrieves the first element of the array.

#### Parameters

- `arr` Initial array

**Returns:** First element

### flat

Functional wrapper for Array.prototype.flat with custom depth

Creates a new array with all sub-array elements
concatenated into it recursively up to the specified depth.

#### Parameters

- `depth` Maximum recursion depth
- `arr` Initial array

**Returns:** New array

### flat.one

Version with default depth (1).

#### Parameters

- `arr` Initial array

**Returns:** New array

### flatMap

Functional wrapper for Array.prototype.flatMap

Calls a defined mapping function on each element of an array.
Then, flattens the result into a new array.
This is identical to a map followed by flat with depth 1.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### forEach

Functional wrapper for Array.prototype.forEach

Performs the specified side effect action for each element in an array.

#### Parameters

- `sideEffectFn` Side effect function
- `arr` Initial array

**Returns:** Nothing (undefined)

### get\_

Retrieves an element at the specific index.

#### Parameters

- `index` Specific index

**Returns:** Element at the specific index

### groupBy\_

Creates an object that groups array items
by field specified by grouping functions.

#### Parameters

- `groupingFn` Grouping function
- `arr` Initial array of objects

**Returns:** New array

### has\_

Determines whether an array has a certain index,
returning true or false as appropriate.

#### Parameters

- `index` Specific index
- `arr` Initial array

**Returns:** True if index exists, false otherwise

### includes

Determines whether an array includes a certain element,
returning true or false as appropriate.

#### Parameters

- `element` Searched element
- `arr` Initial array

**Returns:** True if element exists, false otherwise

### indexOf

Functional wrapper for Array.prototype.indexOf

Retrieves the index of the first occurrence of a value in an array.

#### Parameters

- `element` The value to locate in the array
- `fromIndex` The array index at which to begin the search
- `arr` Initial array

**Returns:** Index of the matching element or -1

### indexOf.all

Version with implicit fromIndex (0).

#### Parameters

- `element` The value to locate in the array
- `arr` Initial array

**Returns:** Index of the matching element or -1

### insert\_

Creates a new array with an additional value at the provided index.
Shifts old values to the right.
If the index is out of bound of the array - adds a value as a last element.

#### Parameters

- `value` Additional value
- `index` Specific index
- `arr` Initial array

**Returns:** New array

### join

Functional wrapper for Array.prototype.join

Adds all the elements of an array separated by the specified separator string.

#### Parameters

- `separator` Separator
- `arr` Initial array

**Returns:** String of joined array elements.

### keys

Functional wrapper for Array.prototype.keys

Returns an iterable of keys in the array

#### Parameters

- `arr` Initial array

**Returns:** Iterator

### last\_

Retrieves the last element of the array.

#### Parameters

- `arr` Initial array

**Returns:** Last element (undefined for an empty array)

### lastIndexOf

Functional wrapper for Array.prototype.lastIndexOf

Retrieves the index of the last occurrence of a specified value in an array.
The array is searched backwards, starting at fromIndex.

#### Parameters

- `element` The value to locate in the array
- `fromIndex` The array index at which to begin the search
- `arr` Initial array

**Returns:** Index of the matching element or -1

### lastIndexOf.all

Version with implicit fromIndex (arr.length - 1).

#### Parameters

- `element` The value to locate in the array
- `arr` Initial array

**Returns:** Index of the matching element or -1

### map

Functional wrapper for Array.prototype.map

Calls a defined mapping function on each element of an array,
and returns an array that contains the results.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### prepend\_

Adds a value at the beginning of the array.
Similar to Array.prototype.unshift, but immutable.

#### Parameters

- `value` Additional value
- `arr` Initial array

**Returns:** New array

### range\_

Creates an array of numbers in a provided range - ascending or descending.

#### Parameters

- `from` Starting number (included)
- `to` Ending number (excluded)
- `step` Step (must be greater than zero) (optional, default `1`)

**Returns:** Range array

### reduce

Functional wrapper for Array.prototype.reduce

Calls the specified reducing function for all the elements in an array.
The return value of the reducing function is the accumulated result,
and is provided as an argument in the next call to the reducing function.

#### Parameters

- `reducingFn` Reducing function
- `initialValue` Initial value of the accumulator
- `arr` Initial array

**Returns:** Final accumulator value

### reduce.first

Reduce without initializer.
The first element of the array will be used as an initial accumulator.

#### Parameters

- `reducingFn` Reducing function
- `arr` Initial array

**Returns:** Final accumulator value

### reduceRight

Functional wrapper for Array.prototype.reduceRight

Calls the specified callback function for all the elements in an array,
in descending order.
The return value of the reducing function is the accumulated result,
and is provided as an argument in the next call to the reducing function.

#### Parameters

- `reducingFn` Reducing function
- `initialValue` Initial value of the accumulator
- `arr` Initial array

**Returns:** Final accumulator value

### reduceRight.first

Reduce without initializer.
The last element of the array will be used as an initial accumulator.

#### Parameters

- `reducingFn` Reducing function
- `arr` Initial array

**Returns:** Final accumulator value

### remove\_

Creates a new array without an item at the provided index.

#### Parameters

- `index` Specific index
- `arr` Initial array

**Returns:** New array

### rest\_

Creates new array without the first element.

#### Parameters

- `arr` Initial array

**Returns:** New array

### reverse

Creates a new array with reversed elements.

#### Parameters

- `arr` Initial array

**Returns:** New array

### set\_

Creates a new array with a new value at the provided index.

If the index is out of bound of the array throws an error.

#### Parameters

- `value` New value
- `index` Specific index
- `arr` Initial array

**Returns:** New array

### setSize\_

Creates a new array trimmed/extended to a provided size.
If the new array is longer than the initial one,
additional indexes will be set to undefined.

#### Parameters

- `size` Required size
- `arr` Initial array

**Returns:** New array

### size\_

Retrieves the size (length) of the array.

#### Parameters

- `arr` Initial array

**Returns:** Array size (length)

### slice

Functional wrapper for Array.prototype.slice

Creates a new array as a a section of an initial array.

#### Parameters

- `from` The beginning of the specified portion of the array.
- `to` The end of the specified portion of the array.
- `arr` Initial array

**Returns:** New array

### slice.from

Version with implicit end index (arr.length).

#### Parameters

- `from` The beginning of the specified portion of the array.
- `arr` Initial array

**Returns:** New array

### slice.to

Version with implicit start index (0).

#### Parameters

- `to` The end of the specified portion of the array.
- `arr` Initial array

**Returns:** New array

### some

Functional wrapper for Array.prototype.some

Determines whether the specified test function
returns true for any element of an array.

#### Parameters

- `testFn` Test function
- `arr` Initial array

**Returns:** True if any element satisfies test function, false otherwise

### sort

Creates a new, sorted array.
Have built-in methods for sorting numerical and string arrays.

#### Parameters

- `compareFn` Compare function
- `arr` Initial array

**Returns:** New array

### sort.num

Sorts numerical arrays in an ascending order.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sort.numDesc

Sorts numerical arrays in a descending order.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sort.str

Sorts string arrays in an ascending order using comparison operators.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sort.strDesc

Sorts string arrays in a descending order using comparison operators.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sort.locale

Sorts string arrays in an ascending order using `String.prototype.localeCompare`.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sort.localeDesc

Sorts string arrays in a descending order using `String.prototype.localeCompare`.

#### Parameters

- `arr` Initial array

**Returns:** New array

### sortBy\_

Creates a new, sorted array.
Accepts mapping function that maps values before comparing
(mapping does not affect actual values of the array).
Have built-in methods for sorting numerical and alphabetical sorting.

#### Parameters

- `compareFn` Compare function
- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.num

Sorts numerical arrays in an ascending order.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.numDesc

Sorts numerical arrays in a descending order.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.str

Sorts string arrays in an ascending order using comparison operators.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.strDesc

Sorts string arrays in a descending order using comparison operators.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.locale

Sorts string arrays in an ascending order using `String.prototype.localeCompare`.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### sortBy\_.localeDesc

Sorts string arrays in a descending order using `String.prototype.localeCompare`.

#### Parameters

- `mappingFn` Mapping function
- `arr` Initial array

**Returns:** New array

### toLocaleString

Functional wrapper for Array.prototype.toLocaleString

Creates a string representation of an array.
The elements are converted to string using their toLocalString methods.

#### Parameters

- `arr` Initial array

**Returns:** String representation

### toString

Functional wrapper for Array.prototype.toString

Creates a string representation of an array.

#### Parameters

- `arr` Initial array

**Returns:** String representation

### update\_

Creates a new array with a new value at the provided index,
calculated by updater function that maps an old value into a new one.

If the index is out of bound of the array throws an error.

#### Parameters

- `value` New value
- `index` Specific index
- `arr` Initial array

**Returns:** New array

### values

Functional wrapper for Array.prototype.values

Creates an iterable of values in the array.

#### Parameters

- `arr` Initial array

**Returns:** Iterator

### zip\_

Zips two arrays creating an array of pairs
containing values on corresponding indexes.
Zips until the length of the shorter array is reached.

#### Parameters

- `otherArr` Array that you want to zip with initial array
- `arr` Initial array

**Returns:** New, zipped array

### zip\_.all

Zips until the length of the longer array is reached.

#### Parameters

- `otherArr` Array that you want to zip with initial array
- `arr` Initial array

**Returns:** New, zipped array

### zipWith\_

Zips two arrays producing new values with a zipping function,
that takes elements with the same indexes.
Zips until the length of the shorter array is reached.

#### Parameters

- `zippingFn` Zipping function
- `otherArr` Array that you want to zip with initial array
- `arr` Initial array

**Returns:** New, zipped array

### zipWith\_.all

Zips until the length of the longer array is reached.

#### Parameters

- `zippingFn` Zipping function
- `otherArr` Array that you want to zip with initial array
- `arr` Initial array

**Returns:** New, zipped array

## License

Project is under open, non-restrictive [ISC license](LICENSE).
