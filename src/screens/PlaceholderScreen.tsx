import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { StatusBanner } from '../components/StatusBanner';
import { SecondaryButton } from '../components/SecondaryButton';
import { DisclaimerText } from '../components/DisclaimerText';

interface PlaceholderScreenProps {
  title: string;
  description: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  description,
}) => {
  const { goBack, t } = useSession();

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={title} />

      <View style={styles.content}>
        <Text style={[Typography.headlineMd, styles.title]}>{title}</Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>{description}</Text>

        <StatusBanner
          type="INFO"
          title={t('placeholderTitle')}
          message={t('placeholderDesc')}
        />

        <View style={styles.card}>
          <MaterialIcons name="hourglass-top" size={48} color={Colors.actionBlue} />
          <Text style={[Typography.headlineSm, styles.cardTitle]}>
            Statutory Integration Phase
          </Text>
          <Text style={[Typography.caption, styles.cardDesc]}>
            This module integrates authenticated digital land records directly from Uttar Pradesh
            Revenue Board servers (Bhulekh API & Sub-Registrar IGRSUP).
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <SecondaryButton title={t('back')} onPress={goBack} />
        </View>

        <DisclaimerText />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 24,
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  cardTitle: {
    color: Colors.textPrimary,
  },
  cardDesc: {
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 12,
  },
});
