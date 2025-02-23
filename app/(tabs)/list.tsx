import { FlatList, Animated, Dimensions, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Button, Modal, TextInput  } from 'react-native'
import React, { useState } from 'react'
import { Image, ImageBackground, } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Feather from '@expo/vector-icons/Feather';

interface ItemProps {
  title: string;
  tag: string;
}

const openModal = () => setModalVisible(true);
const closeModal = () => setModalVisible(false);

const SLIDER_DATA = [
  { title: 'Take 1 Pill', tag: 'tag 1' },
  { title: 'Dink 8 glasses of water', tag: 'tag 1' },
  { title: 'Take X number of Y pills', tag: 'tag 1' },
  { title: 'Get plenty of rest', tag: 'tag 1' },
  { title: 'Rehabilitation Excercises', tag: 'tag 1' },
  { title: 'Stretch', tag: 'tag 1' },
  { title: 'Use medication before bed', tag: 'tag 1' },
];

const { width, height } = Dimensions.get('screen');

const Dashboard = () => {
  const [infoContainerHeight, setInfoContainerHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // For Add Task Modal
  const [editModalVisible, setEditModalVisible] = useState(false); // For Edit Task Modal
  const [task, setTask] = useState('');
  const [medicalSupplies, setMedicalSupplies] = useState('');
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null); // Track the item being edited

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openEditModal = (item: ItemProps) => {
    setSelectedItem(item); // Set the selected item for editing
    setTask(item.title); // Pre-fill the task input with the current title
    setMedicalSupplies(item.tag); // Pre-fill the medical supplies input with the current tag
    setEditModalVisible(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedItem(null);
    setTask('');
    setMedicalSupplies('');
  };

  const handleAddTask = () => {
    if (task.trim() && medicalSupplies.trim()) {
      // Add the new task to your data (e.g., SLIDER_DATA)
      console.log('Task:', task, 'Medical Supplies:', medicalSupplies);
      closeModal();
      setTask('');
      setMedicalSupplies('');
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handleEditTask = () => {
    if (task.trim() && medicalSupplies.trim() && selectedItem) {
      // Update the selected item in your data (e.g., SLIDER_DATA)
      console.log('Updated Task:', task, 'Updated Medical Supplies:', medicalSupplies);
      closeEditModal();
    } else {
      alert('Please fill in both fields.');
    }
  };

  const renderItem = React.useCallback(
    ({ item }: { item: ItemProps }) => {
      return (
        <View style={styles.infoBoxContainer}>
          <View style={styles.infoPerContainer}>
          <BouncyCheckbox style={styles.infoPerText}
            size={25}
            unFillColor="#FFFFFF"
            fillColor='#C72C41'
            text={item.title}
            innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
            onPress={(isChecked: boolean) => {console.log(isChecked)}}
            />
          </View>


          <View style={styles.infoButtonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => console.log("Delete", item.title)}>
              <Feather name="trash" size={24} color="black" />
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.addTaskButton} onPress={openModal}>
            <FontAwesome6 name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={styles.infoContainer}
          onLayout={(event) => {
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
              { useNativeDriver: false },
            )}
            style={styles.flatList}
            bounces={false}
            decelerationRate={'normal'}
            scrollEventThrottle={16}
            renderItem={renderItem}
          />
         
        </View>
      </ImageBackground>

      {/* Modal for Adding Task */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task"
              value={task}
              onChangeText={setTask}
            />
            <TextInput
              style={styles.input}
              placeholder="Medical Supplies"
              value={medicalSupplies}
              onChangeText={setMedicalSupplies}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Task */}
      <Modal
        transparent={true}
        visible={editModalVisible}
        animationType="fade"
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task"
              value={task}
              onChangeText={setTask}
            />
            <TextInput
              style={styles.input}
              placeholder="Medical Supplies"
              value={medicalSupplies}
              onChangeText={setMedicalSupplies}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeEditModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleEditTask}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
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
    alignContent: 'space-between',
  },
    titleButton: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 10,

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
    marginBottom: 5,
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
    paddingTop: 35,
    zIndex: 0,
  },
  infoBoxContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    dropShadow: 30,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
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
    borderRadius: 10,
    margin: 10,
    fontSize: 50,
    flexDirection: 'row',  // Ensures checkbox and text are side by side
    alignItems: 'center',  // Keeps them vertically aligned
     padding: 10,
    
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
  infoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100, // Fixed width for consistent alignment
    marginLeft: 'auto', // Pushes buttons to the right side
    marginRight: 10,
  },
  
  editButton: {
    backgroundColor: '#D9D9D9', // Gold color for Edit
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5, // Spacing between buttons
  },
  
  deleteButton: {
    backgroundColor: '#C72C41', // Red color for Delete
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  infoTagText: {
    fontSize: 10,
    color: 'black',
    margin: 10,
  },
  flatList: {
    flex: 1,
  },
  addTaskButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C72C41',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 5,
    right: 40,
    dropShadow: 30,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#C72C41',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});