
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_800ExtraBold
} from './node_modules/@expo-google-fonts/inter';

// Local imports:
import { Loading } from './src/components'

export default function App() {

  const [fonstLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold
  });

  if(!fonstLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hackeando seus habitos.</Text>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    color: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#f1f1f1', 
    fontSize: 32
  }
});
