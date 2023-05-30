import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select } from '../package/src';

const Comp = () => (
  <Select>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

const meta: Meta<typeof Comp> = {
  title: 'Select',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {},
};
