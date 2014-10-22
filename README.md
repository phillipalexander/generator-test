# generator-test

A simple generator for [Yeoman](http://yeoman.io) that makes it easy to start writing [unit tests](http://en.wikipedia.org/wiki/Unit_testing) and use Test Driven Development (TDD) while you karate-chop your way through algorthim-based programming challenges.


## Introduction

### What's Yeoman?

From wikipedia:
> Yeoman is an open source client-side development stack, consisting of tools and frameworks intended to help developers quickly build high quality web applications. Yeoman runs as a command-line interface written in Node.js which combines several functions into one place, such as generating a starter template, managing dependencies, running unit tests, providing a local development server, and optimizing production code for deployment.

### Generators

After installing Yeoman, you'll use generators to scaffold out specific types of applications. A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts. Examining the architechtures that popular (well-built) generators produce is a fantastic way to learn how well-established software engineers think about structuring their applications. There are generators that help you scaffold out applications built in [Angular](https://github.com/DaftMonk/generator-angular-fullstack), [Backbone](https://github.com/yeoman/generator-backbone), as [Chrome Extentions](https://github.com/yeoman/generator-chrome-extension), and pretty much [anything else you can imagine](http://yeoman.io/generators/).

## Installation

### Yeoman


This generator is built using Yeoman, so you'll need to install that first with,

```
$ npm install -g yo
```

### Generator-Test


After installing Yeoman, install generator-test from npm:

```
$ npm install -g generator-test
```

cd to (or create) your project directory, then initiate the generator:

```
$ yo test
```

### Usage

This genertor can build tests for/around JavaScript designed to be run in the browser, or code meant to be run using Node.js. It creates a simple mocha/chai TDD scaffold for your algorithm solution in the following general format:

```
solution
├── bower.json
├── bower_components
│   ├── chai
│   └── mocha
├── index.html
├── package.json
├── spec
│   └── algorithm.js
└── algorithm.js
```

If the current working directory already contains any JavaScript files, then you'll be asked which of them you wish to write tests for. If there are no js files present, a starter file will be generated for you.

After runnning the generator (see below), open `index.html`. Write your tests in the file created in the `/spec` dir, and your algorithm in the file in the current dir.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
