import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/loginsc.png');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [showPassword, setShowPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(true);

  useEffect(() => {
    if (modalVisible) {
      
      const timer = setTimeout(() => {
        setModalVisible(false);
        if (modalSuccess) {
          navigation.navigate('Login'); // Chuyển đến trang Login khi đăng ký thành công
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, modalSuccess, navigation]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
        setModalMessage('Vui lòng nhập địa chỉ email hợp lệ.');
        setModalSuccess(false);
        setModalVisible(true);
        return;
    }

    if (password === '') {
        setModalMessage('Vui lòng nhập mật khẩu.');
        setModalSuccess(false);
        setModalVisible(true);
        return;
    }

    if (password !== confirmPassword) {
        setModalMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
        setModalSuccess(false);
        setModalVisible(true);
        return;
    }

    // Lưu thông tin tài khoản vào AsyncStorage
    try {
        const existingUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const newUser = { email, password };
        existingUsers.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));

        setModalMessage('Tài khoản của bạn đã được đăng ký thành công!');
        setModalSuccess(true);
        setModalVisible(true);
    } catch (error) {
        console.error('Error saving user data', error);
    }
};

  

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}  
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Đăng kí tài khoản</Text>
        <Text style={styles.subHeaderText}>Vui lòng điền thông tin bên dưới để tạo tài khoản</Text>
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}  
            value={confirmPassword}
            onChangeText={setConfirmPassword}  
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}  
          >
            <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Đăng kí</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Có tài khoản rồi? 
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}> Đăng nhập ngay</Text>
        </TouchableOpacity>
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
  backButtonContainer: {
    position: 'absolute',
    top: 60, 
    left: 20,
  },
  backButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subHeaderText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
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
  signUpButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 15,
    paddingHorizontal: 100, 
    borderRadius: 30,
    marginTop: 20,
    marginRight:30,
    marginLeft:30
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  footerContainer: {
    flexDirection: 'row',  // Align items horizontally
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
    fontSize: 16,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,  // Same size as footerText
  },
});
