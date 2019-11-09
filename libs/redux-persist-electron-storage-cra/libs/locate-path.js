import path from 'path';
import pathExists from 'path-exists';
import pLocate from './p-locate';

export default (iterable, options) => {
  options = Object.assign(
    {
      cwd: process.cwd(),
    },
    options,
  );

  return pLocate(
    iterable,
    el => pathExists(path.resolve(options.cwd, el)),
    options,
  );
};

export const sync = (iterable, options) => {
  options = Object.assign(
    {
      cwd: process.cwd(),
    },
    options,
  );

  for (const el of iterable) {
    if (pathExists.sync(path.resolve(options.cwd, el))) {
      return el;
    }
  }
};
