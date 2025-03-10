import { createStackNavigator } from '@react-navigation/stack';

import myRequest from './myRequest'; 
import finishRequest from './finishRequest'; 
import cancleRequest from './cancleRequest'; 

const Stack = createStackNavigator();

export default function MeRequestLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="myRequest" component={myRequest} options={{ headerShown: false }} />
      <Stack.Screen name="finishRequest" component={finishRequest} options={{ headerShown: false }} />
      <Stack.Screen name="cancleRequest" component={cancleRequest} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
/*import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MyRequestScreen from './myRequest';
import FinishRequestScreen from './finishRequest';
import CancleRequestScreen from './cancleRequest';

const Stack = createStackNavigator();

export default function MeRequestLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="myRequest" component={MyRequestScreen} />
        <Stack.Screen name="finishRequest" component={FinishRequestScreen} />
        <Stack.Screen name="cancleRequest" component={CancleRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/
