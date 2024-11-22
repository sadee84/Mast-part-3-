// <!--Innovative Tech, 2024.PROG7512/c/s/w APP GUIDE/REFERENCE. 2024-->
// Namaile Sokhela
// Meal Manager App
// Multi-Screen Version

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, dishDetails } from "../types/types";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { styles } from "../styles/styles";

type FilterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "FilterScreen"
>;
export const FilterScreen: React.FC<FilterScreenProps> = (props) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("All");
  const [filteredMealList, setFilteredMealList] = useState<dishDetails[]>(
    props.route.params.dish
  );
  const CourseType = ["All", "Starters", "Main Course", "Sweets"];

  //function to filter the user inputs
  const handleFilter = (type: string) => {
    setSelectedCourse(type);
    if (type === "All") {
      setFilteredMealList(props.route.params.dish);
    } else {
      const filteredList = props.route.params.dish.filter(
        (dish) => dish.course_Type === type
      );
      setFilteredMealList(filteredList);
    }
  };

  return (
    <SafeAreaView style={styles.itemBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.mainHeading}>Filter Screen</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={handleFilter}
          style={styles.textField}
        >
          {CourseType.map((i) => (
            <Picker.Item label={i} value={i} key={i} />
          ))}
        </Picker>
      </View>
      <View>
        <FlatList
          style={styles.themeStyleAlt}
          data={filteredMealList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.detailText}>{item.course_Type} </Text>
              <Text style={styles.foodTitle}>Meal Name: {item.dish_Name}</Text>
              <Text style={styles.detailText}>
                Description: {item.description}
              </Text>
              <Text style={styles.detailText}>Price: R {item.price} </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};