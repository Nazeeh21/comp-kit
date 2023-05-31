import { Button } from '../Button/Button';
import React from 'react';
import renderer from 'react-test-renderer';

describe('index', () => {
  it('renders button', () => {
    const container = renderer.create(<Button>Test Button</Button>).toJSON();
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
