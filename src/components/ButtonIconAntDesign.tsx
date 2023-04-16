import React from 'react';
import { Button, Icon } from 'native-base';

import AntDesign from 'react-native-vector-icons/AntDesign';

type CustomButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  icon: string;
};

export const CustomButtonAntDesign: React.FC<CustomButtonProps> = ({
  onPress,
  disabled,
  icon,
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
      rightIcon={<AntDesign name={icon} size={30} color="black" />}
    ></Button>
  );
};
