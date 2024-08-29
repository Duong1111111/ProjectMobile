import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const backgroundImage = require('../assets/main.png');

export default function ShoeInfo({ route, navigation }) {
  const { shoe } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCart = () => {
    navigation.navigate('MyCart');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
      return;
    }
    setModalVisible(true);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chi Tiết Sản Phẩm</Text>
          <TouchableOpacity style={styles.cartButton} onPress={handleCart}>
            <Icon name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Image source={shoe.image} style={styles.shoeImage} />

        <View style={styles.card}>
          <Text style={styles.shoeStatus}>{shoe.status}</Text>
          <Text style={styles.shoeTitle}>{shoe.title}</Text>
          <Text style={styles.shoePrice}>{shoe.price}</Text>
          <Text style={styles.shoeDetail}>{shoe.detail}</Text>
        </View>

        {/* Header Title for Size Selection */}
        <Text style={styles.sizeHeader}>Chọn Size:</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeContainer}>
          {Array.from({ length: 17 }, (_, i) => 32 + i).map(size => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedSize && (
          <View style={styles.sizeQuantityContainer}>
            <Text style={styles.selectedSizeText}>Size đã chọn: {selectedSize}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.controlButton} onPress={decreaseQuantity}>
                <Icon name="remove" size={16} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={increaseQuantity}>
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Thêm Vào Giỏ Hàng</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={50} color="#4CAF50" style={styles.checkmarkIcon} />
              <Text style={styles.modalMessage}>Thêm vào giỏ hàng thành công!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  shoeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
    marginLeft: 60,
  },
  card: {
    backgroundColor: '#161F28',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  shoeStatus: {
    fontSize: 18,
    color: '#5B9EE1',
  },
  shoeTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  shoePrice: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  shoeDetail: {
    fontSize: 14,
    color: '#ccc',
  },
  sizeHeader: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeButton: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#87CEFA',
  },
  sizeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sizeQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectedSizeText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#87CEFA',
    borderRadius: 10,
    padding: 5,
  },
  quantity: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#87CEFA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  addToCartButtonText: {
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
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  checkmarkIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
});
