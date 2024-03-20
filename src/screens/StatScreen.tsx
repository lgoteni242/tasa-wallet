// import Icon from 'react-native-vector-icons/FontAwesome';
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, StatusBar, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
// import default_color from '../styles/color';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import UserSkeletonLoader from '../components/Skeleton/UserSkeletonLoader';
// import {
//     LineChart,
//     BarChart,
// } from "react-native-chart-kit";

// const StatScreen = ({ navigation }) => {

//     const token = useSelector((state) => state.auth.token);

//     const [dateS, setDateS] = useState(new Date());
//     const fullDate = dateS; // Votre date récupérée
//     const dateOnly = new Date(fullDate).toISOString().split('T')[0];
//     const dateObject = new Date(dateOnly);
//     // const [year, setYear]= useState(dateObject.getFullYear())
//     // const [month, setMonth]= useState(dateObject.getMonth() + 1)
//     // const [day, setDay]= useState(dateObject.getDate())
//     // Extraire l'année, le mois et le jour de l'objet Date
//     const year = dateObject.getFullYear();
//     const month = dateObject.getMonth() + 1; // Les mois sont indexés à partir de 0, donc nous ajoutons 1
//     const day = dateObject.getDate();

//     const date = new Date(year, month - 1, day); // mois - 1 car les mois commencent à partir de 0
//     const options = { weekday: 'long' };

//     // Utilisation de la fonction






//     return (
//         <View style={styles.container} >
//             <StatusBar translucent backgroundColor="transparent" />

//             <View style={styles.container_image}>
//                 <View style={styles.container_logo}>
//                     <Text style={styles.welcomMessage}>Statistiques</Text>
//                 </View>
//                 {/* <View style={styles.aujourdhui3}>
//                     <View style={styles.transcationTexte}>
//                         <Text
//                             style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin", color: 'white' }}
//                         >
//                             Transactions
//                         </Text>
//                         <TouchableOpacity onPress={() => showDateTimePicker()}>
//                             <Animated.View style={[styles.transactionPillule
//                             ]} >
//                                 <Text
//                                     style={{
//                                         fontFamily: "RobotoSerif_100Thin",
//                                         color: "black",
//                                         fontSize: 11,
//                                         marginHorizontal: 15,
//                                     }}
//                                 >
//                                     Filtrer
//                                 </Text>

//                             </Animated.View>
//                         </TouchableOpacity>
//                         {showPicker && (
//                             <DateTimePicker
//                                 testID="dateTimePicker"
//                                 value={dateS}
//                                 mode="date"
//                                 is24Hour={true}
//                                 display="default"
//                                 onChange={onChange}
//                             />
//                         )}
//                     </View>
//                 </View> */}
//             </View>
//             <View style={styles.aujourdhui4}>
//                 <View style={styles.transcationTexte}>
//                     <Text
//                         style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin", color: 'black' }}
//                     >
//                         Total transfert
//                     </Text>
//                     <Text
//                         style={{
//                             fontFamily: "RobotoSerif_100Thin",
//                             color: "black",
//                             fontSize: 11,
//                         }}
//                     >
//                         124.2145.000
//                     </Text>
//                 </View>
//             </View>
//             <View>
//                 <LineChart
//                     data={{
//                         // labels: ["January", "February", "March", "April", "May", "June"],
//                         labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet"],
//                         datasets: [
//                             {
//                                 data: [
//                                     Math.random() * 100,
//                                     Math.random() * 100,
//                                     Math.random() * 100,
//                                     Math.random() * 100,
//                                     Math.random() * 100,
//                                     Math.random() * 100,
//                                 ]
//                             }
//                         ]
//                     }}
//                     width={400} // from react-native
//                     height={350}
//                     // yAxisLabel="$"
//                     yAxisSuffix="k"
//                     yAxisInterval={1} // optional, defaults to 1
//                     chartConfig={{
//                         backgroundColor: "#e26a00",
//                         backgroundGradientFrom: '#E7E7E7',
//                         backgroundGradientTo: '#E7E7E7',
//                         decimalPlaces: 2, // optional, defaults to 2dp
//                         color: (opacity = 1) => `rgba(1, 1, 13, ${opacity})`,
//                         labelColor: (opacity = 1) => `rgba(1, 1, 13, ${opacity})`,
//                         style: {
//                             borderRadius: 16
//                         },
//                         propsForDots: {
//                             r: "6",
//                             strokeWidth: "0",
//                             stroke: "#ffa726"
//                         }
//                     }}
//                     bezier
//                     style={{
//                         marginVertical: 8,
//                         // borderRadius: 16

