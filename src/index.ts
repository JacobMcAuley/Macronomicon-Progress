import * as Blockly from 'blockly';

import './blocks';

import { MacronomiconMenu } from './MacronomiconMenu';

(window as any).foo = () => {
    new MacronomiconMenu().render(true);
};
