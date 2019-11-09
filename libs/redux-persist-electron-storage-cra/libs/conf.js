// @flow
import 'babel-polyfill';

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import assert from 'assert';
import EventEmitter from 'events';
import dotProp from './dot-prop';
import { sync as makeDirSync } from './make-dir';
import { sync as pkgUpSync } from './pkg-up';
import envPaths from './env-paths';
import { writeFileSync } from './write-file-atomic';

const plainObject = () => Object.create(null);

// Prevent caching of this module so module.parent is always accurate
delete require.cache[__filename];
const parentDir =
  (require('electron').app || require('electron').remote.app).getAppPath();

type Params = string | Object;
class Conf {
  events: EventEmitter;
  encryptionKey: string;
  path: string;
  
  constructor(options: Object) {
    const pkgPath = pkgUpSync(parentDir);

    options = Object.assign(
      {
        // Can't use `require` because of Webpack being annoying:
        // https://github.com/webpack/webpack/issues/196
        projectName:
          (pkgPath && JSON.parse(fs.readFileSync(pkgPath, 'utf8')).name),
      },
      options,
    );

    if (!options.projectName && !options.cwd) {
      const errMessage = 'Project name could not be inferred. Please specify the `projectName` option.';
      throw new Error(errMessage);
    }

    options = Object.assign(
      {
        configName: 'config',
        fileExtension: 'json',
      },
      options,
    );

    if (!options.cwd) {
      options.cwd = envPaths(options.projectName).config;
    }

    this.events = new EventEmitter();
    this.encryptionKey = options.encryptionKey;
    this.path = path.resolve(
      options.cwd,
      `${options.configName}.${options.fileExtension}`,
    );

    const fileStore = this.store;
    const store = Object.assign(plainObject(), options.defaults, fileStore);
    try {
      assert.deepEqual(fileStore, store);
    } catch (e) {
      this.store = store;
    }
  }

  get(key: Params, defaultValue: any) {
    return dotProp.get(this.store, key, defaultValue);
  }

  set(key: Params, value: any) {
    if (typeof key !== 'string' && typeof key !== 'object') {
      throw new TypeError(
        `Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`,
      );
    }

    if (typeof key !== 'object' && value === undefined) {
      throw new TypeError('Use `delete()` to clear values');
    }

    const { store } = this;

    if (typeof key === 'object') {
      for (const k of Object.keys(key)) {
        dotProp.set(store, k, key[k]);
      }
    } else {
      dotProp.set(store, key, value);
    }

    this.store = store;
  }

  has(key: Params) {
    return dotProp.has(this.store, key);
  }

  delete(key: Params) {
    const { store } = this;
    dotProp.delete(store, key);
    this.store = store;
  }

  clear() {
    this.store = plainObject();
  }

  onDidChange(key: Params, callback: Function) {
    if (typeof key !== 'string') {
      throw new TypeError(
        `Expected \`key\` to be of type \`string\`, got ${typeof key}`,
      );
    }

    if (typeof callback !== 'function') {
      throw new TypeError(
        `Expected \`callback\` to be of type \`function\`, got ${typeof callback}`,
      );
    }

    let currentValue = this.get(key);

    const onChange = () => {
      const oldValue = currentValue;
      const newValue = this.get(key);

      try {
        // TODO: Use `util.isDeepStrictEqual` when targeting Node.js 10
        assert.deepEqual(newValue, oldValue);
      } catch (_) {
        currentValue = newValue;
        callback.call(this, newValue, oldValue);
      }
    };

    this.events.on('change', onChange);
    return () => this.events.removeListener('change', onChange);
  }

  get size() {
    return Object.keys(this.store).length;
  }

  get store() {
    try {
      // $FlowFixMe
      let data: any = fs.readFileSync(
        this.path,
        this.encryptionKey ? null : 'utf8',
      );

      if (this.encryptionKey) {
        try {
          const decipher = crypto.createDecipher(
            'aes-256-cbc',
            this.encryptionKey,
          );
          data = Buffer.concat([decipher.update(data), decipher.final()]);
        } catch (_) {
          /**/
        }
      }

      return Object.assign(plainObject(), JSON.parse(data));
    } catch (error) {
      if (error.code === 'ENOENT') {
        makeDirSync(path.dirname(this.path));
        return plainObject();
      }

      if (error.name === 'SyntaxError') {
        return plainObject();
      }

      throw error;
    }
  }

  set store(value: Params) {
    // Ensure the directory exists as it could have been deleted in the meantime
    makeDirSync(path.dirname(this.path));

    let data = JSON.stringify(value, null, '\t');

    if (this.encryptionKey) {
      const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
      data = Buffer.concat([cipher.update(Buffer.from(data)), cipher.final()]);
    }

    writeFileSync(this.path, data);
    this.events.emit('change');
  }

  // TODO: Use `Object.entries()` when targeting Node.js 8
  /* $FlowFixMe */
  *[Symbol.iterator]() { // eslint-disable-line
    const { store } = this;

    for (const key of Object.keys(store)) {
      yield [key, store[key]];
    }
  }
}

export default Conf;
