import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo'; 


export default function App() {
  const [todos, setTodos] = useState([
  { text: 'Make a coffee', key: '1' },
  { text: 'The morning meeting', key: '2' },
  { text: 'Watch the video from Barbara', key: '3' },
  { text: 'Continue developing the application', key: '4' },
  { text: 'Documentation from React', key: '5' }
  ]);

  console.log('todos', todos);
  
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      const indexToDelete = prevTodos.findIndex((todo) => todo.key === key);
      console.log(indexToDelete);
      if (indexToDelete === -1) {
        return prevTodos; 
      }
  
      
      const updatedTodos = prevTodos.slice(0, indexToDelete).concat(prevTodos.slice(indexToDelete + 1)).map((todo) => {
          if (parseInt(todo.key) > parseInt(key)) {
            return { ...todo, key: (parseInt(todo.key) - 1).toString() };
          }
          return todo;
        });
  
      return updatedTodos;
    });
  };

  const submitHandler = (text) => {

    if (text.length >= 3) {
      if (todos.some((item) => item.text === text)) {
        Alert.alert('Existent Task', 'This task already exists in the list.', [
          { text: 'Understood', onPress: () => console.log('alert closed') },
        ]);
      } else {
        setTodos((prevTodos) => {
          const lastkey = parseInt(prevTodos[prevTodos.length - 1].key)
          // console.log(lastkey);  
          return [
            ...prevTodos,
            { text: text, key: (lastkey + 1).toString() }
          ];
        });
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    
    </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  }
});
