import React from 'react';
import { Button, Icon } from 'native-base';

import Faixa from '@assets/Faixa.svg';

type CustomButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export const CustomButtonSVG1: React.FC<CustomButtonProps> = ({
  onPress,
  disabled,
}) => {
  return (
    <Button
      style={{
        width: 75,
        height: 75,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      isDisabled={disabled}
      bg="blueGray.400"
      _text={{ color: 'white', fontWeight: 'bold' }}
      rightIcon={<Faixa fill="black" width={50} height={50} />}
    ></Button>
  );
};
