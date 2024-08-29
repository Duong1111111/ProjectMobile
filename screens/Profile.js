import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/main.png');
const defaultProfileImage = require('../assets/shoe1.png'); // Đặt ảnh profile mặc định

// Đường dẫn đến các ảnh trong assets
const images = [
  require('../assets/shoe1.png'),
  require('../assets/shoe2.png'),
  require('../assets/shoe3.png'),
  require('../assets/shoe4.png'),
  require('../assets/shoe5.png'),
  require('../assets/shoe6.png'),
  require('../assets/shoe7.png'),
  require('../assets/shoe8.png'),
  require('../assets/shoe9.png'),
];

export default function Profile() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(defaultProfileImage);
  const [pressedTab, setPressedTab] = useState('');

  useEffect(() => {
    // Load saved data when component mounts
    const loadData = async () => {
      try {
        const savedFullName = await AsyncStorage.getItem('fullName');
        const savedGender = await AsyncStorage.getItem('gender');
        const savedPhone = await AsyncStorage.getItem('phone');
        const savedBirthDate = await AsyncStorage.getItem('birthDate');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedProfileImage = await AsyncStorage.getItem('profileImage');

        if (savedFullName) setFullName(savedFullName);
        if (savedGender) setGender(savedGender);
        if (savedPhone) setPhone(savedPhone);
        if (savedBirthDate) setBirthDate(savedBirthDate);
        if (savedEmail) setEmail(savedEmail);
        if (savedProfileImage) setSelectedImage({ uri: savedProfileImage });
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };

    loadData();
  }, []);

  const handleSaveData = async () => {
    try {
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('birthDate', birthDate);
      await AsyncStorage.setItem('email', email);
      if (selectedImage.uri) {
        await AsyncStorage.setItem('profileImage', selectedImage.uri);
      }
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const handleGoBack = () => {
    handleSaveData(); // Save data when navigating back
    navigation.goBack();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEmailChange = (text) => {
    setEmail(text); // Bỏ kiểm tra định dạng email
  };

  const handleTabPress = (tab) => {
    setPressedTab(tab);
    setTimeout(() => setPressedTab(''), 200); 
  };

  const handleFullNameChange = (text) => {
    const namePattern = /^[\p{L}\s]*$/u; 
    if (namePattern.test(text)) {
      setFullName(text);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectImage = async (image) => {
    setSelectedImage(image);
    toggleModal();
  
    try {
      if (image.uri) {
        await AsyncStorage.setItem('profileImage', image.uri);
      }
    } catch (error) {
      console.error('Failed to save image', error);
    }
  };
  

  const handleBirthDateChange = (text) => {
   
    let cleanedText = text.replace(/[^0-9]/g, '');
    
    if (cleanedText.length > 8) {
      cleanedText = cleanedText.slice(0, 8);
    }
    
    if (cleanedText.length >= 5) {
      cleanedText = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4) + '/' + cleanedText.slice(4, 8);
    } else if (cleanedText.length >= 3) {
      cleanedText = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4);
    } else if (cleanedText.length >= 1) {
      cleanedText = cleanedText.slice(0, 2);
    }
  
    setBirthDate(cleanedText);
  };
  

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Xong' : 'Chỉnh sửa'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={selectedImage} style={styles.profileImage} />
          {isEditing && (
            <TouchableOpacity style={styles.cameraButton} onPress={toggleModal}>
              <Icon name="camera" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.userName}>{fullName}</Text>
        
        <ScrollView style={styles.infoContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>Họ và tên</Text>
            <TextInput 
              style={[styles.textInput, { color: isEditing ? '#888' : '#fff' }]}
              value={fullName}
              onChangeText={handleFullNameChange}
              editable={isEditing}
              placeholder="Nhập họ và tên"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>Giới tính</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                enabled={isEditing}
                style={[styles.picker, { color: isEditing ? '#888' : '#fff' }]}
                itemStyle={styles.pickerItem}
                dropdownIconColor="#fff" 
              >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
                <Picker.Item label="Khác" value="Khác" />
              </Picker>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>Số điện thoại</Text>
            <TextInput 
              style={[styles.textInput, { color: isEditing ? '#888' : '#fff' }]}
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, '').slice(0, 11))}
              editable={isEditing}
              keyboardType="numeric"
              placeholder="Nhập số điện thoại"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>Ngày sinh</Text>
            <TextInput 
                style={[styles.textInput, { color: isEditing ? '#888' : '#fff' }]}
                value={birthDate}
                onChangeText={handleBirthDateChange}
                editable={isEditing}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
            />

          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldHeader}>Email</Text>
            <TextInput 
              style={[styles.textInput, { color: isEditing ? '#888' : '#fff' }]}
              value={email}
              onChangeText={handleEmailChange}
              editable={isEditing}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>
        </ScrollView>
      </View>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <FlatList
            data={images}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectImage(item)}>
                <Image source={item} style={styles.modalImage} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
            <Text style={styles.modalCloseButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('Main')}>
          <Icon name="home" size={24} color={pressedTab === 'home' ? '#87CEFA' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('FavoriteScreen')}>
          <Icon name="heart" size={24} color={pressedTab === 'heart' ? '#87CEFA' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButtonCart} 
          onPress={() => navigation.navigate('MyCart')}>
          <Icon name="cart" size={35} color={pressedTab === 'profile' ? '#87CEFA' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('NotificationScreen')}>
          <Icon name="notifications" size={24} color={pressedTab === 'profile' ? '#87CEFA' : '#fff'} />
        </TouchableOpacity>


        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={24} color={pressedTab === 'profile' ? '#87CEFA' : '#fff'} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: '#87CEFA',
    fontSize: 16,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 110,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',     
  },
  profileImage: {
    width: '100%',
    height: '80%',
  },
  cameraButton: {
    position: 'absolute',
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    flexGrow:0
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
    fontWeight:'bold',
    marginLeft:5

  },
  textInput: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius:20
  },
  pickerWrapper: {
    backgroundColor: '#333', 
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    borderRadius:20
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#fff',
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center',
    color: '#fff', 
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImageContainer: {
    margin: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#87CEFA',
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  tabButtonCart: {
    backgroundColor: '#87CEFA', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

