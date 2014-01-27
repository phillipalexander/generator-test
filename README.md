# generator-test

A simple generator for [Yeoman](http://yeoman.io) that makes it easy to start using Test Driven Development (TDD) while you karate-chop your way through algorthim-based programming challenges.


## Getting Started

This generator creates a simple mocha/chai TDD scaffold for your algorithm solution in the following format:

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

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-test from npm, run:

```
$ npm install -g generator-test
```

Finally, initiate the generator:

```
$ yo test
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
