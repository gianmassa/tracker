import * as React from 'react';
import { View, Text } from 'react-native';

function AreaRestrita(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AreaRestrita Screen, ID: {props.route.params.id}</Text>
    </View>
  );
}

export default AreaRestrita
