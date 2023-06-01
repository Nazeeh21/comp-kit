import { styled } from '@stitches/react';

export const Button = styled('button', {
  backgroundColor: 'white',
  borderRadius: '6px',
  fontSize: '14px',
  padding: '10px 15px',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },

  variants: {
    color: {
      dark: {
        backgroundColor: 'black',
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
        backgroundColor: 'white',
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
