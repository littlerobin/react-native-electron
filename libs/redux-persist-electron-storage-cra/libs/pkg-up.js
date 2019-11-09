import findUp, { sync as findUpSync } from './find-up';

export const sync = cwd => findUpSync('package.json', { cwd });
const pkgUp = cwd => findUp('package.json', { cwd });

export default pkgUp;
