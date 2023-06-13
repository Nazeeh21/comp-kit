import { styled } from '@stitches/react';

const _DarkBackgroundColor = '#222122';
const _LightBackgroundColor = '#f9fdfe';

export const Button = styled('button', {
  backgroundColor: 'white',
  borderRadius: '6px',
  fontSize: '14px',
  padding: '10px 15px',
  width: 'fit-content',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },

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
  },
  defaultVariants: {
    color: 'light',
  },
});
