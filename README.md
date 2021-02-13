# gendiff

[![CI](https://github.com/AlexCarp/frontend-project-lvl2/workflows/CI/badge.svg)](https://github.com/AlexCarp/frontend-project-lvl2/actions?query=workflow%3ACI)
[![Hexlet check](https://github.com/AlexCarp/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AlexCarp/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f79318ce9424b55becc/maintainability)](https://codeclimate.com/github/AlexCarp/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f79318ce9424b55becc/test_coverage)](https://codeclimate.com/github/AlexCarp/frontend-project-lvl2/test_coverage)

Command line utility for comparing `.json` or `.yml` files.

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

Compares two configuration files and shows a difference. Files with JSON and YAML files are supported.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

## Comparing JSON files with `stylish` (default) output format
[![asciicast](https://asciinema.org/a/HaD2zlH7fURU081cOYl3Nubt2.svg)](https://asciinema.org/a/HaD2zlH7fURU081cOYl3Nubt2)

## Comparing JSON files with `plain` output format
[![asciicast](https://asciinema.org/a/kC2dNnuDTLVaqEztoOToMwJ6m.svg)](https://asciinema.org/a/kC2dNnuDTLVaqEztoOToMwJ6m)

## Comparing JSON files with `json` output format
[![asciicast](https://asciinema.org/a/BZLIv3y2h5frOrqwYIF0i3TNF.svg)](https://asciinema.org/a/BZLIv3y2h5frOrqwYIF0i3TNF)

## Comparing YAML files with default output format
[![asciicast](https://asciinema.org/a/GYx1YPBX3dMKl3ZDomlKCmJoj.svg)](https://asciinema.org/a/GYx1YPBX3dMKl3ZDomlKCmJoj)


