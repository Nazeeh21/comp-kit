import { styled } from '@stitches/react';

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
  backgroundColor: '#fff',
  padding: '0px',
  borderRadius: '4px',
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
  gap: '0.1rem',
  paddingBottom: '0.75rem',
});

export const CloseButton = styled('button', {
  position: 'relative',
  top: '0px',
  right: '2px',
  marginLeft: 'auto',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
