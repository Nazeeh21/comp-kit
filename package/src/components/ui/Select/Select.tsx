import { Check, ChevronDown } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chain } from 'viem/chains';
import {
  ConfirmPulse,
  Container,
  Option,
  Options,
  PendingPulse,
  Value,
} from './styles';

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  currentChain?: Chain;
  switching?: number | null | undefined;
  value?: Chain;
  onChange: (value: Chain) => void;
  variant?: 'dark' | 'light';
  options: Chain[];
};

export function Select({
  currentChain,
  switching,
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

  console.log('currentChain from Select: ', currentChain);
  console.log('options from Select: ', options);

  return (
    <Container
      color={variant}
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
    >
      {currentChain && options.includes(currentChain) ? (
        <Value>{currentChain.name ?? value?.name}</Value>
      ) : (
        <Value css={{ color: 'Red', borderColor: 'Red' }}>Wrong Network</Value>
      )}
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
                opacity={currentChain?.id === option.id ? 1 : 0}
              />
            </div>
            {option.name}
            {switching === option.id && <PendingPulse />}
            {currentChain?.id === option.id && <ConfirmPulse />}
          </Option>
        ))}
      </Options>
    </Container>
  );
}
