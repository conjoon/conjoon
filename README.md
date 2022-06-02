<p align="center">
  <img src="http://www.conjoon.org/img/conjoon_large.png" alt="conjoon" width="200" />
</p>
<h1 align="center"> conjoon</h1>
<p align="center">
<img src="https://img.shields.io/npm/l/@conjoon/conjoon" alt="MIT" />
<img src="https://badge.fury.io/js/@conjoon%2Fconjoon.svg" alt="MIT" />
<img src="https://github.com/conjoon/conjoon/actions/workflows/create.release.yml/badge.svg" />
</p>
<p align="center">
  ⚡ lightweight, feature rich <b>open source JavaScript email client</b>.
<br />
💅 <b>SOA</b> with <b>clear separation</b> between the frontend and the backend
<br />
🍋 <b>easy to install</b> and to configure.
<br />
👨‍🏫 <b>well documented APIs</b> makes it <b>easy to extend</b> and adopt functionality.
</p>

![conjoon](http://www.conjoon.org/img/screens/3.png) 

## Quick Start ⏱ 

Install [Node.js](https://nodejs.org/en/download) and create a new **conjoon** site:

```bash
npx create-conjoon@latest target_folder
```

Follow the instructions on screen.


```bash
cd target_folder
npm run stage
```

Your site starts at `http://localhost:9001` with a production build of **conjoon**.


## Features 🎁

The Frontend is a **highly extendable and configurable** JavaScript application **requiring only a webserver capable of serving static files**

The UI is able to manage **multiple email accounts** at once - no switching between instances required

The Backend is an **easy to install** [Lumen/Laravel](https://lumen.laravel.com/.org) application

IMAP / SMTP protocol implementations for **all relevant** email operations

[REST API documentation](/docs/rest-api/overview) available as OpenAPI documentation


<p align="center">

<b>Tested</b> with the most <b>popular free email services</b>
<br /><br />
<img src="http://www.conjoon.org/img/logos/gmail.svg" alt="AOL" style="width:80px;margin:0 40px 0 0" />
<img src="http://www.conjoon.org/img/logos/outlook.svg" alt="outlook.com"  style="width:80px;margin:0 40px 0 0"  />
<img src="http://www.conjoon.org/img/logos/aol.svg" alt="aol.com"  style="width:80px;margin:0 40px 0 0"  />
<img src="http://www.conjoon.org/img/logos/yahoomail.svg" alt="yahoo.com"  style="width:80px;margin:0 40px 0 0"  />
<img src="http://www.conjoon.org/img/logos/freenet.svg" alt="freenet.de" style="width:80px;margin:0 40px 0 0"  />
<img src="http://www.conjoon.org/img/logos/gmx.svg" alt="gmx.net" style="width:80px;margin:0 40px 0 0"  />
<img src="http://www.conjoon.org/img/logos/webde.svg" alt="web.de"  style="width:80px;margin:0 40px 0 0"  />
</p>

**conjoon** is released under the [MIT license](https://github.com/conjoon/conjoon/blob/main/LICENSE.txt).


## Installation

Please see the [documentation](https://conjoon.org/docs) at [conjoon.org](https://conjoon.org).

## Available backends for Production

### lumen-app-email
  * [lumen-app-email](https://github.com/conjoon/lumen-app-email) <br />
**lumen-app-email** is a microservice that provides a [Lumen/ddev](https://lumen.laravel.com) application with access
    to the [rest-imap/rest-imapuser](https://github.com/conjoon/rest-api-description) API for IMAP servers. It can
    be used as a standalone server.

For more information on available backends and how to use them with **conjoon**, see our [backend guide](https://conjoon.org/backends/overview).

## Staying informed 📰

- [GitHub](https://github.com/conjoon/conjoon)
- [Twitter](https://twitter.com/conjoon)