import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { StepIndicator } from '../components/StepIndicator';
import { SelectableCard } from '../components/SelectableCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusBanner } from '../components/StatusBanner';

export const LandingScreen: React.FC = () => {
  const { session, setMode, navigate, t } = useSession();

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StepIndicator
          currentStep={1}
          totalSteps={3}
          stepLabel="Identity & Intent"
        />

        {/* Hero Identity Block */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeftBar} />
          <View style={styles.heroBody}>
            <Text style={[Typography.caption, styles.heroBadge]}>
              {t('landingBadge')}
            </Text>
            <Text style={[Typography.headlineLg, styles.heroTitle]}>
              {t('landingHeroTitle')}
            </Text>
            <Text style={[Typography.bodyMd, styles.heroDesc]}>
              {t('landingHeroDesc')}
            </Text>

            <View style={styles.heroTagsRow}>
              <View style={styles.tagSuccess}>
                <MaterialIcons name="verified" size={14} color={Colors.success} />
                <Text style={styles.tagSuccessText}>
                  {t('landingRegistryValidated')}
                </Text>
              </View>
              <Text style={[Typography.captionSm, styles.updatedText]}>
                {t('landingUpdatedToday')}
              </Text>
            </View>
          </View>
        </View>

        {/* Role Selection */}
        <View style={styles.sectionHeader}>
          <Text style={[Typography.headlineMd, styles.sectionTitle]}>
            {t('whoAreYou')}
          </Text>
          <Text style={[Typography.caption, styles.sectionSubtitle]}>
            {t('requiredSelection')}
          </Text>
        </View>

        <SelectableCard
          title={t('imBuyer')}
          description={t('buyerDesc')}
          iconName="search"
          selected={session.mode === 'BUYER'}
          activeBadgeText={t('active')}
          onPress={() => setMode('BUYER')}
        />

        <SelectableCard
          title={t('imSeller')}
          description={t('sellerDesc')}
          iconName="store"
          selected={session.mode === 'SELLER'}
          activeBadgeText={t('active')}
          onPress={() => setMode('SELLER')}
        />

        {/* Statutory Trust Notice */}
        <StatusBanner
          type="INFO"
          title={t('statutoryDataLink')}
          message={t('statutorySyncDesc')}
          iconName="gavel"
        />

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={t('continue')}
            onPress={() => navigate('LocationSelect')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  heroLeftBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: Colors.actionBlue,
  },
  heroBody: {
    padding: 18,
    paddingLeft: 22,
  },
  heroBadge: {
    color: Colors.actionBlue,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroTitle: {
    color: Colors.navy,
    marginBottom: 4,
  },
  heroDesc: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  heroTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 10,
  },
  tagSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagSuccessText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  updatedText: {
    color: Colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sectionTitle: {
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    color: Colors.textSecondary,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
