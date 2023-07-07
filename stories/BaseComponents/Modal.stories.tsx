import type { Meta, StoryObj } from '@storybook/react';
import React, { FC, useState } from 'react';
import { Modal } from '../../package/src/components/ui/Modal/Modal';
import { Button } from '../../package/src/components/ui/Button/Button';

interface Props {
  closeOnOverlayClick?: boolean;
}

const Comp: FC<Props> = ({ closeOnOverlayClick = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        heading="Modal Heading"
        closeOnOverlayClick={closeOnOverlayClick}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div> Modal content</div>
      </Modal>
    </div>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Pure Comps/Modal',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};

export const CloseOnOverlayClick: Story = {
  args: {
    closeOnOverlayClick: true,
  },
};
