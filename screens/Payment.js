import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image, Modal, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const backgroundImage = require('../assets/main.png');
const addressImage = require('../assets/Map.png');

const paymentOptions = [
  { label: 'Trả bằng tiền mặt', value: 'Cash' },
  { label: 'Trả bằng thẻ tín dụng', value: 'Credit Card' },
  { label: 'Trả bằng thẻ ghi nợ', value: 'Debit Card' }
];

export default function Payment({ route, navigation }) {
  const { subtotal, shippingCost, totalCost } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Chọn một hình thức thanh toán');

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePayment = () => {
    if (name && phone && address && paymentMethod) {
      if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
        if (cardNumber) {
          setModalMessage('Thanh toán thành công!');
          setModalSuccess(true);
        } else {
          setModalMessage('Vui lòng nhập số thẻ tín dụng hoặc thẻ ghi nợ.');
          setModalSuccess(false);
        }
      } else {
        setModalMessage('Thanh toán thành công!');
        setModalSuccess(true);
      }
    } else {
      setModalMessage('Vui lòng điền đầy đủ thông tin liên hệ, địa chỉ, và hình thức thanh toán.');
      setModalSuccess(false);
    }
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        if (modalSuccess) {
          navigation.navigate('Main');
        }
      }, 2000); // Để người dùng có thời gian đọc thông báo
      return () => clearTimeout(timer);
    }
  }, [modalVisible, modalSuccess, navigation]);

  const handleSelectOption = (option) => {
    setPaymentMethod(option.value);
    setSelectedOption(option.label);
    setDropdownVisible(false);
  };

  // Chỉ cho phép nhập chữ cái cho tên
  const handleNameChange = (text) => {
    // Biểu thức chính quy này cho phép tất cả các ký tự tiếng Việt, bao gồm dấu thanh, khoảng trắng và các dấu câu thường dùng trong tên 
    const filteredText = text.replace(/[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôỗộồõùúăđĩũơưĂÂÊÔƠƯÁÀẢÃẠẤẦẨẪẬẮẰẲẴẶẺÈẼẸÉỀỂỄỆẻẽẹèềễếéệÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰỲÝỶỸỴýỳỷỹỵ\s'-]/g, '');
    setName(filteredText);
  };

  // Chỉ cho phép nhập số cho số điện thoại
  const handlePhoneChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setPhone(filteredText);
  };

  // Chỉ cho phép nhập số cho số thẻ
  const handleCardNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setCardNumber(filteredText);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Information</Text>
      </View>

      <ScrollView contentContainerStyle={styles.infoScrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thông tin liên hệ</Text>
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={16} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Tên"
              placeholderTextColor="#ccc"
              value={name}
              onChangeText={handleNameChange}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={16} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={16} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              placeholderTextColor="#ccc"
              value={phone}
              maxLength={11}
              keyboardType="numeric"
              onChangeText={handlePhoneChange}
            />
          </View>

          <Text style={styles.infoTitle}>Địa chỉ</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Nhập địa chỉ của bạn"
            placeholderTextColor="#ccc"
            value={address}
            onChangeText={setAddress}
          />
          <Image source={addressImage} style={styles.addressImage} />

          <Text style={styles.infoTitle}>Hình thức thanh toán</Text>
          <TouchableOpacity style={styles.dropdownContainer} onPress={() => setDropdownVisible(true)}>
            <Text style={styles.selectedOption}>{selectedOption}</Text>
            <Icon name="chevron-down" size={20} color="#fff" style={styles.dropdownIcon} />
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={dropdownVisible}
            animationType="slide"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
              <View style={styles.modalContainer}>
                {paymentOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    style={styles.optionButton}
                    onPress={() => handleSelectOption(option)}
                  >
                    <Text style={styles.optionText}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>

          {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
            <View style={styles.inputContainer}>
              <Icon name="card-outline" size={16} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Số thẻ tín dụng"
                placeholderTextColor="#ccc"
                value={cardNumber}
                maxLength={16 }
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow1}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow2}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow3}>
          <Text style={styles.totalLabel}>Total Cost</Text>
          <Text style={styles.totalValue}>${totalCost.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.buttonText}>Confirm Payment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, modalSuccess ? styles.successModal : styles.errorModal]}>
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
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 5,
    fontSize: 16,
  },
  addressInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5
  },
  addressImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectedOption: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  summaryContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    marginBottom: 10,
  },
  summaryRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  summaryRow3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#87CEFA',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
  },
  errorModal: {
    backgroundColor: '#fff',
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
