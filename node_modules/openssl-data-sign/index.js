'use strict';
const util = require('util');
const spawn = require('child_process').spawn;

/**
 * sign data using openssl
 * @param {object} options Options
 * @param {string} options.data The data to be encrypted
 * @param {string} options.key Key path
 * @param {string} options.cert Cert path
 * @param {string} options.ca CA Cert path
 * @return {string}
 */
module.exports.sign = function(options) {
  return new Promise(function (resolve, reject) {
    options = options || {};

    if (!options.data)
      throw new Error('Invalid data.');

    if (!options.key)
      throw new Error('Invalid key.');

    if (!options.cert)
      throw new Error('Invalid certificate.');

    if (!options.ca)
      throw new Error('Invalid ca.');

    let command = util.format(
      'openssl smime -sign -inkey %s -signer %s -certfile %s -outform der -nodetach',
      options.key,
      options.cert,
      options.ca
    );

    let args = command.split(' ');
    let childProcess = spawn(args[0], args.splice(1));

    let signedData = [];

    childProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    childProcess.stdout.on('data', function (chunk) {
      signedData.push(chunk);
    });

    childProcess.on('close', function (code) {
      childProcess.kill();
      if (code !== 0)
        reject(new Error('Process failed.'));
      else
        resolve(Buffer.concat(signedData));
    });

    childProcess.stdin.write(options.data);
    childProcess.stdin.end();
  });
};