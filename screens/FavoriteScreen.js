import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/main.png');
const favoriteImage1 = require('../assets/shoe3.png');
const favoriteImage2 = require('../assets/shoe7.png');
const favoriteImage3 = require('../assets/shoe8.png');
const favoriteImage4 = require('../assets/shoe9.png');

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [pressedTab, setPressedTab] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      setShowFavorites(false);
    }
    setModalVisible(false);
  };

  const handleTabPress = (tab) => {
    setPressedTab(tab);
    setTimeout(() => setPressedTab(''), 200); 
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Favorites</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      </View>

      {showFavorites ? (
        <View style={styles.shoeRow}>
          <View style={styles.shoeCard}>
            <Image source={favoriteImage1} style={styles.shoeImage} />
            <Text style={styles.shoeTitle}>Nike Air Jordan</Text>
            <Text style={styles.shoePrice}>$849.69</Text>
          </View>
          <View style={styles.shoeCard}>
            <Image source={favoriteImage2} style={styles.shoeImage} />
            <Text style={styles.shoeTitle}>Nike Air Max</Text>
            <Text style={styles.shoePrice}>$600.00</Text>
          </View>
          <View style={styles.shoeCard}>
            <Image source={favoriteImage3} style={styles.shoeImage} />
            <Text style={styles.shoeTitle}>Nike UltrAir</Text>
            <Text style={styles.shoePrice}>$580.00</Text>
          </View>
          <View style={styles.shoeCard}>
            <Image source={favoriteImage4} style={styles.shoeImage} />
            <Text style={styles.shoeTitle}>Nike Jordan-X</Text>
            <Text style={styles.shoePrice}>$420.00</Text>
          </View>
        </View>
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>Hiện tại không có sản phẩm ưa thích</Text>
        </View>
      )}

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>Bạn có muốn xóa hết sản phẩm yêu thích?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={() => handleConfirmDelete(true)}>
                <Text style={styles.buttonText}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => handleConfirmDelete(false)}>
                <Text style={styles.buttonText}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between', 
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  deleteText: {
    color: '#87CEFA',
    fontSize: 18,
  },
  shoeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 300, 
  },
  shoeCard: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    width: '48%',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom:20
  },
  shoeImage: {
    width: 100,
    height: 60,
  },
  shoeTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  shoePrice: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom:110
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalMessage: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  noFavoritesContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
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
