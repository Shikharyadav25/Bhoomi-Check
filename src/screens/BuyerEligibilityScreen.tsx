import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { LabeledTextField } from '../components/LabeledTextField';
import { DropdownField } from '../components/DropdownField';
import { StatusBanner } from '../components/StatusBanner';
import { PrimaryButton } from '../components/PrimaryButton';
import { DisclaimerText } from '../components/DisclaimerText';
import { FakeEligibilityChecker } from '../services/fake/fakeEligibilityChecker';
import { EligibilityResult } from '../types/models';

export const BuyerEligibilityScreen: React.FC = () => {
  const { goBack, t } = useSession();

  const [isAgriculturist, setIsAgriculturist] = useState(true);
  const [socialCategory, setSocialCategory] = useState('General (UR)');
  const [existingAcres, setExistingAcres] = useState('3.50');
  const [proposedAcres, setProposedAcres] = useState('1.037');
  const [result, setResult] = useState<EligibilityResult | null>(null);

  useEffect(() => {
    const checker = new FakeEligibilityChecker();
    const curr = parseFloat(existingAcres) || 0;
    const prop = parseFloat(proposedAcres) || 0;
    checker.checkEligibility(isAgriculturist, socialCategory, curr, prop).then(setResult);
  }, [isAgriculturist, socialCategory, existingAcres, proposedAcres]);

  const handleDownload = () => {
    Alert.alert(
      'Eligibility Certificate',
      'Statutory Eligibility Certificate under Section 89 UP Revenue Code exported.'
    );
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={t('buyerEligibilityTitle')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[Typography.headlineMd, styles.title]}>
          {t('eligibilityHeader')}
        </Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>
          {t('eligibilitySubhead')}
        </Text>

        {/* Profile Card */}
        <View style={styles.card}>
          <Text style={[Typography.bodyLg, styles.cardTitle]}>Buyer Profile</Text>

          {/* Agriculturist Toggle */}
          <Text style={[Typography.labelMd, styles.questionLabel]}>
            {t('agriculturistQuestion')}
          </Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, isAgriculturist && styles.activeToggleBtn]}
              onPress={() => setIsAgriculturist(true)}
            >
              <Text
                style={[styles.toggleText, isAgriculturist && styles.activeToggleText]}
              >
                Yes, Registered
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, !isAgriculturist && styles.activeToggleBtn]}
              onPress={() => setIsAgriculturist(false)}
            >
              <Text
                style={[styles.toggleText, !isAgriculturist && styles.activeToggleText]}
              >
                No / Other
              </Text>
            </TouchableOpacity>
          </View>

          <DropdownField
            label={t('casteCategoryLabel')}
            value={socialCategory}
            options={['General (UR)', 'OBC', 'SC (Scheduled Caste)', 'ST (Scheduled Tribe)']}
            onSelect={setSocialCategory}
          />

          <LabeledTextField
            label={t('existingHoldingLabel')}
            value={existingAcres}
            onChangeText={setExistingAcres}
            keyboardType="numeric"
            helperText="Cumulative holding across all districts in Uttar Pradesh."
          />

          <LabeledTextField
            label={t('proposedArea')}
            value={proposedAcres}
            onChangeText={setProposedAcres}
            keyboardType="numeric"
          />
        </View>

        {/* Statutory Determination */}
        {result && (
          <View style={styles.resultBox}>
            <StatusBanner
              type={result.isEligible ? 'SUCCESS' : 'WARNING'}
              title={result.statusTitle}
              message={result.explanation}
            />

            <View style={styles.statutoryCard}>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Total Holding After Purchase:</Text>
                <Text style={styles.metricVal}>{result.totalAcres} Acres</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Statutory UP Ceiling (Sec 89):</Text>
                <Text style={styles.metricVal}>{result.maxCeilingAcres} Acres</Text>
              </View>
              <Text style={styles.statutoryRef}>{result.statutoryReference}</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="Download Eligibility Certificate (PDF)"
            onPress={handleDownload}
          />
        </View>

        <DisclaimerText />
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
  title: {
    color: Colors.textPrimary,
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
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  questionLabel: {
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  toggleBtn: {
    flex: 1,
    height: 42,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  activeToggleBtn: {
    backgroundColor: Colors.infoBg,
    borderColor: Colors.actionBlue,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeToggleText: {
    color: Colors.actionBlue,
  },
  resultBox: {
    marginBottom: 10,
  },
  statutoryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 14,
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  metricVal: {
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 13,
  },
  statutoryRef: {
    fontSize: 11,
    color: Colors.actionBlue,
    fontWeight: '600',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 6,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
