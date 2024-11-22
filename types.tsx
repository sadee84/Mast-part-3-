import React from "react";

export type dishDetails = {
  dish_Name: string;
  description: string;
  course_Type: string;
  price: number;
};
export type RootStackParamList = {
  Screenmenu: {
    average: {
      AppetisersAverage: number;
      Main_CourseAverage: number;
      DessertAverage: number;
    };
  };
  FilterScreen: {
    dish: dishDetails[];
    setDish: React.Dispatch<React.SetStateAction<dishDetails[]>>;
  };
  Screenadd: {
    dish: dishDetails[];
    setDish: React.Dispatch<React.SetStateAction<dishDetails[]>>;
  };
};
// <!-- * Code Attribution:- ByteGrad (2024) Try Catch Error Handling With TypeScript [Online]. Available at: https://youtu.be/Q1euMQFI35I?si=atpoDwrnBK0Boekp (Accessed: 3 October 2024).Varsity College Durban North (2024) [Module Name] Module Manual. Durban: Varsity College.This code has been developed using the concepts and practices discussed in these sources.-->
// 