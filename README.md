# gendiff

[![CI](https://github.com/AlexCarp/frontend-project-lvl2/workflows/CI/badge.svg)](https://github.com/AlexCarp/frontend-project-lvl2/actions?query=workflow%3ACI)
[![Hexlet check](https://github.com/AlexCarp/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AlexCarp/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f79318ce9424b55becc/maintainability)](https://codeclimate.com/github/AlexCarp/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f79318ce9424b55becc/test_coverage)](https://codeclimate.com/github/AlexCarp/frontend-project-lvl2/test_coverage)

Command line utility for comparing `.json` or `.yml` files.

[![asciicast](https://asciinema.org/a/qLQFJTvSkdmI5JeoLWRJBa5F4.svg)](https://asciinema.org/a/qLQFJTvSkdmI5JeoLWRJBa5F4)

# Setup
To install dependencies run: 
```
make install
```
To install package locally use:
```
npm link
```
# Usage
To get difference between two json files run: 
```
gendiff path/to/file/a.json path/to/file/b.json 
```
To get more information run:
```
% gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```

