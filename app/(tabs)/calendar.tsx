import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { CalendarProvider, ExpandableCalendar, AgendaList } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';

const ITEMS = [
  { title: '2025-02-22', data: [{ name: 'Meeting with team', time: '10:00 AM' }] },
  { title: '2025-02-23', data: [{ name: 'Dentist Appointment', time: '10:00 AM', details: 'With Dr. Smith', location: '3200 Richards College' }] },
  { title: '2025-06-24', data: [{ name: 'Suggested: Dentist Appointment', time: '10:00 AM', details: 'With Dr. Smith', location: '3200 Richards College' }] },
  { title: '2025-02-30', data: [{ name: 'General Wellness Check-up', time: '10:00 AM', details: 'With Dr. Kim', location: '3200 Richards College' }] }
];

const ExpandableCalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', location: '', description: '' });

  const marked = useRef({
    '2025-02-22': { marked: true, dotColor: '#c72c41' },
    '2025-02-23': { marked: true, dotColor: '#c72c41' }
  });

  const theme = useRef({
    backgroundColor: '#fff',
    calendarBackground: '#fff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#c72c41',
    todayTextColor: '#c72c41',
    dayTextColor: '#2d4150',
    arrowColor: '#c72c41',
    monthTextColor: '#c72c41'
  });

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      {item.time && <Text style={styles.time}>{item.time}</Text>}
      {item.details && <Text style={styles.details}>{item.details}</Text>}
      {item.location && <Text style={styles.location}>{item.location}</Text>}
    </TouchableOpacity>
  ), []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <CalendarProvider date={'2025-02-22'} showTodayButton theme={{ todayButtonTextColor: '#c72c41' }}>
        
        {/* Expandable Calendar (Starts in Week View, Expands to Month View) */}
        <ExpandableCalendar 
          firstDay={1}
          markedDates={marked.current}
          theme={theme.current}
          hideArrows={false}
          disablePan={false} // Enables pull-down gesture
          disableWeekScroll={false} // Allows week scrolling
        />

        {/* Event List */}
        <AgendaList sections={ITEMS} renderItem={renderItem} sectionStyle={styles.section} />

      </CalendarProvider>

      {/* Floating "Add Event" Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <AntDesign name="pluscircleo" size={50} color="#c72c41" />
      </TouchableOpacity>

      {/* Modal for Adding Events */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput style={styles.input} placeholder="Title" value={newEvent.title} onChangeText={(text) => setNewEvent({ ...newEvent, title: text })} />
            <TextInput style={styles.input} placeholder="Time" value={newEvent.time} onChangeText={(text) => setNewEvent({ ...newEvent, time: text })} />
            <TextInput style={styles.input} placeholder="Location" value={newEvent.location} onChangeText={(text) => setNewEvent({ ...newEvent, location: text })} />
            <TextInput style={styles.input} placeholder="Description" value={newEvent.description} onChangeText={(text) => setNewEvent({ ...newEvent, description: text })} multiline />

            <View style={styles.buttonRow}>
              <Button title="Cancel" color="gray" onPress={closeModal} />
              <Button title="Add Event" color="#c72c41" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#c72c41',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
    rowGap: 10
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  time: {
    fontSize: 14,
    color: 'white'
  },
  details: {
    fontSize: 14,
    color: 'white'
  },
  location: {
    fontSize: 14,
    color: 'white'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c72c41'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#c72c41',
    paddingVertical: 8,
    marginBottom: 10
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
