# @conjoon/conjoon ![MIT](https://img.shields.io/npm/l/@conjoon/conjoon) [![npm version](https://badge.fury.io/js/@conjoon%2Fconjoon.svg)](https://badge.fury.io/js/@conjoon%2Fconjoon)

This is the backplate application for the [conjoon](https://github.com/conjoon)-project and serves as the main container
for its modules and plugins.<br>
It is a hybrid JavaScript-Application built for the web  with the help of [Sencha ExtJS](https://sencha.com),
[l8js](https://github.com/l8js), [coon.js](https://github.com/coon-js) and the packages of [the conjoon project](https://github.com/conjoon).

<br>![conjoon](http://www.conjoon.org/screen.png) <br>

[Site](https://conjoon.org) | [Twitter](https://twitter.com/ThorstenSuckow) 


**conjoon** is released under the [MIT license](https://github.com/conjoon/conjoon/blob/main/LICENSE.txt).


## Installation

### Accessing Sencha's NPM Repository
You need access to the [NPM registry of Sencha](https://npm.sencha.com/) in order to properly install all of conjoon's dependencies.

```shell
$ npm login --registry=https://npm.sencha.com/ --scope=@sencha
```
**Note:**
Your email-address is your username when logging in, but you have to replace the `@` with two dots `..`.
Example: `myname@domain.tld` becomes `myname..domain.tld`.

For more information on how to access the Sencha NPM Repository, refer to [the official guide](https://docs.sencha.com/extjs/7.4.0/guides/using_systems/using_npm/npm_repo_access.html).

### Dev Build

```shell
$ git clone https://github.com/conjoon/conjoon
$ cd conjoon
$ npm i 
```

## Usage

Development Build w/ integrated webserver and mocked backend:
```shell
$ npm start
```

Production Build:
```shell
$ npm run build
```

Production Build w/ integrated webserver for preview:
```shell
$ npm run build:preview
```


## Available backends for Production

### php-ms-imapuser
  * [php-ms-imapuser](https://github.com/conjoon/php-ms-imapuser) <br>
php-ms-imapuser is a microservice that provides a [Lumen/ddev](https://lumen.laravel.com)-container with access
    to the [rest-imap/rest-imapuser](https://github.com/conjoon/rest-api-description) API for IMAP servers. It can
    be used as a standalone server.

