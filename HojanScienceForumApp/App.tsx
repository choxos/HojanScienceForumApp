import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

// Store and services
import { store, persistor } from './src/store';
import initI18n from './src/services/i18n';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import type { RootState } from './src/types';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';

// Initialize i18n
initI18n();

function App(): React.JSX.Element {
  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LanguageSync />
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <RootNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;

function LanguageSync(): null {
  const language = useSelector((state: RootState) => state.settings.language);
  useEffect(() => {
    if (language) {
      i18next.changeLanguage(language);
    }
  }, [language]);
  return null;
}