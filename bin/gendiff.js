#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', stylish, stylish)
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options.format))
    return gendiff(filepath1, filepath2, options.format)
  });

program.parse(process.argv);
