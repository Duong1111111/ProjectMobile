import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/main.png'); 
const shoeImage1 = require('../assets/shoe1.png'); 
const shoeImage2 = require('../assets/shoe2.png'); 

export default function Notification({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pressedTab, setPressedTab] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [notifications, setNotifications] = useState({
    today: [],
    yesterday: []
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const todayNotifications = [
          { id: 1, message: 'Có giày mới trong cửa hàng! Xem ngay!', time: '10 phút trước', image: shoeImage1 },
        ];

        const yesterdayNotifications = [
          { id: 3, message: 'Đơn hàng của bạn đã được hủy!', time: '1 ngày trước', image: shoeImage2 },
          { id: 4, message: 'Thêm thành công Nike Air Max vào giỏ hàng!', time: '2 ngày trước', image: shoeImage2 },
        ];

        const readNotifications = await AsyncStorage.getItem('readNotifications');
        const readNotificationIds = readNotifications ? JSON.parse(readNotifications) : [];

        setNotifications({
          today: todayNotifications.map(notification => ({
            ...notification,
            read: readNotificationIds.includes(notification.id)
          })),
          yesterday: yesterdayNotifications.map(notification => ({
            ...notification,
            read: readNotificationIds.includes(notification.id)
          }))
        });
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  const handleTabPress = (tab) => {
    setPressedTab(tab);
    setTimeout(() => setPressedTab(''), 200); 
  };

  const handleDelete = () => {
    setModalMessage('Bạn có muốn xóa toàn bộ thông báo?');
    setModalVisible(true);
  };

  const handleConfirmDelete = async (confirm) => {
    if (confirm) {
      setModalMessage('Xóa thành công!');
      setModalSuccess(true);
      setShowNotifications(false); 
      await AsyncStorage.removeItem('readNotifications');
    } else {
      setModalMessage('');
    }
    setModalVisible(false);
  };

  const handleNotificationPress = async (id) => {
    // Navigate to ShoeInfo page
    if (id === 1) {
      navigation.navigate('ShoeInfo', {
        shoe: {
          image: require('../assets/shoe1.png'),
          status: 'Popular Shoe',
          title: 'Nike Jordan',
          price: '$493.00',
          detail: 'Nâng tầm phong cách và hiệu suất với Nike Jordan. Thiết kế đẳng cấp, công nghệ tiên tiến, mang đến sự mạnh mẽ và tự tin trong từng bước chân.',
        },
      });
    }

    // Update read status
    const newNotifications = { ...notifications };
    if (id) {
      const todayIndex = newNotifications.today.findIndex(n => n.id === id);
      if (todayIndex !== -1) {
        newNotifications.today[todayIndex].read = true;
      }
      const yesterdayIndex = newNotifications.yesterday.findIndex(n => n.id === id);
      if (yesterdayIndex !== -1) {
        newNotifications.yesterday[yesterdayIndex].read = true;
      }
      setNotifications(newNotifications);

      // Save read status to AsyncStorage
      const readNotificationIds = [
        ...newNotifications.today.filter(n => n.read).map(n => n.id),
        ...newNotifications.yesterday.filter(n => n.read).map(n => n.id),
      ];
      await AsyncStorage.setItem('readNotifications', JSON.stringify(readNotificationIds));
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      </View>

      {showNotifications ? (
        <>
          {notifications.today.length > 0 && (
            <>
              <Text style={styles.subText1}>Hôm nay</Text>
              <View style={styles.notificationsContainer}>
                {notifications.today.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={styles.notificationItem}
                    onPress={() => handleNotificationPress(notification.id)}
                  >
                    <View style={styles.shoeImageContainer}>
                      <Image source={notification.image} style={styles.shoeImage} />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={[
                        styles.notificationMessage,
                        notification.read && styles.readNotification
                      ]}>
                        {notification.message}
                      </Text>
                      <Text style={[
                        styles.notificationTime,
                        notification.read && styles.readNotificationTime
                      ]}>
                        {notification.time}
                      </Text>
                    </View>
                    <View style={[
                      styles.statusIndicator,
                      notification.read && styles.statusIndicatorRead
                    ]} />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {notifications.yesterday.length > 0 && (
            <>
              <Text style={styles.subText2}>Hôm qua</Text>
              <View style={styles.notificationsContainer}>
                {notifications.yesterday.map((notification) => (
                  <View
                    key={notification.id}
                    style={styles.notificationItem}
                  >
                    <View style={styles.shoeImageContainer}>
                      <Image source={notification.image} style={styles.shoeImage} />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={[
                        styles.disabledNotificationMessage,
                        notification.read && styles.readNotification
                      ]}>
                        {notification.message}
                      </Text>
                      <Text style={[
                        styles.disabledNotificationTime,
                        notification.read && styles.readNotificationTime
                      ]}>
                        {notification.time}
                      </Text>
                    </View>
                    <View style={[
                      styles.disabledStatusIndicator,
                      notification.read && styles.statusIndicatorRead
                    ]} />
                  </View>
                ))}
              </View>
            </>
          )}

          {(notifications.today.length === 0 && notifications.yesterday.length === 0) && (
            <Text style={styles.noNotificationsText}>Hiện chưa có thông báo</Text>
          )}
        </>
      ) : (
        <Text style={styles.noNotificationsText}>Hiện chưa có thông báo</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={() => handleConfirmDelete(true)}
              >
                <Text style={styles.buttonText}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => handleConfirmDelete(false)}
              >
                <Text style={styles.buttonText}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subText1: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:20,
    marginHorizontal: 20,
    marginTop: -250, 
    marginBottom:10,
    marginLeft:-250
  },
  subText2: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:20,
    marginHorizontal: 20,
    marginTop: 20, 
    marginBottom:10,
    marginLeft:-250
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  deleteText: {
    color: '#87CEFA',
    fontSize: 18,
  },
  notificationsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  shoeImageContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  shoeImage: {
    width: 40,
    height: 30,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  notificationMessage: {
    color: '#fff',
    fontSize: 16,
  },
  notificationTime: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#87CEFA',
    marginLeft: 10,
  },
  statusIndicatorSelected: {
    backgroundColor: '#ccc',
  },
  selectedNotification: {
    color: '#ccc',
  },
  disabledNotificationMessage: {
    color: '#aaa',
    fontSize: 16,
  },
  disabledNotificationTime: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  disabledStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#aaa',
    marginLeft: 10,
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
  noNotificationsText: {
    color: '#fff',
    fontSize: 18,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
