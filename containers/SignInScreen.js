import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken, setId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );
      if (response.data.token) {
        setToken(response.data.token);
        setId(response.data.id);
      } else {
        alert("En feil har oppstått. Vennligst prøv igjen");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ alignItems: "center" }}>
        <MaterialCommunityIcons name="sailing" size={150} color="white" />
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor="#E1E1E1"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="#E1E1E1"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Logg inn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.underButton}>Ingen konto? Registrer deg</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066CC",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 190,
    height: 65,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 24
  },
  underButton: {
    marginTop: 15,
    color: "white",
    textDecorationLine: "underline"
  },
  textInput: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 30,
    color: "white"
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  }
});
