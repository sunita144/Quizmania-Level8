import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Dimensions } 
from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PieChart } from 'react-native-chart-kit'
import BasicButton from "../components/BasicButton";

export default function Profile() {
    const [image, setImage] = useState("http://2.bp.blogspot.com/-QWj2Wq45014/TzNOfQezNqI/AAAAAAAAAIY/Lvy0m7ZtWRM/s1600/12.jpg");
    const [hasImageChanged, setHasImageChanged] = useState(false);

    const [name, setName] = useState("Iron Man");
    const [email, setEmail] = useState("tony.stark@iron.man");
    const [phoneNo, setPhoneNo] = useState("9876543210");
    const [aboutYou, setAboutYou] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ");

    const [performanceData, setPerformanceData] = useState({
        "total": 18,
        "correct": 10,
        "incorrect": 8,
    });

    //function to handle when login btn is clicked on
    function handleSaveBtnClick() {
        console.log("save btn clicked");
    }

    //function to handle when profile pic edit btn is clicked on
    async function handleProfilePicEditBtnClick() {
        console.log("edit profile pic btn clicked");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.cancelled) {
            setHasImageChanged(true);
            setImage(result.uri);
        }
    }

    //component rendering
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.form}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity onPress={handleProfilePicEditBtnClick}>
                        <Image source={require('./edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="email-address"
                    placeholder="Enter your registered email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="number-pad"
                    placeholder="Enter phone number"
                    value={phoneNo}
                    onChangeText={(val) => setPhoneNo(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>About Yourself</Text>
                <TextInput
                    style={styles.inputField}
                    multiline
                    placeholder="describe yourself"
                    value={aboutYou}
                    onChangeText={(val) => setAboutYou(val)}
                />
                <View style={styles.divider}></View>
            </View>

            <Text style={styles.label}>Performance</Text>
            <Text style={styles.totalData}>Total attempted: {performanceData.total}</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={[
                        {
                            name: 'Correct',
                            population: performanceData.correct,
                            color: '#34A853',
                            legendFontColor: '#34A853',
                            legendFontSize: 14,
                        },
                        {
                            name: 'Incorrect',
                            population: performanceData.incorrect,
                            color: '#EB4335',
                            legendFontColor: '#EB4335',
                            legendFontSize: 14,
                        }
                    ]}
                    width={Dimensions.get("screen").width}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}

                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="20"
                    absolute
                />
            </View>

            <View style={styles.divider}></View>
            <BasicButton
                text="Save"
                onPress={handleSaveBtnClick}
            />
            <View style={styles.divider}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },

    form: {
        marginTop: 35,
    },

    imageContainer: {
        width: 120,
        height: 120,
        alignSelf: "center",
        shadowColor: 'grey',
        shadowOpacity: .8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 10,
    },

    image: {
        alignSelf: "center",
        width: "100%",
        height: "100%",
        borderRadius: 1000,
    },

    editIcon: {
        width: 20,
        height: 20,
        position: "absolute",
        bottom: 0,
        right: 0,
    },

    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
    },

    divider: {
        paddingVertical: 8,
    },

    chartContainer: {
        alignItems: "center",
    },

    totalData: {
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 20,
        color: '#757575',
        marginVertical: 10,
    }
});
