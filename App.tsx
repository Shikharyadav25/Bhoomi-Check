import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SessionProvider, useSession } from './src/context/SessionContext';
import { Colors } from './src/theme/colors';

// Screens
import { LandingScreen } from './src/screens/LandingScreen';
import { LocationSelectScreen } from './src/screens/LocationSelectScreen';
import { MapAndProblemsScreen } from './src/screens/MapAndProblemsScreen';
import { TitleSearchInputScreen } from './src/screens/TitleSearchInputScreen';
import { TitleReportScreen } from './src/screens/TitleReportScreen';
import { EcAnalysisScreen } from './src/screens/EcAnalysisScreen';
import { BuyerEligibilityScreen } from './src/screens/BuyerEligibilityScreen';
import { SurveyTrackerScreen } from './src/screens/SurveyTrackerScreen';
import { BayanaDraftScreen } from './src/screens/BayanaDraftScreen';
import { PlaceholderScreen } from './src/screens/PlaceholderScreen';

const AppNavigator: React.FC = () => {
  const { currentScreen, t } = useSession();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Landing':
        return <LandingScreen />;
      case 'LocationSelect':
        return <LocationSelectScreen />;
      case 'MapAndProblems':
        return <MapAndProblemsScreen />;
      case 'TitleSearchInput':
        return <TitleSearchInputScreen />;
      case 'TitleReport':
        return <TitleReportScreen />;
      case 'EcAnalysis':
        return <EcAnalysisScreen />;
      case 'BuyerEligibility':
        return <BuyerEligibilityScreen />;
      case 'SurveyTracker':
        return <SurveyTrackerScreen />;
      case 'BayanaDraft':
        return <BayanaDraftScreen />;
      case 'LandRecordsPlaceholder':
        return (
          <PlaceholderScreen
            title={t('landRecordsTitle')}
            description={t('landRecordsDesc')}
          />
        );
      case 'Section80Placeholder':
        return (
          <PlaceholderScreen
            title={t('section80Title')}
            description={t('section80Desc')}
          />
        );
      case 'ExecuteSaleDeedPlaceholder':
        return (
          <PlaceholderScreen
            title={t('executeDeedTitle')}
            description={t('executeDeedDesc')}
          />
        );
      default:
        return <LandingScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <View style={styles.container}>{renderScreen()}</View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <AppNavigator />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
