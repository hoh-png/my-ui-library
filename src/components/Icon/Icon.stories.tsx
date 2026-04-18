import type { Meta, StoryObj } from '@storybook/react';
import { Icon,} from './Icon';
import { FaHeart, FaStar, FaUser } from 'react-icons/fa';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Heart: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Icon size={24} color="red">
        <FaHeart />
      </Icon>
      <Icon size={32} color="red">
        <FaHeart />
      </Icon>
      <Icon size={90} color="red">
        <FaHeart />
      </Icon>
    </div>

  ),
};

export const Star: Story = {
  args: {
    children: <FaStar />,
  },
};

export const User: Story = {
  args: {
    children: <FaUser />,
  },
};

