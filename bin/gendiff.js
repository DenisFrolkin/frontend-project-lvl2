#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import chooseFormatter from '../formatters/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const formatName = chooseFormatter(options.format);
    console.log(gendiff(filepath1, filepath2, formatName));
    return gendiff(filepath1, filepath2, formatName);
  });

program.parse(process.argv);
