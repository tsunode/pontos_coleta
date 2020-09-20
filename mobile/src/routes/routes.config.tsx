import React from 'react';
import {} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  route: RouteProp<Record<string, object | undefined>, string>;
  focused: boolean;
  color: string;
  size: number;
}

const screenOptions: React.FC<Props> = ({ route, focused }) => {
  let iconName;

  switch (route.name) {
    case 'Cadastrados':
      iconName = 'map-pin';
      break;
    case 'Novo':
      iconName = 'plus-circle';
      break;
    case 'Favoritos':
      iconName = 'heart';
      break;
    default:
  }

  return (
    <Icon
      name={String(iconName)}
      size={30}
      color={focused ? '#0A1259' : '#757AA8'}
      solid
    />
  );
};

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: '#0A1259',
  inactiveTintColor: '#757AA8',
  activeBackgroundColor: '#F0F8FF',
  inactiveBackgroundColor: '#F0F8FF',
  style: {
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    height: 60,
  },
  labelStyle: {
    fontSize: 13,
  },
  iconStyle: {
    flex: 1,
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default { screenOptions, tabBarOptions };
