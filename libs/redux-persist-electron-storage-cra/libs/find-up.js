import path from 'path';
import locatePath, { sync as locatePathSync } from './locate-path';

export default (filename, opts = {}) => {
  const startDir = path.resolve(opts.cwd || '');
  const { root } = path.parse(startDir);

  const filenames = [].concat(filename);

  return new Promise(resolve => { // eslint-disable-line
    (function find(dir) {
      locatePath(filenames, { cwd: dir }).then(file => {
        if (file) {
          resolve(path.join(dir, file));
        } else if (dir === root) {
          resolve(null);
        } else {
          find(path.dirname(dir));
        }
      });
    })(startDir);
  });
};

export const sync = (filename, opts = {}) => {
  let dir = path.resolve(opts.cwd || '');
  const { root } = path.parse(dir);

  const filenames = [].concat(filename);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const file = locatePathSync(filenames, { cwd: dir });

    if (file) {
      return path.join(dir, file);
    }

    if (dir === root) {
      return null;
    }

    dir = path.dirname(dir);
  }
};
