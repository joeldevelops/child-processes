'use strict';

const cmd = require('child_process');
const utils = require('../utils/general-utils');
const argv = require('yargs')
                .option('count', {
                    number: true,
                    default: 2
                }).argv;

const instanceCount = argv.count || 2;

utils
.getServerFiles('./servers', instanceCount)
.forEach(server => {
    cmd.exec(`start cmd.exe /K node ./servers/${server}`);
});