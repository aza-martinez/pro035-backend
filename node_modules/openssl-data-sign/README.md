# openssl-data-sign

OpenSSL Data Sign
=========

A small library that will sign data using key/certs

## Installation

  `npm install openssl-data-sign`

## Usage

    var OpenSSLDataSign = require('openssl-data-sign');

    var someData = 'This is the data to be signed';
    var myKey = path.normalize(__dirname + '/some.ssl.key');
    var myCert = path.normalize(__dirname + '/some.ssl.crt');
    var myCa = path.normalize(__dirname + '/some.chain.crt');

    var signedData = OpenSSLDataSign.sign({data: someData, key: myKey, cert: myCert, ca: myCa});



## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.