const fs = require('fs');
const chalk = require('chalk');

/**
 *  This function duplicates every file in a folder a given number of times,
 *  and returns a flattened array.
 *  i.e. ('/folder', 2) -> ['my-file.js','my-file.js','my-file2.js','my-file2.js']
 */
const getServerFiles = (filePath, expansionSize) => {
    return fs.readdirSync(filePath)
    .filter(file => {
        return file.indexOf('.js') > -1; // filter out any potential folders and non-js files.
    })
    .map(fileName => {
        // create and populate an array of length n as the return value for each element.
        const fileList = new Array(expansionSize).fill(fileName, 0, expansionSize);
        return fileList;
    })
    .reduce((pre, current, index, array) => {
        return [].concat.apply([], array); // Flatten array
    })
}

function sendMessagesTo (children) {
    children.forEach((child, index) => {
        let message = `This is a message for the ${index} index child.`;
        child.send({
            message,
            index
        });

        child.on('message', _onMessage);
    });
}

function throwError () {
    throw new Error(chalk.red("I'm sorry Dave, I'm afraid I can't do that"));
    process.exit(1);
}

const _onMessage = (message) => {
    console.log(message);
}

module.exports = {
    getServerFiles,
    sendMessagesTo,
    throwError
}