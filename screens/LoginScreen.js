import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/loginsc.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(true);

  const handleLogin = async () => {
    try {
      const existingUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const user = existingUsers.find(user => user.email === email && user.password === password);

      if (user) {
        setModalMessage('Đăng nhập thành công!');
        setModalSuccess(true);
        setModalVisible(true);
        
        // Reset email và password về chuỗi rỗng sau khi đăng nhập thành công
        setEmail('');
        setPassword('');
        
      } else {
        setModalMessage('Email hoặc mật khẩu không đúng.');
        setModalSuccess(false);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        if (modalSuccess) {
          navigation.navigate('Main');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, modalSuccess, navigation]);

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Xin chào!</Text>
        <Text style={styles.subHeaderText}>Vui lòng đăng nhập để tiếp tục</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.recoveryText}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.signUpText}> Đăng kí ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, modalSuccess ? styles.successModal : styles.errorModal]}>
            <Icon 
              name={modalSuccess ? "checkmark-circle" : "close-circle"} 
              size={60} 
              color={modalSuccess ? "#4CAF50" : "#F44336"} 
              style={styles.modalIcon} 
            />
            <Text style={styles.modalMessage}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeaderText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#333',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 28,
  },
  recoveryText: {
    color: '#aaa',
    textAlign: 'right',
    marginTop: 10,
    marginRight: 10,
  },
  signInButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 30,
  },
  footerTextContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
    fontSize:16
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:16
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successModal: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  errorModal: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});
