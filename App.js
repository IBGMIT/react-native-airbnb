import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SignUpForm from './containers/SignUpScreen';
import firebase from 'firebase';
import LoginForm from "./containers/SignInScreen";
import ProfileScreen from "./containers/ProfileScreen";
import HomeScreen from "./containers/HomeScreen";
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
    state = {user: null}

    componentDidMount() {
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDyz0E6jpZaCTM3gT3oC2XTSCg2sUHNLNY",
            authDomain: "disruptingbnb.firebaseapp.com",
            databaseURL: "https://disruptingbnb.firebaseio.com",
            projectId: "disruptingbnb",
            storageBucket: "disruptingbnb.appspot.com",
            messagingSenderId: "1044280658661",
            appId: "1:1044280658661:web:81706c98bdd8911db0a20c",
            measurementId: "G-YJTZQ4R0Y7"
        };
        // vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    render() {
        const {user} = this.state

        if (!user) {
            return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Opret eller Login med din firebase Email
                    </Text>
                    <Card>
                        <SignUpForm/>
                    </Card>
                    <Card>
                        <LoginForm/>
                    </Card>
                </View>
            )
        } else {
            return (
                <ActionSheetProvider>
                    <NavigationContainer>

                        // User is signed in
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Tab"
                                options={{header: () => null, animationEnabled: false}}
                            >
                                {() => (
                                    <Tab.Navigator
                                        tabBarOptions={{
                                            activeTintColor: "black",
                                            inactiveTintColor: "white",
                                            style: {
                                                backgroundColor: "#0066CC"
                                            }
                                        }}
                                    >
                                        <Tab.Screen
                                            name="Home"
                                            options={{
                                                tabBarLabel: "Home",
                                                tabBarIcon: ({color, size}) => (
                                                    <Ionicons name={"ios-home"} size={size} color={color}/>
                                                )
                                            }}
                                        >
                                            {() => (
                                                <Stack.Navigator>
                                                    <Stack.Screen
                                                        name="Home"
                                                        options={{
                                                            title: "List",
                                                            tabBarLabel: "Home",
                                                            headerStyle: {backgroundColor: "#0066CC"},
                                                            headerTitleStyle: {color: "white"},
                                                            headerTitleAlign: "center"
                                                        }}
                                                    >
                                                        {() => <HomeScreen/>}
                                                    </Stack.Screen>
                                                    <Stack.Screen
                                                        name="Room"
                                                        options={{
                                                            headerBackTitleVisible: false,
                                                            headerBackImage: () => (
                                                                <Ionicons
                                                                    style={{marginLeft: 20}}
                                                                    name={"ios-arrow-back"}
                                                                    size={30}
                                                                    color={"white"}
                                                                />
                                                            ),
                                                            title: "Room",
                                                            headerStyle: {backgroundColor: "#0066CC"},
                                                            headerTitleStyle: {color: "white"},
                                                            headerTitleAlign: "center"
                                                        }}
                                                    >
                                                        {() => <Room/>}
                                                    </Stack.Screen>
                                                </Stack.Navigator>
                                            )}
                                        </Tab.Screen>
                                        <Tab.Screen
                                            name="Around Me"
                                            options={{
                                                tabBarLabel: "Around Me",
                                                tabBarIcon: ({color, size}) => (
                                                    <Ionicons name={"ios-pin"} size={size} color={color}/>
                                                )
                                            }}
                                        >
                                            {() => (
                                                <Stack.Navigator>
                                                    <Stack.Screen
                                                        name="Around Me"
                                                        options={{
                                                            title: "Around Me",
                                                            headerStyle: {backgroundColor: "#0066CC"},
                                                            headerTitleStyle: {color: "white"},
                                                            headerTitleAlign: "center"
                                                        }}
                                                    >
                                                        {() => <AroundMe/>}
                                                    </Stack.Screen>
                                                </Stack.Navigator>
                                            )}
                                        </Tab.Screen>
                                        <Tab.Screen
                                            name="Profile"
                                            options={{
                                                tabBarLabel: "Profile",
                                                tabBarIcon: ({color, size}) => (
                                                    <Ionicons
                                                        name={"ios-person"}
                                                        size={size}
                                                        color={color}
                                                    />
                                                )
                                            }}
                                        >
                                            {() => (
                                                <Stack.Navigator>
                                                    <Stack.Screen
                                                        name="Profile"
                                                        options={{
                                                            title: "Profile",
                                                            headerStyle: {backgroundColor: "#0066CC"},
                                                            headerTitleStyle: {color: "white"},
                                                            headerTitleAlign: "center"
                                                        }}
                                                    >

                                                    </Stack.Screen>
                                                </Stack.Navigator>
                                            )}
                                        </Tab.Screen>
                                    </Tab.Navigator>
                                )}
                            </Stack.Screen>
                        </Stack.Navigator>
                        )}
                    </NavigationContainer>
                </ActionSheetProvider>
            );
        }
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
