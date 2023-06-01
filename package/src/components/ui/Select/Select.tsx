import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Container, Value, Option, Options } from './styles';
import { Chain } from 'viem/chains';

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  value?: Chain;
  onChange: (value: Chain) => void;
  variant?: 'dark' | 'light';
  options: Chain[];
};

export function Select({
  variant = 'light',
  value,
  onChange,
  options,
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedindex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectOption = useCallback(
    (option: Chain) => {
      if (option !== value) onChange(option);
    },
    [onChange, value]
  );

  function isOptionSelected(option: Chain) {
    return option === value;
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedindex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(prev => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;

        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedindex(newValue);
          }
          break;
        }

        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    const container = containerRef?.current;
    container?.addEventListener('keydown', handler);

    return () => {
      container?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  return (
    <Container
      color={variant}
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
    >
      <Value>{value?.name}</Value>
      <ChevronDown size={20} style={{ marginBottom: '0.05em' }} />
      <Options color={variant} className={isOpen ? 'show' : ''}>
        {options.map((option, index) => (
          <Option
            color={variant}
            onClick={e => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedindex(index)}
            className={index === highlightedIndex ? 'highlighted' : ''}
            key={option.id}
          >
            <div>
              <Check
                style={{ paddingTop: '0.25em' }}
                size={15}
                opacity={isOptionSelected(option) ? 1 : 0}
              />
            </div>

            {option.name}
          </Option>
        ))}
      </Options>
    </Container>
  );
}
