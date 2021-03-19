import { Union } from 'ts-toolbelt';

import { BlockColours, BlockNames, BlockTypes } from './block-definitions';

type ArgNumbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

// TODO - Move to Blockly.d.ts
type BuiltInTypes =
    | 'field_input'
    | 'input_dummy'
    | 'input_value'
    | 'input_statement'
    | 'field_number'
    | 'field_dropdown'
    | 'field_label'
    | 'field_label_serializable'
    | 'field_image'
    | 'field_variable';

type CustomTypes = 'field_autocomplete_input';

interface BaseInput {
    type: BuiltInTypes | CustomTypes | typeof BlockNames[keyof typeof BlockNames];
}

interface DummyInput extends BaseInput {
    type: 'input_dummy';
}

interface FieldInput extends BaseInput {
    text?: string;
    check?: BlockTypes[];
    name: string;
}

interface NumberInput extends BaseInput {
    max?: number;
    min?: number;
    value?: number;
}

type Inputs = FieldInput | DummyInput | NumberInput;

type ArgDefinitions = Union.Merge<
    { [n in ArgNumbers as `args${n}`]?: Inputs[] } & { [n in ArgNumbers as `message${n}`]?: string }
>;

type Connection = null | BlockTypes;

interface BaseBlockDefinition extends ArgDefinitions {
    colour?: BlockColours;
    extensions?: string[];
    helpUrl?: string;
    inputsInline?: boolean;
    mutator?: string;
    tooltip?: string;
}

export interface ValueBlockDefinition extends BaseBlockDefinition {
    output: Connection;
}

export interface StatementBlockDefinition extends BaseBlockDefinition {
    nextStatement?: Connection;
    previousStatement?: Connection;
}

export type BlockDefinition = ValueBlockDefinition | StatementBlockDefinition;
