import { styled } from '@stitches/react';

const _DarkBackgroundColor = '#222122';
const _LightBackgroundColor = '#f9fdfe';

export const WalletButton = styled('button', {
  backgroundColor: 'white',
  borderRadius: '10px',
  fontSize: '1.4em',
  padding: '0.5em 0.5em',
  width: '100%',
  cursor: 'pointer',
  border: '2px solid',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
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
          backgroundColor: '#f5f5f5',
        },
        '&:focus': {
          outline: '#f5f5f5 solid 2px',
          outlineOffset: '1px',
        },
      },
    },
    wallet: {
      metamask: {
        borderColor: '#E88A39',
        '&:hover': {
          backgroundColor: '#EFD4BD',
        },
        '&:focus': {
          backgroundColor: '#EFD4BD',
        },
      },
      walletconnect: {
        borderColor: '#5697F5',
        '&:hover': {
          background: '#BFD9FF',
        },
        '&:focus': {
          backgroundColor: '#BFD9FF',
        },
      },
      none: {
        borderColor: 'black',
      },
    },
  },

  defaultVariants: {
    color: 'light',
    wallet: 'none',
  },
});

export const ImageContainer = styled('div', {
  width: '30px',
  height: '30px',
});

export const Image = styled('img', {
  width: '100%',
  height: '100%',
});
