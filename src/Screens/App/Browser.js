import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import { PrimaryButton } from '../../Compoents/Buttons/BTN'
import Loader from '../../Compoents/Loader'
const { height, width } = Dimensions.get("window")
const Browser = ({ navigation, route }) => {
    const data = route?.params
    const [loading,setLoading]=useState(true)


    return (
        <>
            <WebView 
            renderLoading={()=><Loader/>}
            startInLoadingState={true}
            source={{ uri: data ? data.data : null }}
                style={{ flex: 1 }} />
            <PrimaryButton
                onPress={() => { navigation.goBack() }}
                title="Back to App"
            />
            {/* <TouchableOpacity

                style={{ backgroundColor: "red", height: height * 0.035 }}
            >
                <Text>Back to App</Text>
            </TouchableOpacity> */}
        </>
        // <View>
        //     <Text>Browser</Text>
        // </View>
    )
}

export default Browser

const styles = StyleSheet.create({})