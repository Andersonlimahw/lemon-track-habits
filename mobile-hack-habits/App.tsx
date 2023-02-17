
import { StatusBar } from 'react-native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_800ExtraBold
} from './node_modules/@expo-google-fonts/inter';

// Local imports:
import { Loading } from './src/components'
import { Home } from './src/screens/Home';

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
    <>
      <Home />
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}