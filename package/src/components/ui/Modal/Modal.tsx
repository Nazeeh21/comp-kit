import React, { useEffect } from 'react';
import { CloseButton, ModalContainer, Overlay } from './styles';

export interface ModalProps
  extends React.ComponentProps<typeof ModalContainer> {
  isOpen: boolean;
  onClose: React.MouseEventHandler<SVGSVGElement> | undefined;
  closeOnOverlayClick?: boolean;
  closeButtonProps?: Omit<React.ComponentProps<typeof CloseButton>, 'onClick'>;
  children?: React.ReactNode;
}

// Modal component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  closeOnOverlayClick = false,
  closeButtonProps,
  children,
  ...props
}) => {
  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = event => {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) {
      onClose?.(
        (event as unknown) as React.MouseEvent<SVGSVGElement, MouseEvent>
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.(
          (event as unknown) as React.MouseEvent<SVGSVGElement, MouseEvent>
        );
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <Overlay onClick={handleClickOutside}>
      <ModalContainer {...props}>
        <CloseButton {...closeButtonProps} onClick={onClose} />
        {children}
      </ModalContainer>
    </Overlay>
  );
};
