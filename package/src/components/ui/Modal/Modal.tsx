import React from 'react';
import { CloseButton, ModalContainer, Overlay } from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}

// Modal component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  closeOnOverlayClick = false,
  children,
}) => {
  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = event => {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) {
      onClose?.((event as unknown) as React.MouseEvent<HTMLButtonElement>);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={handleClickOutside}>
      <ModalContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};
