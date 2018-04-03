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

```typescript
import {loadEnv} from '@webacad/env';

const env = loadEnv('path/to/.env', {
    NODE_ENV: {
    	type: 'string',
    	required: true,
    },
    SERVER_PORT: {
    	type: 'number',
    },
    SOURCE_MAPS: {
    	type: 'boolean',
    },
});
```

**Options:**

* `type`: `"string"`, `"number"` or `"boolean"` (default: `"string"`)
* `required`: `boolean` (default: `false`)

**Allowed types:**

* `string`
* `number`
* `boolean`
