#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
.version('1.0.0', '-V', '--version', 'output the version number')
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.option('-f, --FormData<type>')

program.parse(process.argv);