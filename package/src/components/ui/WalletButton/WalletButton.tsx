import { styled } from '@stitches/react';

const _DarkBackgroundColor = '#222122';
const _LightBackgroundColor = '#f9fdfe';

export const WalletButton = styled('button', {
  backgroundColor: 'white',
  borderRadius: '10px',
  border: 'none',
  fontSize: '1.4em',
  padding: '0.5em 0.5em',
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0.5em',
  variants: {
    color: {
      dark: {
        backgroundColor: _DarkBackgroundColor,
        color: 'white',
        '&:hover': {
          backgroundColor: '#1b1a1b',
        },
        '&:focus': {
          outline: '#1b1a1b solid 2px',
          outlineOffset: '1px',
        },
      },
      light: {
        backgroundColor: _LightBackgroundColor,
        color: 'black',
        '&:hover': {
          backgroundColor: '#DDF7FF',
        },
        '&:focus': {
          outline: '#f5f5f5 solid 2px',
          outlineOffset: '1px',
        },
      },
    },
  },

  defaultVariants: {
    color: 'light',
  },
});

export const ImageContainer = styled('div', {
  minWidth: '30px',
  height: '30px',
  padding: '.3em',
  borderRadius: '10px',
  variants: {
    wallet: {
      metamask: {
        backgroundColor: '#F49C4E',
      },
      walletconnect: {
        backgroundColor: '#5194F7',
      },
      none: {
        backgroundColor: 'black',
      },
    },
  },
  defaultVariants: {
    wallet: 'none',
  },
});

export const Image = styled('img', {
  width: '100%',
  height: '100%',
});
