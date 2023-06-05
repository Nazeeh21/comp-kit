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
  width: '50%', // Default width for larger screens
  height: '50%', // Default height for larger screens
  overflow: 'auto', // Enable scrolling for overflowing content
  '@media(max-width: 767px)': {
    width: '80%', // Width for mobile devices
    height: '90%', // Height for mobile devices
  },
  display: 'flex',
  flexDirection: 'column',
});

export const CloseButton = styled('button', {
  position: 'relative',
  top: '9px',
  right: '9px',
  marginLeft: 'auto',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
