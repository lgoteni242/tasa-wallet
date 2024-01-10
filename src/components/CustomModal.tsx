import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorDefault from '../styles/color';

interface Props {
  isVisible: boolean;
  toggleModal: () => void;
  content: string;
}

const CustomModal: React.FC<Props> = ({ isVisible, toggleModal, content }) => {
  const data3 = [
    { id: '1', text: 'Amazon', montant: 1250, icon: require('../../assets/icon/icons8-amazon-96.png') },
    { id: '2', text: 'Google', montant: 4000, icon: require('../../assets/icon/icons8-google-192.png') },
    { id: '3', text: 'Spotify', montant: 13456, icon: require('../../assets/icon/icons8-spotify-96.png') },
    { id: '4', text: 'Google', montant: 5000, icon: require('../../assets/icon/icons8-google-192.png') },
    { id: '5', text: 'Ncash', montant: 6000, icon: require('../../assets/icon/icons8-cash-64.png') },
    { id: '6', text: 'Google', montant: 1250, icon: require('../../assets/icon/icons8-google-192.png') },
    { id: '7', text: 'Apple Music', montant: 1250, icon: require('../../assets/icon/icons8-apple-logo-120.png') },
    { id: '8', text: 'Ncash', montant: 1250, icon: require('../../assets/icon/icons8-cash-64.png') },
    { id: '9', text: 'Google', montant: 1250, icon: require('../../assets/icon/icons8-google-192.png') },
  ];
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.2}
      coverScreen={true}
    >
      <View style={styles.modalContainer}>
        {/* <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <View style={styles.headerIcon}>
            <Icon name="times" size={20} color="black" />
          </View>
        </TouchableOpacity> */}

          <View style={styles.closeButton}>
            <Text style={{textAlign:'center', fontWeight:'bold', color:'white'}}>Notifications</Text>
          </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 0 }}>
            {
              data3.map((items, index) => (
                <TouchableOpacity key={index}>
                  <View style={styles.allTransaction} key={index}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View style={styles.headerIcon}>
                        <Image source={items.icon} style={styles.image} />
                      </View>
                      <Text style={{ marginHorizontal: 30 }}>{items.text}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    height: '100%',
    width: '60%',
    backgroundColor: '#f3f6ff',
    position: 'relative', // Permet de positionner le bouton de fermeture correctement
    // padding: 20
  },
  modalContent: {
    marginTop: 2,
    // backgroundColor: 'white',
    padding: 1
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {

    
    // top: 0,
    // right: 50,
    backgroundColor: colorDefault.main,
    padding: 5,
    zIndex: 1, // Assure que le bouton est au-dessus du contenu du modal
  },
  headerIcon: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: 'rgba(0, 0, 0, 12)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 11,
      },
    }),
  },
  allTransaction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 21,
    paddingVertical: 10,
    backgroundColor: 'white',
    // borderColor:'black',
    // borderWidth:1,
    // borderBottomWidth:1,
    // borderTopWidth:1
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
});

export default CustomModal;
