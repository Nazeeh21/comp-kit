import { createStitches } from '@stitches/react';
import { X, ArrowRight } from 'lucide-react';

const { styled } = createStitches({
  media: {
    bp1: '(max-width: 768px)',
  },
});

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
  backdropFilter: 'blur(5px)',
});

export const ModalContainer = styled('div', {
  borderRadius: '20px', // Default width for larger screens
  height: 'fit-content', // Default height for larger screens
  overflow: 'auto', // Enable scrolling for overflowing content
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
    responsive: {
      tablet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        maxWidth: '100%',
        width: '100%',
        padding: '2em 1.5em',
        boxSizing: 'border-box',
      },
      desktop: {
        position: 'relative',
        maxWidth: '50%', // Max width for larger screens
        maxHeight: '50%',
        width: '35%',
        padding: '3em 2.3em',
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

export const ModalHeading = styled('h2', {
  fontSize: '1.5em',
  fontFamily: 'Poppins, sans-serif',
});

export const Arrow = styled(ArrowRight, {
  marginLeft: 'auto',
});
