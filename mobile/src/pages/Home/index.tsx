import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';
import * as Location from 'expo-location';
import axios from 'axios';

interface IBGEStateResponse {
    sigla: string,
    nome: string
}

interface IBGECityResponse {
    nome: string
}

interface CityUFActualResponse {
    address: {
        city: string,
        state: string
    }
}

interface CustomItem extends Item {
    nome: string;
}

const Home = () => {

    const [ufs, setUfs]  = useState<CustomItem[]>([]);
    const [cities, setCities]  = useState<Item[]>([]);
    const [selectedUF, setSelectedUF] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const navigation = useNavigation();

    function handleNavigateToPoints() {
        if(!selectedUF) {
            Alert.alert('Ops! É necessário escolher um estado!');
            return;
        }
        if(!selectedCity) {
            Alert.alert('Ops! É necessário escolher uma cidade!');
            return;
        }
        return navigation.navigate('Points', { city: selectedCity, uf: selectedUF });
    }

    function handleValueChangeUf(value: any, index: number) {
        setSelectedUF(value);
    }

    function handleValueChangeCity(value: any, index: number) {
        setSelectedCity(value);
    }

    useEffect(() => {
        async function loadPosition() {
          const { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Ops! Precisamos de sua permissão para obter a localização!');
            return;
          }
          const location = await Location.getCurrentPositionAsync();
  
          const { latitude, longitude } = location.coords;
  
          setInitialPosition([
            latitude, longitude
          ]);
          
        }
        
        loadPosition();
    }, []);

    useEffect(() => {
        axios.get<CityUFActualResponse>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${initialPosition[0]}&lon=${initialPosition[1]}`).then(response => {
            const ufActual = ufs.find(uf => uf.nome === response.data.address.state);
            if(ufActual) {
                setSelectedUF(ufActual.value);
                setSelectedCity(response.data.address.city);
            }
            console.log( 'selected ' + ufActual)
        });
    }, [ufs, initialPosition]);

    useEffect(() => {
        axios.get<IBGEStateResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufs: CustomItem[] = response.data.map(r => 
                ({label: r.sigla + ' - ' + r.nome,
                    value: r.sigla,
                  key: r.sigla,
                  nome: r.nome}));
            setUfs(ufs);
        })
    }, []);
    
    useEffect(() => {
        //Carregar as cidades sempre que a UF mudar
        if(!selectedUF) {
            return;
        }
        console.log(selectedUF)
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`).then(response => {
            const ci: Item[] = response.data.map(r => 
                ({label: r.nome,
                    value: r.nome,
                  key: r.nome}));
            setCities(ci);
        })
    }, [selectedUF]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width: 274, height: 368}}>
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem ponto de coleta de forma eficiente</Text>
                    </View>
                </View>

                <View style={styles.footer}>

                    <RNPickerSelect style={pickerStyle} 
                             placeholder={{ label: 'Escolha a UF', value: '' }}
                             items={ufs}
                             value={selectedUF}
                             onValueChange={handleValueChangeUf}/>
                    <RNPickerSelect style={pickerStyle} 
                             placeholder={{ label: 'Escolha a cidade', value: '' }}
                             value={selectedCity}
                             items={cities}
                             onValueChange={handleValueChangeCity}/>

                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                               <Icon name="arrow-right" color="#fff" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
    
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
});

const pickerStyle = {
	inputIOS: {
		height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
	},
	inputAndroid: {
		height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
	},
} as PickerStyle;

export default Home;