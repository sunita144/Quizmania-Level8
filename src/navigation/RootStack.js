import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Landing from "../screens/Landing";

import DrawerNav from '../navigation/DrawerNav';

const Stack = createStackNavigator();
export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false, }} />
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen name="Dashboard" component={DrawerNav} 
            options={{ headerShown: false }} />
           </Stack.Navigator>
    );
}