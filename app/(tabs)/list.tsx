import { FlatList, Animated, Dimensions, StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image, ImageBackground, } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
interface ItemProps {
  time: string;
  title: string;
  tag: string;
}

const SLIDER_DATA = [
  {
    time: '1',
    title: 'Company 1',
    tag: 'tag 1',
    amountInvested: 200,
  },
  {
    time: '2', 
    title: 'Company 2',
    tag: 'tag 1',
    amountInvested: 50,
  },
  {
    time: '3',
    title: 'Company 3',
    tag: 'tag 1',
    amountInvested: 70,
  },
  {
    time: '4',
    title: 'Company 4',
    tag: 'tag 1',
    amountInvested: 80,
  },
  {
    time: '5',
    title: 'Company 5',
    tag: 'tag 1',
  },
  {
    time: '6',
    title: 'Company 6',
    tag: 'tag 1',
  },
  {
    time: '7',
    title: 'Company 7',
    tag: 'tag 1',
  },
  {
    time: '8',
    title: 'Company 8',
    tag: 'tag 1',
  },
];

const { width, height } = Dimensions.get('screen');

const Dashboard = () => {
  const [infoContainerHeight, setInfoContainerHeight] = useState(0);

  const scrollX = React.useRef(new Animated.Value(0)).current; 

  const renderItem = React.useCallback(
    ({ item }: { item: ItemProps }) => {
      return (
        <View style={styles.infoBoxContainer}>
          <View style={styles.infoPerContainer}>
            <Text style={styles.infoPerText}>{item.time}</Text>
          </View>

          <View style={styles.infoCompanyContainer}>
            <Text style={styles.infoCompanyText}>{item.title}</Text>
          </View>

          <View style={styles.infoTagContainer}>
            <Text style={styles.infoTagText}>{item.tag}</Text>
            <Text style={styles.infoTagText}>Tag 2</Text>
            <Text style={styles.infoTagText}>Tag 3</Text>
          </View>
        </View>
      );
    },
    [width],
  );


  

  const timeExtractor = React.useCallback((item: ItemProps) => item.time, []);

  return (
  

<SafeAreaView style={styles.container}>
<ImageBackground 
      source={require('@/assets/images/graphBG.png')} 
      style={styles.background}
      resizeMode="contain" 
    >
    <View style={styles.titleContainer}>
        <Text style={styles.titleContainer}>Good Morning, Doctor!</Text>
    </View>

  <View style={styles.rowContainer}>
    <View style={styles.totalContainer}>
      <Text>Doctor's Orders</Text>
    </View>
    </View>

  <View 
    style={styles.infoContainer}
    onLayout={event => {
      const { height } = event.nativeEvent.layout;
      setInfoContainerHeight(height);
    }}
  >      
    <FlatList
      data={SLIDER_DATA}
      timeExtractor={timeExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
          useNativeDriver: false,
        },
      )}
      style={styles.flatList}
      bounces={false}
      decelerationRate={'normal'}
      scrollEventThrottle={16}
      renderItem={renderItem}
    />
    <TouchableOpacity style={styles.aidContainer}>
        <FontAwesome6 name="hand-holding-medical" size={18} color="black" />
        <Text>Need Aid?</Text>
    </TouchableOpacity>
  </View>
  
  </ImageBackground>

</SafeAreaView>

  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 10,
    right: 0,
    left: 0,
    paddingTop: height / 20,
    width: width,
    bottom: 0,
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: '#A50034',
  },
  titleContainer: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white', 
    paddingHorizontal: 10,
    marginTop: -10,
  },
  rowContainer: {
    position: 'absolute',
    bottom: height / 1.56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 2,
  },
  totalContainer: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,

    borderColor: "black",
    borderWidth: 2,
    zIndex: 2,
    alignSelf: 'center',
  },
  infoContainer: {
    backgroundColor: "#F5F5F5",
    position: 'absolute',
    bottom: 0,
    height: height / 1.47,
    width: '100%',
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    paddingTop: 35,
    zIndex: 0,
  },
  infoBoxContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: "#FDF8E1",
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  aidContainer: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    flexDirection: 'row', 
    alignItems: 'center',  
    gap: 10,  
  
    // Absolute positioning for bottom-right placement
    position: 'absolute',
    bottom: 20,   // Adjust as needed
    right: 20,    // Adjust as needed
    zIndex: 3,
  },
  aidText: {
    fontSize: 16,
    color: 'black',
  },
  
  infoPerContainer: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: "#C72C41",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  infoPerText: {
    fontSize: 20,
    color: 'black',
    margin: 10,
  },
  infoCompanyContainer: {
    margin: 10,
    alignSelf: 'center',
  },
  infoCompanyText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  infoTagContainer: {
    margin: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    maxWidth: 100,
  },
  infoTagText: {
    fontSize: 10,
    color: 'black',
    margin: 10,
  },
  flatList: {
    flex: 1,
  },
});