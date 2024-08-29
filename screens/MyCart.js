import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const backgroundImage = require('../assets/main.png');
const shoe7 = require('../assets/shoe7.png'); 
const shoe8 = require('../assets/shoe8.png'); 
const shoe9 = require('../assets/shoe9.png'); 

export default function MyCart() {
  const navigation = useNavigation();

  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [quantity3, setQuantity3] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [emptyCartModalVisible, setEmptyCartModalVisible] = useState(false);

  const price1 = 645.00;
  const price2 = 440.50;
  const price3 = 550.95;

  const shippingCost = 40.90;

  const [subtotal, setSubtotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const newSubtotal = (quantity1 * price1) + (quantity2 * price2) + (quantity3 * price3);
    setSubtotal(newSubtotal);
    setTotalCost(newSubtotal + shippingCost);

    if (newSubtotal <= 0) {
      setEmptyCartModalVisible(true);
    }
  }, [quantity1, quantity2, quantity3]);

  const handlePayment = () => {
    navigation.navigate('PaymentScreen', {
      subtotal,
      shippingCost,
      totalCost,
    });
  };

  const handleBack = () => {
    navigation.navigate('Main');
  };

  const increaseQuantity = (setter) => {
    setter(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = (setter) => {
    setter(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleRemoveItem = (setter, itemName) => {
    setItemToDelete({ setter, itemName });
    setModalVisible(true);
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm && itemToDelete) {
      itemToDelete.setter(0);
    }
    setItemToDelete(null);
    setModalVisible(false);
  };

  const handleCloseEmptyCartModal = () => {
    setEmptyCartModalVisible(false);
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cartContainer}>
        {quantity1 > 0 && (
          <View style={styles.cartItem}>
            <Image source={shoe7} style={styles.shoeImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Nike AirPump</Text>
              <Text style={styles.itemPrice}>${price1.toFixed(2)}</Text>
            </View>
            <View style={styles.sizeQuantityContainer}>
              <Text style={styles.itemSize}>Size 38</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.controlButton} onPress={() => decreaseQuantity(setQuantity1)}>
                  <Icon name="remove" size={12} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity1}</Text>
                <TouchableOpacity style={styles.controlButton} onPress={() => increaseQuantity(setQuantity1)}>
                  <Icon name="add" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.trashButton} onPress={() => handleRemoveItem(setQuantity1, 'Nike AirPump')}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {quantity2 > 0 && (
          <View style={styles.cartItem}>
            <Image source={shoe8} style={styles.shoeImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Nike Jordan 3M</Text>
              <Text style={styles.itemPrice}>${price2.toFixed(2)}</Text>
            </View>
            <View style={styles.sizeQuantityContainer}>
              <Text style={styles.itemSize}>Size 36</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.controlButton} onPress={() => decreaseQuantity(setQuantity2)}>
                  <Icon name="remove" size={12} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity2}</Text>
                <TouchableOpacity style={styles.controlButton} onPress={() => increaseQuantity(setQuantity2)}>
                  <Icon name="add" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.trashButton} onPress={() => handleRemoveItem(setQuantity2, 'Nike Jordan 3M')}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {quantity3 > 0 && (
          <View style={styles.cartItem}>
            <Image source={shoe9} style={styles.shoeImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Nike Jordan X</Text>
              <Text style={styles.itemPrice}>${price3.toFixed(2)}</Text>
            </View>
            <View style={styles.sizeQuantityContainer}>
              <Text style={styles.itemSize}>Size 45</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.controlButton} onPress={() => decreaseQuantity(setQuantity3)}>
                  <Icon name="remove" size={12} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity3}</Text>
                <TouchableOpacity style={styles.controlButton} onPress={() => increaseQuantity(setQuantity3)}>
                  <Icon name="add" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.trashButton} onPress={() => handleRemoveItem(setQuantity3, 'Nike Jordan X')}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
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
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>Bạn có chắc muốn xóa {itemToDelete?.itemName} ra khỏi giỏ hàng ?</Text>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={emptyCartModalVisible}
        onRequestClose={handleCloseEmptyCartModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>Không có sản phẩm nào trong giỏ hàng</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseEmptyCartModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
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
    backgroundColor: '#212121',
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
  cartContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  shoeImage: {
    width: 40,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 2,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#fff',
    fontSize: 14,
  },
  sizeQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSize: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#87CEFA',
    borderRadius: 10,
    padding: 5,
  },
  quantity: {
    color: '#fff',
    marginHorizontal: 5,
  },
  trashButton: {
    padding: 10,
  },
  summaryContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    fontSize: 14,
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
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  closeButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
});
