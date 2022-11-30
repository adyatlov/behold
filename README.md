behold
======

Kubernetes object viewer

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
@dyatlov.net/behold/1.1.1 darwin-x64 node-v18.8.0
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

_See code: [dist/commands/csv.ts](https://github.com/adyatlov/behold/blob/v1.1.1/dist/commands/csv.ts)_
<!-- commandsstop -->
