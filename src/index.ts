import 'blockly';

import './styles/module.scss';

import './blocks';

import { renderMacroConfig } from './editor/editor';

Hooks.on('renderMacroConfig', renderMacroConfig);
