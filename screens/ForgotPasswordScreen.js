import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const backgroundImage = require('../assets/loginsc.png');

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(true);

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateEmail(email)) {
      setModalMessage('Một link khôi phục mật khẩu đã được gửi đến email của bạn.');
      setModalSuccess(true);
      setModalVisible(true);
    } else {
      setModalMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  // Automatically close modal after 1 second and navigate to Login screen if successful
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        if (modalSuccess) {
          navigation.navigate('Login'); // Chuyển đến trang Login khi gửi email thành công
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, modalSuccess, navigation]);

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
        <Text style={styles.headerText}>Khôi phục mật khẩu</Text>
        <Text style={styles.subHeaderText}>Vui lòng nhập email của bạn để nhận link đặt lại mật khẩu.</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"  
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}  
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>

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
    marginTop: 20,
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
  submitButton: {
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
