import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  // task chua hoan thanh
  const [taskItems, setTaskItems] = useState([]);
  // task da hoan thanh
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [isShowInputTask, setIsShowInputTask] = useState(false);
  const handleAddTask = () => {
    if (isShowInputTask) {
      Keyboard.dismiss();
      if (task != '' && task) {
        setTaskItems([...taskItems, task])
      }
      setTask(null);
      setIsShowInputTask(!isShowInputTask);
    }
    else setIsShowInputTask(!isShowInputTask);
  }
  const completeTask = (index) => {
    let newTaskItems = [...taskItems];
    let newTaskCompleted = [];
    newTaskCompleted.push(newTaskItems[index]);
    newTaskItems.splice(index, 1);
    setTaskCompleted(...newTaskCompleted);
    setTaskItems(newTaskItems)
  }
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>ToDo's tasks</Text>
            <View style={styles.items}>
              {taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>)
              })
              }
            </View>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={"height"} style={styles.writeTaskWrapper}>
        {
          isShowInputTask &&
          <TextInput style={styles.input} placeholder={' New task'} value={task} onChangeText={text => setTask(text)} />
        }
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height: '100%',
  },
  container1: {
    height: '87%',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '80%',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#202020",
  },
});