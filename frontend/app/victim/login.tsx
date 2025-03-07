import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router, useRouter } from "expo-router";
import CheckBox from "expo-checkbox";
 

export default function loginOrganize() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login by Victim</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="hello@gmail.com"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Keep me signedin*/}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          color ={isChecked ? "blue" : "#fff" } // ✅ กำหนดสีของ Checkbox
        />
        <Text style={styles.checkboxLabel}>keep me signed in</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress = {()=> router.push('/victim/victim')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Create new account */}
      <TouchableOpacity>
        <Text style={styles.registerText}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

 
const styles = StyleSheet.create({     /*"#ffffff" White   "#000000" Black*/
  container: {
    flex: 1,   
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff", 
  },
  title: {  
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#000",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "blue",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "blue",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
