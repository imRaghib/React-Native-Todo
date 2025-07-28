import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
};

const HomeScreen = () => {
  const storageKey: string = "my-todos";
  const router = useRouter();

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem(storageKey);
        if (savedTodos != null) {
          setTodos(JSON.parse(savedTodos));
          setOldTodos(JSON.parse(savedTodos));
        }
      } catch (e) {
        console.error("Error Occurred:", e);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      if (newTodo.title !== "") {
        const updatedTodos = [...todos, newTodo];
        await AsyncStorage.setItem(storageKey, JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
        setTodoText("");
        Keyboard.dismiss();
      }
    } catch (e) {
      console.error("Error Occurred:", e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newTodos));
      setTodos(newTodos);
      setTodoText("");
    } catch (e) {
      console.error("Error Occurred:", e);
    }
  };

  const handleTodo = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem(storageKey, JSON.stringify(newTodos));
      setTodos(newTodos);
      setTodoText("");
    } catch (e) {
      console.error("Error Occurred:", e);
    }
  };

  const onSearch = (search: string) => {
    if (search.trim() === "") {
      setTodos(oldTodos);
    } else {
      if (search === "") {
        setOldTodos(todos);
      }
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );

      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <View style={style.container}>
      {/* App Bar */}
      <View style={style.header}>
        {/* Menu / Drawer */}
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={24} color={"#333"} />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity
          onPress={() => {
            router.push("/profile");
          }}
        >
          <Image
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male",
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={style.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          style={style.searchInput}
          clearButtonMode="always"
          onChangeText={(text) => onSearch(text)}
        />
      </View>

      {/* Todo List */}
      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleTodo={handleTodo}
          />
        )}
      />

      {/* Add Todo */}
      <KeyboardAvoidingView style={style.footer}>
        <TextInput
          placeholder="Add New Todo"
          value={todoText}
          style={style.newTodoInput}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity style={style.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const TodoItem = ({
  todo,
  deleteTodo,
  handleTodo,
}: {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => (
  <View style={style.todoContainer}>
    <View style={style.todoInfoContainer}>
      <Checkbox
        color={todo.isDone ? "#333" : undefined}
        value={todo.isDone}
        onValueChange={() => handleTodo(todo.id)}
      />
      <Text
        style={[
          style.todoText,
          todo.isDone && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
    </View>
    <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
      <Ionicons name="trash" size={24} color={"#333"} />
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5 ",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: { flexDirection: "row", gap: 20, alignContent: "center" },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "android" ? 30 : 0,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 10,
    marginLeft: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
