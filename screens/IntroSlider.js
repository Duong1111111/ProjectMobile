import React from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'screen1',
    title1: 'Come along',
    title2: 'With us',
    text1: '  Smart, Gorgeous & Fashionable',
    text2: 'Collection',
    image: require('../assets/sc1.png'),
  },
  {
    key: 'screen2',
    title1: 'Dynamic and',
    title2: 'Enthusiastic',
    text1: 'Suitable for all types of activities',
    image: require('../assets/sc2.png'),
  },
  {
    key: 'screen3',
    title1: 'Join us now',
    title2: 'This Summer',
    text1: 'Get it now & make it wow',
    image: require('../assets/sc3.png'),
  },
];

export default function IntroSlider({ navigation }) {
  const renderSlide = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.container} resizeMode="cover">
        <Text style={styles.text1}>{item.title1}</Text>
        <Text style={styles.text2}>{item.title2}</Text>
        <Text style={styles.text3}>{item.text1}</Text>
        {item.text2 && <Text style={styles.text4}>{item.text2}</Text>}
        {item.key === 'screen3' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Bắt đầu</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      dotContainerStyle={styles.dotContainerStyle} 
      paginationStyle={styles.paginationStyle}

    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    right: 100,
    backgroundColor: '#87CEFA',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text1: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 300,
  },
  text2: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    marginBottom: 20,
  },
  text3: {
    color: '#46BCFC',
    fontSize: 20,
    marginLeft: 30,
  },
  text4: {
    color: '#46BCFC',
    fontSize: 20,
    marginLeft: 40,
  },
  dotStyle: {
    backgroundColor: '#fff',
    
  },
  activeDotStyle: {
    backgroundColor: '#87CEFA',
    paddingLeft:40,
    flexDirection:'row',

  },
  dotContainerStyle: {
    position: 'absolute',
    
  },

  paginationStyle:{
    
  }
});
