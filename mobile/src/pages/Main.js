import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
  const [ devs, setDevs ] = useState([])
  const [ currentRegion, setCurrentRegion ] = useState(null)
  const [ techs, setTechs ] = useState('')

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialPosition()
  }, [])

  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    })

    setDevs(response.data)
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region)
  }

  if (!currentRegion) {
    return null
  }

  return (
    <>
    <MapView onRegionChangeComplete={ handleRegionChanged } initialRegion={ currentRegion } style={ styles.map }>
    { devs.map(dev => (

      <Marker key={ dev._id } coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
        <Image style={ styles.avatar } source={{ uri: dev.avatar_url }}/>
        <Callout onPress={ () => {
          navigation.navigate('Profile', { github_username: dev.github_username })
        }}>
          <View style={ styles.callout }>
            <Text style={ styles.devName }>{ dev.name }</Text>
            <Text style={ styles.devTechs }>{ dev.techs.join(', ') }</Text>
            <Text style={ styles.devBio }>{ dev.bio }</Text>
            <Text style={ styles.tip }>* Click to see the GitHub profile</Text>
          </View>
        </Callout>
      </Marker>

    )) }

    </MapView>
    <View style={ styles.searchForm }>
      <TextInput
        style={ styles.searchInput }
        placeholder="Search devs by techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={ false }
        value={ techs }
        onChangeText={ setTechs }
      />

      <TouchableOpacity onPress={ loadDevs } style={ styles.searchButton }>
        <MaterialIcons name="my-location" size={ 20 } color="#FFF"/>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
    alignItems: 'center',
    padding: 10
  },

  devName: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16
  },

  devTechs: {
    marginTop: 2,
    fontSize: 12,
    color: '#666'
  },

  devBio: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 20 
  },

  tip: {
    fontSize: 12,
    color: '#ababab'
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 2,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 100,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2
  },

  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main
