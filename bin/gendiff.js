#!/usr/bin/env node
import { Command } from 'commander';

const command = new Command();

command
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

command.parse();