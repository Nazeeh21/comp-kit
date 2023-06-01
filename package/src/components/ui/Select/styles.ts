import { styled } from '@stitches/react';

export const Container = styled('div', {
  position: 'relative',
  width: '10em',
  fontFamily: 'Arial',
  minHeight: '1.5em',
  border: '0.05em solid #777',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  padding: '0.5em 0.7em',
  borderRadius: '0.25em',
  outline: 'none',
  '&:focus': {
    outline: '0.15em solid #777',
    outlineOffset: '0.09em',
  },
  variants: {
    color: {
      dark: {
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'rgba(255,255,255,0.4)',
      },
      light: {
        backgroundColor: 'white',
        color: 'black',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});

export const Value = styled('span', {
  flexGrow: 1,
  display: 'flex',
  gap: '0.5em',
  flexWrap: 'wrap',
});

export const ClearButton = styled('button', {
  background: 'none',
  color: '#777',
  border: 'none',
  padding: 0,
  outline: 'none',
  cursor: 'pointer',
  fontSize: '1.2em',
  '&:focus': {
    color: '#333',
  },
  '&:hover': {
    color: '#333',
  },
});

export const Divider = styled('div', {
  backgroundColor: '#777',
  alignSelf: 'stretch',
  width: '0.05em',
});

export const Caret = styled('div', {
  translate: '0 25%',
  border: '0.25em solid transparent',
  borderTopColor: '#777',
});

export const Options = styled('ul', {
  position: 'absolute',
  margin: 0,
  padding: '0.25em',
  listStyle: 'none',
  display: 'none',
  maxHeight: '15em',
  overflowY: 'auto',
  border: '0.05em solid #777',
  borderRadius: '0.25em',
  width: '100%',
  left: 0,
  top: 'calc(100% + 0.35em)',
  backgroundColor: 'white',
  zIndex: 100,
  '&.show': {
    display: 'block',
  },
  variants: {
    color: {
      dark: {
        backgroundColor: 'black',
      },
      light: {
        backgroundColor: 'white',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});

export const Option = styled('li', {
  padding: '0.25em 0.5em',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: '0.25em',
  display: 'flex',
  gap: '0.5em',
  alignItems: 'center',
  variants: {
    color: {
      dark: {
        '&.highlighted': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
        },
      },
      light: {
        '&.highlighted': {
          backgroundColor: 'rgba(0, 0, 255, 0.7)',
          color: 'white',
        },
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});

export const OptionBadge = styled('button', {
  display: 'flex',
  alignItems: 'center',
  border: '0.05em solid #777',
  borderRadius: '0.25em',
  padding: '0.15em 0.25em',
  gap: '0.25em',
  cursor: 'pointer',
  background: 'none',
  outline: 'none',
  '&:hover': {
    '#RB': {
      color: 'hsl(0, 100%, 50%)',
    },
  },
  '&:focus': {
    '#RB': {
      color: 'hsl(0, 100%, 50%)',
    },
  },
  variants: {
    color: {
      dark: {
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderColor: 'hsl(0, 100%, 50%)',
        },
        '&:focus': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderColor: 'hsl(0, 100%, 50%)',
        },
      },
      light: {
        color: 'black',
        '&:hover': {
          backgroundColor: 'hsl(0, 100%, 90%)',
          borderColor: 'hsl(0, 100%, 50%)',
        },
        '&:focus': {
          backgroundColor: 'hsl(0, 100%, 90%)',
          borderColor: 'hsl(0, 100%, 50%)',
        },
      },
    },
  },
});

export const RemoveButton = styled('span', {
  fontSize: '1.2em',
  color: '#777',
  marginTop: '0.1em',
});
