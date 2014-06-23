## funkify

To thunkify an individual function you can use [thunkify](https://www.npmjs.org/package/thunkify).

What if you want to easily thunkify all the functions of a module or other object? 

One popular solution I tried was [thunkify-wrap](https://www.npmjs.org/package/thunkify-wrap). It modifies the original object, overwriting its functions with the thunkified replacements. This could break some libraries if one exported function calls another. Also makes it difficult to keep the original object so you can opt to directly call the non-thunkified functions when you need to. Also it doesn't deal correctly with functions that have function properties of their own. e.g. [request](https://www.npmjs.org/package/request).

So I created funkify to avoid these issues. It always returns a new object, leaving the original untouched. Also it deals with modules that are really just functions with their own function properties.

## Installation

[![NPM](https://nodei.co/npm/funkify.png)](https://nodei.co/npm/funkify/)

## Usage

```javascript
var funkify = require('funkify');

// request() and request.post() get wrapped
var request = funkify(require('request'));

// redis client gets wrapped
var redis = funkify(require('redis').createClient());

// in a generator
var myListLength = yield redis.llen('myList');
```