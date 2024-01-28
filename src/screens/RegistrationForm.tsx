import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
