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

type ScreenaddProp = NativeStackScreenProps<RootStackParamList, "Screenadd">;
export const Screenadd: React.FC<ScreenaddProp> = (props) => {
  const [dish, setDish] = useState<dishDetails[]>(props.route.params?.dish);
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [courseType, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const CourseType = ["Starters", "Main Course", "Sweets"];

  // function to delete
  function handleRemoval(index: number): void {
    const updatedDish = [...dish];
    updatedDish.splice(index, 1);
    setDish(updatedDish);
    props.route.params.setDish(updatedDish);

    const average = calculateAverage(updatedDish);
    props.navigation.navigate("Screenmenu", { average });
  }

  const calculateAverage = (dish: dishDetails[]) => {
    let totalAppetisers = 0;
    let totalMainCourse = 0;
    let totalDessert = 0;

    //variabeles with valeu 0
    let countAppetisers = 0;
    let countMainCourse = 0;
    let countDessert = 0;

    dish.forEach((dish) => {
      if (dish.course_Type === "Appetisers") {
        totalAppetisers += dish.price;
        countAppetisers += 1;
      } else if (dish.course_Type === "Main Course") {
        totalMainCourse += dish.price;
        countMainCourse += 1;
      } else if (dish.course_Type === "Dessert") {
        totalDessert += dish.price;
        countDessert += 1;
      }
    });

    return {
      AppetisersAverage:
        countAppetisers > 0 ? totalAppetisers / countAppetisers : 0,
      Main_CourseAverage:
        countMainCourse > 0 ? totalMainCourse / countMainCourse : 0,
      DessertAverage: countDessert > 0 ? totalDessert / countDessert : 0,
    };
  };

  // function to add the new dish
  const handleSubmit = () => {
    if (dishName && description && courseType && price && parseInt(price) > 0) {
      const newDish: dishDetails = {
        dish_Name: dishName,
        description: description,
        course_Type: courseType,
        price: parseInt(price),
      };
      const updatedDish = [...props.route.params.dish, newDish];
      props.route.params.setDish(updatedDish);
      props.navigation.goBack(); // automatically return to the MenuScreen after adding the new dish

      const average = calculateAverage(updatedDish);
      props.navigation.navigate("Screenmenu", { average });

      setDishName("");
      setDescription("");
      setType("None");
      setPrice("");
    } else if (parseInt(price) <= 0) {
      Alert.alert("Incorrect input", "Price needs to be greater than 0", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Incomplete form", "Please fill all the fields", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.itemBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.mainHeading}>Add Menu Item</Text>
        <Picker
          selectedValue={courseType}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.textField}
        >
          {CourseType.map((courseType) => (
            <Picker.Item
              label={courseType}
              value={courseType}
              key={courseType}
            />
          ))}
        </Picker>
        <TextInput
          style={styles.textField}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.descriptionField}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.textField}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableHighlight onPress={handleSubmit} style={styles.stickyButton}>
          <Text style={styles.buttonLabel}>Save</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.titleText}>
        <Text style={styles.mainHeading}>Remove Dish</Text>
      </View>

      <FlatList
        style={styles.themeStyleAlt}
        data={dish}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.detailText}>{item.course_Type} </Text>
            <Text style={styles.foodTitle}>Meal Name: {item.dish_Name}</Text>
            <Text style={styles.detailText}>
              Description: {item.description}
            </Text>
            <Text style={styles.detailText}>Price: R {item.price} </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoval(dish.indexOf(item))}
            >
              <Text style={styles.removeButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};