import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [selectedValue, setSelectedValue] = useState("java");
    const [userData, setUserData] = useState({
        country: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleChange = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View>
                        <Text>Step 1: Choose your country</Text>
                        {/* <TextInput
                            placeholder="Country"
                            value={userData.country}
                            onChangeText={(value) => handleChange('country', value)}
                        /> */}
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            style={{ height: 50, width: 150, color: 'red' }}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Text>Step 2: Enter your phone number</Text>
                        <TextInput
                            placeholder="Phone Number"
                            value={userData.phoneNumber}
                            onChangeText={(value) => handleChange('phoneNumber', value)}
                        />
                    </View>
                );
            case 3:
                return (
                    <View>
                        <Text>Step 3: Enter your first and last name</Text>
                        <TextInput
                            placeholder="First Name"
                            value={userData.firstName}
                            onChangeText={(value) => handleChange('firstName', value)}
                        />
                        <TextInput
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChangeText={(value) => handleChange('lastName', value)}
                        />
                    </View>
                );
            case 4:
                return (
                    <View>
                        <Text>Step 4: Enter your email</Text>
                        <TextInput
                            placeholder="Email"
                            value={userData.email}
                            onChangeText={(value) => handleChange('email', value)}
                        />
                    </View>
                );
            case 5:
                return (
                    <View>
                        <Text>Step 5: Create your password</Text>
                        <TextInput
                            placeholder="Password"
                            value={userData.password}
                            onChangeText={(value) => handleChange('password', value)}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            value={userData.confirmPassword}
                            onChangeText={(value) => handleChange('confirmPassword', value)}
                            secureTextEntry
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderStepContent()}
            <View style={styles.buttons}>
                {step !== 1 && (
                    <Button
                        title="Previous"
                        onPress={handlePreviousStep}
                    />
                )}
                {step < 5 ? (
                    <Button
                        title="Next"
                        onPress={handleNextStep}
                    />
                ) : (
                    <Button
                        title="Finish"
                        onPress={() => console.log(userData)}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
    },
});

export default RegistrationForm;

//         :
//         <ScrollView style={styles.container_form}>
//             <View style={styles.inputContainer}>
//                 <Icon name="user" size={15} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nom(s)"
//                     keyboardType="default"
//                     autoCapitalize="none"
//                 />
//             </View>
//             <View style={styles.inputContainer}>
//                 <Icon name="user" size={15} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Prenom(s)"
//                     keyboardType="default"
//                     autoCapitalize="none"
//                 />
//             </View>
//             <View style={styles.inputContainer}>
//                 <Icon name="mars" size={15} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Sexe"
//                     keyboardType="default"
//                     autoCapitalize="none"
//                 />
//             </View>
//             <View style={styles.inputContainer2}>
//                 {selectedOption == "" ?
//                     <Icon name="globe" size={15} color="grey" style={styles.iconStyle} />
//                     :
//                     selectedOption == "Republique du Congo" ?
//                         <Text style={styles.iconStyle}>{flag('cg')}</Text> :
//                         <Text style={styles.iconStyle}>{flag('sn')}</Text>
//                 }
//                 <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%" }}>
//                     {selectedOption == "" ? (<Text style={{ color: 'grey' }}>Pays de residence</Text>) : <Text>{selectedOption}</Text>}
//                 </TouchableOpacity>
//                 <CustomModalPicker
//                     options={options}
//                     onSelect={handleSelect}
//                     visible={modalVisible}
//                     onClose={() => setModalVisible(false)}
//                     titre="Choisir le pays de residence"
//                 />
//             </View>
//             <View style={styles.inputContainer}>
//                 {selectedOption == "Republique du Congo" ?
//                     <Text style={styles.iconStyle}>+242 |</Text>
//                     :
//                     selectedOption == "Senegal" ?
//                         <Text style={styles.iconStyle}>+221 |</Text> :
//                         <Icon name="phone" size={15} color="grey" style={styles.iconStyle} />


//                 }
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Telephone"
//                     keyboardType="phone-pad"
//                     autoCapitalize="none"
//                 />
//             </View>
//             <View style={styles.inputContainer}>
//                 <Icon name="envelope" size={15} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                 />
//             </View>

//             <View style={styles.inputContainer}>
//                 <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Mot de passe"
//                     secureTextEntry={!passwordVisible}
//                 />
//                 <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => setPasswordVisible(!passwordVisible)}
//                 >
//                     <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.inputContainer}>
//                 <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Confirmer votre mot de passe"
//                     secureTextEntry={!passwordVisible2}
//                 />
//                 <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => setPasswordVisible2(!passwordVisible2)}
//                 >
//                     <Icon name={passwordVisible2 ? 'eye' : 'eye-slash'} size={20} color="gray" />
//                 </TouchableOpacity>
//             </View>
//             <TouchableOpacity style={styles.button} >
//                 <Text style={styles.buttonText}>S'inscrire</Text>
//             </TouchableOpacity>
//             <Text style={styles.signupText} onPress={() => setVerifInscription(true)}>
//                 Avez-vous deja un compte ? Si oui, veillez-vous connecter.
//             </Text>
//             <View>
//                 <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
//             </View>
//         </ScrollView>
// }