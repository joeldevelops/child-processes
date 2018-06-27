'use strict';

const child_process = require('child_process');
const utils = require('../utils/general-utils');
const argv = require('yargs')
                .option('count', {
                    number: true,
                    default: 2
                }).argv;

const instanceCount = argv.count || 2;

let processes = [];


utils
.getServerFiles('./managed-servers', instanceCount)
.forEach(server => {
    processes.push(child_process.fork(`./managed-servers/${server}`));
});

setTimeout(utils.sendMessagesTo, 2000, processes);

setTimeout(utils.throwError, 5000);