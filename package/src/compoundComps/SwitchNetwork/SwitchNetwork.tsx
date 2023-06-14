import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ConfirmPulse,
  Container,
  Option,
  Options,
  PendingPulse,
  Value,
} from '../../components/ui/Select/styles';
import {
  useCurrentChain,
  useSupportedChains,
} from '../../components/KitProvider/ChainContext';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import { useIsConnected } from '../../components/KitProvider/AddressContext';
import { Chain } from 'viem';
import { Check, ChevronDown } from 'lucide-react';

const CompoundConnectButtonContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  variant: 'dark' | 'light';
  currentChain: Chain | undefined;
  switching: number | null | undefined;
  selectOption: (option: Chain) => Promise<void>;
  highlightedIndex: number;
  setHighlightedindex: React.Dispatch<React.SetStateAction<number>>;
}>({
  isOpen: false,
  setIsOpen: () => void 0,
  variant: 'light',
  selectOption: async () => {
    // function body
  },
  highlightedIndex: 0,
  setHighlightedindex: () => void 0,
  currentChain: undefined,
  switching: undefined,
});

interface CompoundSwitchNetworkProps {
  variant?: 'dark' | 'light';
  children: React.ReactNode;
}

interface CompoundSwitchNetworkOptionProps
  extends Omit<
    React.ComponentProps<typeof Option>,
    'value' | 'onClick' | 'onMouseEnter' | 'className'
  > {
  value: Chain;
  children: React.ReactNode;
}

export interface CompoundSwitchNetworkWithOptionProps
  extends React.FC<CompoundSwitchNetworkProps> {
  Option: React.FC<CompoundSwitchNetworkOptionProps>;
}

export const CompoundSwitchNetwork: CompoundSwitchNetworkWithOptionProps = ({
  variant = 'light',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const supportedChains = useSupportedChains();
  const { switchChain, switchingToChainId } = useSwitchChain();
  const currentChain = useCurrentChain();
  const isConnected = useIsConnected();
  const [value, setValue] = React.useState<Chain>(
    currentChain ?? supportedChains[0]
  );
  // now this state stores the id of the chain instead of the index
  const [highlightedIndex, setHighlightedindex] = useState(
    currentChain?.id ?? 0
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const selectChangeHandler = async (value: Chain) => {
    console.log('isConnected from switchNetwork: ', isConnected);
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    console.log('new chain value: ', value);
    const newChainId = await switchChain(+value.id);
    console.log({ newChainId });
    !!newChainId && typeof newChainId === 'number' && setValue(value);
  };

  const selectOption = useCallback(
    async (option: Chain) => {
      if (option !== value) {
        await selectChangeHandler(option);
      }
    },
    [selectChangeHandler, value]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(prev => !prev);
          if (isOpen) {
            void selectOption(
              supportedChains.filter(c => c.id === highlightedIndex)[0]
            );
          }
          break;

        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const optionElements =
            optionsRef?.current &&
            Array.from(optionsRef?.current?.children).filter(
              option => option.tagName === 'LI'
            );

          const prevIndex = optionElements?.findIndex(
            option => option.id === highlightedIndex.toString()
          );
          const newValue = optionElements?.[prevIndex ? prevIndex + 1 : 0]?.id;
          newValue && setHighlightedindex(+newValue);
          //   const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          //   //   this condition is to be changed because rn its checking index ancd not chain id
          //   if (newValue >= 0 && newValue < supportedChains.length) {
          //     setHighlightedindex(newValue);
          //   }
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
  }, [isOpen, highlightedIndex, supportedChains, selectOption]);

  return (
    <CompoundConnectButtonContext.Provider
      value={{
        isOpen,
        setIsOpen,
        variant,
        currentChain,
        switching: switchingToChainId,
        selectOption,
        highlightedIndex,
        setHighlightedindex,
      }}
    >
      <Container
        color={variant}
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)}
        tabIndex={0}
      >
        {currentChain && supportedChains.includes(currentChain) ? (
          <Value>{currentChain.name ?? value?.name}</Value>
        ) : (
          <Value css={{ color: 'Red', borderColor: 'Red' }}>
            Wrong Network
          </Value>
        )}
        <ChevronDown size={20} style={{ marginBottom: '0.05em' }} />
        <Options
          ref={optionsRef}
          color={variant}
          className={isOpen ? 'show' : ''}
        >
          {children}
        </Options>
      </Container>
    </CompoundConnectButtonContext.Provider>
  );
};

const switchNetworkContext = () => useContext(CompoundConnectButtonContext);

CompoundSwitchNetwork.Option = ({ value, children }) => {
  const {
    variant,
    selectOption,
    setIsOpen,
    currentChain,
    switching,
    highlightedIndex,
    setHighlightedindex,
  } = switchNetworkContext();
  return (
    <Option
      color={variant}
      onClick={async e => {
        e.stopPropagation();
        await selectOption(value);
        setIsOpen(false);
      }}
      onMouseEnter={() => setHighlightedindex(value.id)}
      className={value.id === highlightedIndex ? 'highlighted' : ''}
    >
      <div>
        <Check
          style={{ paddingTop: '0.25em' }}
          size={15}
          opacity={currentChain?.id === value.id ? 1 : 0}
        />
      </div>
      {children}
      {switching === value.id && <PendingPulse />}
      {currentChain?.id === value.id && <ConfirmPulse />}
    </Option>
  );
};
