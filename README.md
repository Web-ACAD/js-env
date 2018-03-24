[![NPM version](https://img.shields.io/npm/v/@webacad/env.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/env)
[![Build Status](https://img.shields.io/travis/Web-ACAD/js-env.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/js-env)

# WebACAD/Env

.env file loader written in typescript

## Installation

```bash
$ npm install --save @webacad/env
```

or with yarn

```bash
$ yarn add @webacad/env
```

## Usage

```typescript
import {loadEnv} from '@webacad/env';

const env = loadEnv('path/to/.env');
```

## Load env with schema

By default all values are returned as strings. This can be changed by providing schema where you can define returned types.

**Allowed types:**

* `string`
* `number`
* `boolean`

```typescript
import {loadEnv} from '@webacad/env';

const env = loadEnv('path/to/.env', {
    NODE_ENV: 'string',
    SERVER_PORT: 'number',
    SOURCE_MAPS: 'boolean',
});
```
