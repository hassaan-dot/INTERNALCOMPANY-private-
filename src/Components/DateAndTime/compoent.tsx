import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import {styles} from './styles'
type Mode = 'date' | 'time';

const DateTimeSelector = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<Mode>('date');
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: Mode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log('Hassaam')
    setShow(true);

    // showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select Date and Time</Text> */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={showDatepicker} style={styles.button}>
          <Text style={styles.buttonText}>{format(date, 'dd MMM yyyy')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={showTimepicker} style={styles.button}>
          <Text style={styles.buttonText}>{format(date, 'HH:mm')}</Text>
        </TouchableOpacity>
      </View>

      {!show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          // display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


export default DateTimeSelector;