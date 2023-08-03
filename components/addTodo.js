import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';

export default function AddTodo({ submitHandler }) {
    const [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }
    const handleAddTodo = () => {
        if (text.length >= 3) {
          submitHandler(text);
          setText('');
        } else {
            Alert.alert('Wops!', 'Todos must be over 2 letters long', [
                {text: 'Understood', onPress: () => console.log('alert closed')}
              ]);
            setText('');  
        }
      };
    
      return (
        <View>
          <TextInput
            style={styles.input}
            placeholder='Add a Task...' 
            onChangeText={changeHandler}
            defaultValue={text} 
          />
          <Button onPress={handleAddTodo} title='Add Task' color='#99e6ff' />
        </View>
      );
    }

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
});