import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../package/src';

const Comp = () => <Button>Test Button</Button>;

const meta: Meta<typeof Comp> = {
  title: 'Button',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {},
};
