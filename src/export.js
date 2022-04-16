
import { Command } from 'commander';
const program = new Command();

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')

    program.parse(process.argv);

const gendiff = () => {
    const res = 'result'
    return res;
};
export default gendiff;