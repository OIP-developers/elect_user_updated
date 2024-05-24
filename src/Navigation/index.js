import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './AppNav';
import AuthNav from './AuthNav';
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux';
import { CountryDetect } from '../redux/actions/user.action';
import { CurrentLocation, locationPermission } from '../config/LiveLocationHelper';
import messaging from '@react-native-firebase/messaging';


const MainNav = () => {
  const [Side, setSide] = useState(false)
  const [location, setlocation] = useState()
  const User_controller = useSelector((state) => state?.auth?.accesToken?.data?.user?.phone_status)
  const [fcm, setFcm] = useState("")
  // console.log("Controller data ", User_controller)

  useEffect(() => {
    SplashScreen.hide()

  }, [])
  useEffect(() => {

    getCurrentLocation()
    requestUserPermission()
  }, [])
  const dispatch = useDispatch()
  const getCurrentLocation = async () => {
    const PermissionDenied = await locationPermission()
    console.log("location permission", PermissionDenied)
    if (PermissionDenied) {
      const res = await CurrentLocation()
      // console.log("Response=========>>>>>>>", res)
      Locationverfication(res)
    }
  }
  // const linking = {
  //   prefixes: ["electUser://"],

  // };
  // )
  const Locationverfication = (res) => {
    const data = {
      latitude: `${res?.latitude}`,
      longitude: `${res?.longitude}`
      // latitude: "48.3794",
      // longitude: "31.1656"
    }
    console.log(data)
    dispatch(CountryDetect(data))
  }

  async function requestUserPermission() {
    await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken()
      console.log("token",token)
      setFcm(token)
    }
  }

  return (

    <NavigationContainer
    // linking={linking}
    >

      {User_controller == "VERIFIED" ? <AppNav /> : <AuthNav fcm={fcm} />}
    </NavigationContainer>

  )

}

export default MainNav

