#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const command = new Command();

command
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference. Files with JSON and YAML files are supported.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

command.parse();
