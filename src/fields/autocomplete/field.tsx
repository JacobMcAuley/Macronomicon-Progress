import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import * as Blockly from 'blockly/core';

import { AutocompleteDropdown } from './autocomplete-dropdown';
import { AutocompleteResults, getAutocompleteResults } from './get-autocomplete-results';
import { TypeDescriptors } from './get-obj-types';

interface TextFieldOptions {
    name: string;
    spellcheck: boolean;
    text?: string;
    type: string;
}
class AutocompleteTextInput extends Blockly.FieldTextInput {
    static fromJson(options: unknown) {
        const { text: rawText, ...rest } = options as TextFieldOptions;
        const text = Blockly.utils.replaceMessageReferences(rawText);
        return new AutocompleteTextInput(text, undefined, rest);
    }

    private results: AutocompleteResults | null = null;
    private resultIndex = 0;
    setEditorValue_(newValue: unknown) {
        super.setEditorValue_(newValue);
    }
    showEditor_(event?: Event, isQuietInput?: boolean) {
        super.showEditor_(event, isQuietInput);
        this.renderDropdownEditor();
    }
    resizeEditor_() {
        super.resizeEditor_();
        this.resultIndex = 0;
        this.renderDropdownEditor();
    }
    onHtmlInputKeyDown_(e: KeyboardEvent): void {
        switch (e.key) {
            case 'Tab': {
                e.preventDefault();
                this.acceptResult();
                break;
            }
            case 'ArrowDown': {
                e.preventDefault();
                this.resultIndex = Math.min(this.resultIndex + 1, (this.results?.results.length || 0) - 1);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                this.resultIndex = Math.max(this.resultIndex - 1, 0);
                break;
            }
            default:
                super.onHtmlInputKeyDown_(e);
        }
        this.renderDropdownEditor();
    }
    private renderDropdownEditor(): void {
        this.results = getAutocompleteResults(this.getValue() as string, _token?.actor?.getRollData() ?? {}); // TODO - Link to a specific actor?

        if (!this.results) {
            this.closeDropdownEditor();
            return;
        }

        const insertNode = Blockly.DropDownDiv.getContentDiv();

        // If there is not already a child in there, we need to know so we can position
        const hasExistingDropdownElement = insertNode.childElementCount > 0;

        render(<AutocompleteDropdown results={this.results.results} resultIndex={this.resultIndex} />, insertNode);

        !hasExistingDropdownElement &&
            Blockly.DropDownDiv.showPositionedByField(this, () => unmountComponentAtNode(insertNode));
    }
    private closeDropdownEditor(): void {
        unmountComponentAtNode(Blockly.DropDownDiv.getContentDiv());
        Blockly.DropDownDiv.hideWithoutAnimation();
        this.htmlInput_?.focus();
    }
    private acceptResult(): void {
        if (!this.results) {
            return;
        }

        const selectedResult = this.results.results[this.resultIndex];
        const currentValue = this.getValue() as string;
        if (selectedResult) {
            const nextValue = currentValue.replace(
                /([@.])([^.@]*?)$/,
                `$1${selectedResult[0]}${selectedResult[1] === TypeDescriptors.Obj ? '.' : ' '}`,
            );
            this.setEditorValue_(nextValue);
        }
    }
}

Blockly.fieldRegistry.register('field_autocomplete_input', AutocompleteTextInput);
