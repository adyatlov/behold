oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @dyatlov.net/behold
$ behold COMMAND
running command...
$ behold (--version)
@dyatlov.net/behold/1.0.0 darwin-x64 node-v18.8.0
$ behold --help [COMMAND]
USAGE
  $ behold COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`behold csv`](#behold-csv)

## `behold csv`

represents kubernetes objects in CSV format.

```
USAGE
  $ behold csv [-d <value>]

FLAGS
  -d, --dir=<value>  [default: ./] directory with the diagnostics bundle

DESCRIPTION
  represents kubernetes objects in CSV format.

EXAMPLES
  $ behold csv
```

_See code: [dist/commands/csv.ts](https://github.com/adyatlov/behold/blob/v1.0.0/dist/commands/csv.ts)_
<!-- commandsstop -->
