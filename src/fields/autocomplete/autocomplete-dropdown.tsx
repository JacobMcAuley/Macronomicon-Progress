import React, { FunctionComponent } from 'react';

interface AutocompleteDropdownProps {
    results: [string, string][];
    resultIndex: number;
}

export const AutocompleteDropdown: FunctionComponent<AutocompleteDropdownProps> = React.memo(
    function AutocompleteDropdown({ results, resultIndex }) {
        return (
            <ul style={{ listStyle: 'none' }}>
                {results.map(([key, value], index) => (
                    <li key={key} style={{ display: 'flex', minWidth: '200px' }}>
                        <span style={{ flex: 3, color: resultIndex !== index ? 'initial' : 'red' }}>{key}</span>
                        <span style={{ flex: 1, textAlign: 'right' }}>{value}</span>
                    </li>
                ))}
            </ul>
        );
    },
);