//                     }}
//                 />
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
//                 <View style={{ height: 140, backgroundColor: default_color.orange, width: '48%', borderRadius: 10, padding: 10, position: 'relative', overflow: 'hidden' }}>
//                     <Icon name="arrow-circle-down" size={30} color='white' />
//                     <View style={{ marginTop: 30, zIndex: 10 }}>
//                         <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 10 }}>Transferer</Text>
//                         <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 13 }}>132.223.333 Fcfa</Text>
//                     </View>
//                     <Icon name="arrow-circle-down" size={150} color='#8b1f09' style={{ position: 'absolute', zIndex: 5, right: -50 }} />
//                 </View>
//                 <View style={{ height: 140, backgroundColor: default_color.grayColor, width: '48%', borderRadius: 10, padding: 10, position: 'relative', overflow: 'hidden' }}>
//                     <Icon name="arrow-circle-up" size={30} color='white' />
//                     <View style={{ marginTop: 30, zIndex: 10 }}>
//                         <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 10 }}>Recu</Text>
//                         <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 13 }}>132.223.333 Fcfa</Text>
//                     </View>
//                     <Icon name="arrow-circle-up" size={150} color='gray' style={{ position: 'absolute', zIndex: 5, right: -50 }} />
//                 </View>

//             </View>
//         </View >

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#E7E7E7',

//     },
//     container_logo: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         // paddingTop: 30,
//         width: '100%',
//         // marginBottom: 30

//     },
//     transcationTexte: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         // paddingVertical: 10
//     },
//     icon: {
//         fontSize: 70,
//         fontWeight: 'bold',
//         color: 'white',
//     },

//     container_image: {
//         height: 140,
//         justifyContent: 'flex-end',
//         backgroundColor: default_color.orange,
//         // paddingHorizontal: 20,
//         alignItems: 'center',
//         paddingBottom: 10,
//     },
//     welcomMessage: {
//         fontFamily: 'RobotoSerif_400Regular',
//         color: 'white',
//         fontSize: 15,
//         marginBottom: 25
//     },
//     container2: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderRadius: 2,
//         paddingHorizontal: 20,
//         backgroundColor: '#ccc',
//         // borderBottomWidth: 0.5,
//         // borderColor: 'red'


//     },
//     input: {
//         flex: 1,
//         height: 30,
//         fontFamily: "RobotoSerif_400Regular",
//         fontSize: 10,
//         // color: 'white'
//     },
//     aujourdhui: {
//         marginBottom: 3,
//         elevation: 5, // pour Android
//         shadowColor: '#000', // pour iOS
//         shadowOffset: { width: 0, height: 2 }, // 
//         backgroundColor: 'white',
//         padding: 20
//     },
//     aujourdhui3: {
//         marginBottom: 3,
//         // elevation: 2, // pour Android
//         shadowColor: '#000', // pour iOS
//         // backgroundColor: 'white',
//         // padding: 20,
//         paddingHorizontal: 20,
//         width: '100%'
//     },
//     aujourdhui4: {
//         marginBottom: 3,
//         elevation: 2, // pour Android
//         shadowColor: '#000', // pour iOS
//         // backgroundColor: 'white',
//         padding: 20,
//         // paddingHorizontal: 20,
//         width: '100%'
//     },
//     aujourdhui2: {
//         marginBottom: 3,
//         elevation: 5, // pour Android
//         shadowColor: '#000', // pour iOS
//         shadowOffset: { width: 0, height: 2 }, // 
//         backgroundColor: 'white',
//         padding: 20,
//         paddingBottom: 40
//     },
//     transcationListe: {
//         // marginTop: 5,
//         marginBottom: 5,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderBottomWidth: 0.3,
//         borderColor: '#ccc',
//         paddingHorizontal: 20

//     },
//     iconShowbarTransaction: {
//         marginRight: 20,
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     transactionPillule: {
//         justifyContent: "center",
//         display: "flex",
//         backgroundColor: "#E7E7E7",
//         borderRadius: 20,
//         alignItems: 'center',
//         // marginBottom: 10,
//         // width: "40%"
//     },
//     modalContainerChargement: {
//         backgroundColor: "transparent",
//         // borderRadius: 10,
//         width: "100%",
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     modalContentChargement: {
//         backgroundColor: "transparent",
//         // padding: 23,
//         // borderRadius: 10,
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },

// });

// export default StatScreen;



// // SettingsScreens