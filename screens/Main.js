import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/main.png');
const shoeImage1 = require('../assets/shoe1.png');
const shoeImage2 = require('../assets/shoe2.png');
const shoeImage3 = require('../assets/shoe3.png');
const shoeImage4 = require('../assets/shoe4.png');
const shoeImage5 = require('../assets/shoe5.png');
const shoeImage6 = require('../assets/shoe6.png');
const shoeImage7 = require('../assets/shoe7.png');
const shoeImage8 = require('../assets/shoe8.png');
const nikeLogo = require('../assets/smallnikelogo.png');




export default function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const [pressedTab, setPressedTab] = useState('');
  const [isAddToCartVisible, setAddToCartVisible] = useState(false);
  const [isAddToCartSuccessVisible, setAddToCartSuccessVisible] = useState(false);
  const navigation = useNavigation();
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showLogoutConfirm = () => {
    setModalVisible(false);
    setLogoutConfirmVisible(true);
  };

  const handleLogout = () => {
    setLogoutConfirmVisible(false);
    navigation.navigate('Login');
  };

  const handleTabPress = (tab) => {
    setPressedTab(tab);
    setTimeout(() => setPressedTab(''), 200); 
  };

  const showAddToCartConfirm = () => {
    setAddToCartVisible(true);
  };

  const handleAddToCart = () => {
    setAddToCartVisible(false);
    setAddToCartSuccessVisible(true);
    setTimeout(() => setAddToCartSuccessVisible(false), 1000);
  };

  const highlightText = (text, query) => {
    if (!query) return <Text>{text}</Text>;
  
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.highlight}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={toggleModal}>
            <Icon name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <TouchableOpacity style={styles.modalOverlay1} onPress={toggleModal}>
            <View style={styles.modalContainer1}>
              <TouchableOpacity style={styles.modalItem1}>
                <Icon name="settings-outline" size={20} color="#fff" style={styles.modalIcon1} />
                <Text style={styles.modalText1}>Cài đặt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem1} onPress={showLogoutConfirm}>
                <Icon name="exit-outline" size={20} color="red" style={styles.modalIcon1} />
                <Text style={styles.modalText1}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          transparent={true}
          visible={isLogoutConfirmVisible}
          animationType="fade"
          onRequestClose={() => setLogoutConfirmVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay1} onPress={() => setLogoutConfirmVisible(false)}>
            <View style={styles.modalContainer1}>
              <Text style={styles.modalText1}>Bạn có chắc muốn đăng xuất?</Text>
              <View style={styles.modalActions1}>
                <TouchableOpacity style={styles.modalButton1} onPress={handleLogout}>
                  <Text style={styles.modalButtonText1}>Có</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton1} onPress={() => setLogoutConfirmVisible(false)}>
                  <Text style={styles.modalButtonText1}>Không</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          transparent={true}
          visible={isAddToCartVisible}
          animationType="fade"
          onRequestClose={() => setAddToCartVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay2} onPress={() => setAddToCartVisible(false)}>
            <View style={styles.modalContainer2}>
              <Text style={styles.modalText2}>Bạn có muốn thêm vào mục yêu thích?</Text>
              <View style={styles.modalActions2}>
                <TouchableOpacity style={styles.modalButton2} onPress={handleAddToCart}>
                  <Text style={styles.modalButtonText2}>Có</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton2} onPress={() => setAddToCartVisible(false)}>
                  <Text style={styles.modalButtonText2}>Không</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          transparent={true}
          visible={isAddToCartSuccessVisible}
          animationType="fade"
        >
          <View style={styles.modalOverlay2}>
            <View style={styles.modalContainer2}>
              <Text style={styles.modalText2}>Đã thêm mục yêu thích thành công</Text>
            </View>
          </View>
        </Modal>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter shoe name"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.nikeButton}>
            <Image source={nikeLogo} style={styles.nikeLogo} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.shoeContainer}>
            <Text style={styles.sectionTitle1}>Popular Shoes</Text>
            <View style={styles.shoeRow}>
              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage1,status:'Popular Shoes', title:'Nike Jordan', price: '$493.00', detail:'Nâng tầm phong cách và hiệu suất với Nike Jordan. Thiết kế đẳng cấp, công nghệ tiên tiến, mang đến sự mạnh mẽ và tự tin trong từng bước chân.' }})}>
                <Image source={shoeImage1} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Jordan', searchQuery)}</Text>
                <Text style={styles.shoePrice}>$493.00</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage2,status:'Popular Shoes', title: 'Nike Air Max', price: '$897.99' ,detail:'Nike Air Max - phong cách hiện đại, êm ái tối đa. Thiết kế đột phá với bộ đệm khí giúp bạn tự tin nổi bật trên mọi hành trình.'}})}>
                <Image source={shoeImage2} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Air Max',searchQuery)}</Text>
                <Text style={styles.shoePrice}>$897.99</Text>
              </TouchableOpacity>
            </View>



            <Text style={styles.sectionTitle2}>New Arrivals</Text>
            <View style={styles.shoeRow}>
              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage3,status:'New Arrivals', title: 'Nike Air Jordan', price: '$849.69',detail:'Nike Air Jordan - biểu tượng của sự mạnh mẽ và phong cách vượt thời gian. Với thiết kế sắc sảo và hiệu suất vượt trội, mỗi bước chân đều khẳng định cá tính và đẳng cấp.' }})}>
                <Image source={shoeImage3} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Air Jordan',searchQuery)}</Text>
                <Text style={styles.shoePrice}>$849.69</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage4, status:'New Arrivals',title: 'Nike Air Force', price: '$699.00',detail:'Nike Air Force - sự kết hợp hoàn hảo giữa chất cổ điển và nét hiện đại. Với thiết kế bền bỉ và phong cách tinh tế, Air Force mang đến vẻ ngoài năng động, tự tin cho mọi dịp.' }})}>
                <Image source={shoeImage4} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Air Force',searchQuery)}</Text>
                <Text style={styles.shoePrice}>$699.00</Text>
              </TouchableOpacity>
            </View>



            <Text style={styles.sectionTitle3}>Best Seller</Text>
            <View style={styles.shoeRow}>
              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage5,status:'Best Seller', title: 'Nike Air Fink', price: '$550.45',detail:'Nike Air Pink - sự kết hợp hoàn hảo giữa sắc màu tươi sáng và thiết kế thể thao thanh lịch. Với gam màu hồng nổi bật và sự thoải mái vượt trội, mỗi bước chân của bạn đều thêm phần nổi bật và tự tin.' }})}>
                <Image source={shoeImage5} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Air Pink',searchQuery)}</Text>
                <Text style={styles.shoePrice}>$550.45</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage6,status:'Best Seller', title: 'Nike Sport-Max', price: '$620.00',detail:'Nike Sport-Max - sự pha trộn hoàn hảo giữa hiệu suất và phong cách thể thao. Với thiết kế năng động và công nghệ đệm vượt trội, Sport-Max mang đến sự hỗ trợ tối đa và vẻ ngoài hiện đại cho mọi hoạt động.' }})}>
                <Image source={shoeImage6} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Sport-Max',searchQuery)}</Text>
                <Text style={styles.shoePrice}>$620.00</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle3}>Sale Off</Text>
            <View style={styles.shoeRow}>
              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage7,status:'Sale Off', title: 'Nike AirPump', price: '$390.00',detail:'Nike Air Pump - sự đổi mới trong thiết kế và hiệu suất. Với công nghệ bơm khí độc quyền, Air Pump mang đến sự vừa vặn tùy chỉnh hoàn hảo và cảm giác thoải mái tối đa cho mỗi bước chân.' }})}>
                <Image source={shoeImage7} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton2} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike AirPump',searchQuery)}</Text>
                <Text style={[styles.shoePrice, styles.strikethrough]}>$420.00</Text>
                <Text style={styles.shoePrice}>$390.00</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shoeCard}
              onPress={() => navigation.navigate('ShoeInfo', { shoe: { image: shoeImage8, status:'Sale Off',title: 'Nike Jordan 3M', price: '$420.00',detail:'Nike Jordan 3M - sự kết hợp giữa phong cách đẳng cấp và công nghệ tiên tiến. Với chất liệu phản quang 3M độc quyền và thiết kế nổi bật, Jordan 3M không chỉ thu hút ánh nhìn mà còn mang đến sự hỗ trợ và thoải mái vượt trội.' }})}>
                <Image source={shoeImage8} style={styles.shoeImage} />
                <TouchableOpacity style={styles.plusButton2} onPress={showAddToCartConfirm}>
                  <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.shoeTitle}>{highlightText('Nike Jordan 3M',searchQuery)}</Text>
                <Text style={[styles.shoePrice, styles.strikethrough]}>$580.00</Text>
                <Text style={styles.shoePrice}>$420.00</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginRight:10
  },
  optionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#87CEFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#333',
    borderRadius: 25,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
  nikeButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  nikeLogo: {
    width: 30,
    height: 30,
  },
  shoeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle1: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  sectionTitle2: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle3: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  shoeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shoeCard: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    width: '48%',
    alignItems: 'center',
    paddingTop:10
  },
  shoeImage: {
    width: 100,
    height:60,
  },
  plusButton: {
    backgroundColor: '#87CEFA',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    right: 0,
  },
  plusButton2: {
    backgroundColor: '#87CEFA',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    right: 0,
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
    backgroundColor: '#87CEFA', // Màu xanh cho hình tròn
    width: 50, // Chiều rộng của hình tròn
    height: 50, // Chiều cao của hình tròn
    borderRadius: 25, // Để tạo hình tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText1: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  modalActions1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton1: {
    backgroundColor: '#87CEFA',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginRight:30
  },
  modalButtonText1: {
    color: '#fff',
    fontSize: 14,
  },
  modalItem1: {
    flexDirection: 'row',
    padding: 10,
  },
  modalIcon1: {
    marginRight: 10,
  },
  modalOverlay2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer2: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText2: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
   
  },
  modalActions2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton2: {
    backgroundColor: '#87CEFA',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginRight:30
  },
  modalButtonText2: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer:{
    paddingBottom:80
  },
  shoePrice: {
    fontSize: 16,
    color: '#fff', 
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'rgba(0, 0, 0, 0.5)', 
    opacity: 0.6, 
  },
  highlight: {
    backgroundColor: 'yellow',
    color: 'black', 
  },
});
