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
type ScreenmenuProp = NativeStackScreenProps<RootStackParamList, "Screenmenu">; // Props for Screenmenu
export const Screenmenu: React.FC<ScreenmenuProp> = (props) => {
  const {
    average = {
      AppetisersAverage: 0,
      Main_CourseAverage: 0,
      DessertAverage: 0,
    },
  } = props.route.params || {}; // Extract average price data from navigation params

  const [dish, setDish] = useState<dishDetails[]>([]);
  const totalMeals = dish.length;

  return (
    <SafeAreaView style={styles.mainBox}>
      <View style={styles.headerArea}>
        <Text style={styles.mainHeading}> Chef Christoffel App</Text>
      </View>
      <View style={styles.summaryBox}>
        <View style={styles.textContainer}>
          <Text style={styles.summaryLabel}>Total Meals: {totalMeals} </Text>
        </View>
        <View style={styles.averageBox}>
          <Text style={styles.subHeading}>Average price per dish:</Text>
          <Text style={styles.summaryLabel}>
            Appetisers:R {average.AppetisersAverage}{" "}
          </Text>
          <Text style={styles.summaryLabel}>
            {" "}
            Main Course:R {average.Main_CourseAverage}{" "}
          </Text>
          <Text style={styles.summaryLabel}>
            {" "}
            Dessert:R {average.DessertAverage}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.titleText}>
        <Text style={styles.subHeading}>Meal List</Text>
      </View>
      <FlatList
        style={styles.themeStyle}
        data={dish}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          // display for the user input
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

      <View style={styles.stickyButton}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            props.navigation.navigate("Screenadd", { dish, setDish })
          } // Pass setMeal here
        >
          <Text style={styles.buttonLabel}>Add Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            props.navigation.navigate("FilterScreen", { dish, setDish })
          }
        >
          <Text style={styles.buttonLabel}>Filter Meals</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};