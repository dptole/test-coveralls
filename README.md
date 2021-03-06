Test coveralls
==============

  [![Build status][travis-ci-badge]][travis-ci]
  [![Coverage Status][coveralls-badge]][coveralls]
  [![Issue status][gh-issues-badge]][gh-issues]
  [![Say thanks][saythanks-badge]][saythanks-to]

I've created this repo to try and implement the most basic `test (mocha) -> build (travis) -> code coverage (coveralls)` flow possible so that I could use it in real projects in the future. Code coverage is very important if you want your builds to be more stable and reason about your code in ways you hadn't, but it should not be considered a silver bullet. You can always do better.

Lessons learned
===============

- [Code coverage][code-coverage-url] helps devs increase the stability of production code.
- Companies will run from it like the devil.

How to
======

The file `index.js` contains random code pretending to be an actual application with lots of functionalities. You will probably need to expose most of your functions or at least make sure that there is a way to hit all lines of the hidden functions.

The big 3 building blocks are:

- `Tests`
- `Travis`
- `Coveralls`

## Tests

In order to have code coverage in your repo you need to have [integration tests][it-url] implemented.

> Your tests should not send HTTP requests to a local server. By doing so you are not testing files in the eyes of code coverage, you are only sending HTTP requests.

### Tests setup

In this repo I used [mocha][mocha-url] and [should][should-url] to run my tests.

```shellscript
npm i -D mocha should
```

Inside the `test/app/` folder I created one test file for each function exported by `index.js`: sum, subtract, multiply and divide. Every function has a exception case for which tests were also created.

## [Travis][travis-url]

You must log in to travis, give it some permissions so that it can be notified of your commits and run the builds (that can be revoked [here][revoke-application-permission-url] (change the username)).

After that you need to activate CI for a given repo. In my case I had to go [here][travis-ci-activate-repo] (change the username).

I'd recommend changing the default configuration, [here][travis-ci-settings-repo] (change the username), switching `Build only if .travis.yml is present` from `OFF` to `ON`. Maybe you should set `Build pushed pull requests` to `OFF` depending on your projects' needs.

### Travis config `.travis.yml`

I'm very much a beginner on travis, so I used the most basic travis configs that made sense for my test project. The current config is:

```yaml
language: node_js
node_js:
  - "8.9"
before_install:
  - npm i -D
script:
  - npm run test-ci
after_script:
  - npm i coveralls@3.0.1
  - cat ./coverage/lcov.info | coveralls

```

Where

- `language:` Just refers to the programming language which your project was built.
- `node_js:` Here you could specify more than one version of the language. By using Nodejs Travis uses [nvm][nvm-url], install and uses Nodejs version `8.9`.
- `before_install:` This command is run before `npm install`, which would download the dependencies for my project. Luckly I don't have any dependency, just dev dependencies that are installed using `npm i -D`. The dev dependencies will install `mocha` and `should`.
- `script:` Here I have the list of shell commands that will actually run my integration tests and generate the [lcov][lcov-url] file. The command `npm run test-ci` will actually run `./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha --report lcovonly -- --recursive -b -t 30000 --check-leaks` (can be found in `package.json`).
  - This command will be divided into 2 parts:
    - `./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha --report lcovonly`
      - istanbul will run the code coverage using the command  `_mocha`, which will automatically run my tests because there is a folder named `test`. I passed the option `--report lcovonly` so that istanbul generates the `coverage/lcov.info` file too.
    - `--recursive -b -t 30000 --check-leaks`
      - These are the arguments sent to `./node_modules/.bin/_mocha`.
        - `--recursive` Search for `*.js` inside of `test/` and its subfolders. This is used to better organize the tests.
        - `-b` Stop the integration tests as soon as an error is encountered. The default behavior for mocha is to run all the tests and then display the errors, exiting with a non-zero error code.
        - `-t 30000` This tells mocha to wait 30 seconds before exiting with a timeout error. This gives more time for my tests to run. The default timeout is just 2 seconds.
        - `--check-leaks` Check for global variable leaks. Sometimes we forget unused variables while coding.
- `after_script:` If all tests passed istanbul will generate a folder `coverage/` with some information that will be used later on.
  - `npm i coveralls@3.0.1` This command will install coveralls in the travis VM.
  - `cat ./coverage/lcov.info | coveralls`. Asks coveralls to analyze the tests code coverage using the file `lcov.info` generated by istanbul.

## [Coveralls][coveralls-url]

You must log in to [coveralls][coveralls-url], giving it some permissions so that it can list your repos, for activation, and run the code analysis

After that you must also activate the repo on which the code coverage will be run. You can do so [here][coveralls-add-repo-url]. By using coveralls together with travis you don't need any further configuration for this to work.

Docs
====

## Coveralls

https://docs.coveralls.io/javascript

## Travis

https://docs.travis-ci.com/user/customizing-the-build/

## Mocha

https://mochajs.org/

## Should

https://shouldjs.github.io/

EOF
===

Try on your own, don't copy this repo. The best way to learn is to fill the gaps in your mind between the eternal state of confusion and the understanding of a given topic possible. More often than not my gaps are not the same as your gaps and the questions you will have to ask yourself would never occur to me.

Good luck! ;)

License
=======

  [MIT][LICENSE]

[travis-url]: https://travis-ci.org/
[travis-ci]: https://travis-ci.org/dptole/test-coveralls/builds
[travis-ci-badge]: https://img.shields.io/travis/dptole/test-coveralls.svg
[travis-ci-activate-repo]: https://travis-ci.org/profile/dptole
[travis-ci-settings-repo]: https://travis-ci.org/dptole/test-coveralls/settings

[circle-ci-badge]: https://img.shields.io/circleci/project/dptole/fakeimg.svg

[gh-issues]: https://github.com/dptole/test-coveralls/issues
[gh-issues-badge]: https://img.shields.io/github/issues-raw/dptole/test-coveralls.svg

[saythanks-badge]: https://img.shields.io/badge/say%20thanks-%E3%83%84-44cc11.svg
[saythanks-to]: https://saythanks.io/to/dptole

[mocha-url]: https://www.npmjs.com/package/mocha

[should-url]: https://www.npmjs.com/package/should

[revoke-application-permission-url]: https://github.com/settings/applications

[nvm-url]: https://github.com/creationix/nvm

[lcov-url]: https://github.com/linux-test-project/lcov

[coveralls-badge]: https://coveralls.io/repos/github/dptole/test-coveralls/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/dptole/test-coveralls?branch=master
[coveralls-url]: https://coveralls.io/
[coveralls-add-repo-url]: https://coveralls.io/repos/new

[it-url]: https://en.wikipedia.org/wiki/Integration_testing

[LICENSE]: LICENSE

[code-coverage-url]: https://en.wikipedia.org/wiki/Code_coverage
