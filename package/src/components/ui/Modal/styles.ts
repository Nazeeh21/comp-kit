import { styled } from '@stitches/react';
import { X } from 'lucide-react';

// Modal styles
export const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ModalContainer = styled('div', {
  position: 'relative',
  padding: '3em 2.3em',
  borderRadius: '20px',
  width: '35%', // Default width for larger screens
  height: 'fit-content', // Default height for larger screens
  maxWidth: '50%', // Max width for larger screens
  maxHeight: '50%', // Max height for larger screens
  overflow: 'auto', // Enable scrolling for overflowing content
  '@media(max-width: 767px)': {
    width: '80%', // Width for mobile devices
    minHeight: '20%',
    height: 'fit-content', // Height for mobile devices
    maxHeight: '80%', // Max height for mobile devices
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1em',
  variants: {
    color: {
      light: {
        backgroundColor: '#F9FDFE',
        color: 'black',
      },
      dark: {
        backgroundColor: '#222122',
        color: 'white',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});

export const CloseButton = styled(X, {
  position: 'absolute',
  top: '12px',
  right: '12px',
  borderRadius: '9999px',
  padding: '0.2em',
  cursor: 'pointer',
  variants: {
    color: {
      light: {
        background: '#F0F0F0',
      },
      dark: {
        background: '#484848',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});
