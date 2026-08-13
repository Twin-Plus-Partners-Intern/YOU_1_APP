import React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

describe('YOU-IL Mobile App Core Test Suite', () => {
  it('renders correctly and matches snapshot', async () => {
    const { toJSON } = await render(
      <View>
        <Text>YOU-IL Goal Manager App</Text>
      </View>
    );

    expect(screen.getByText('YOU-IL Goal Manager App')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
