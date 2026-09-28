import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { LabeledTextField } from '../components/LabeledTextField';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusBanner } from '../components/StatusBanner';
import { DisclaimerText } from '../components/DisclaimerText';
import { FakeAgreementGenerator } from '../services/fake/fakeAgreementGenerator';
import { BayanaAgreement } from '../types/models';

export const BayanaDraftScreen: React.FC = () => {
  const { session, activeKhasra, goBack, t } = useSession();

  const [sellerName, setSellerName] = useState('Ram Prasad Sharma');
  const [buyerName, setBuyerName] = useState('Sunil Verma');
  const [totalPrice, setTotalPrice] = useState('4500000');
  const [advanceEarnest, setAdvanceEarnest] = useState('500000');
  const [timelineMonths] = useState(3);
  const [agreement, setAgreement] = useState<BayanaAgreement | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    const generator = new FakeAgreementGenerator();
    const tot = parseInt(totalPrice, 10) || 4500000;
    const adv = parseInt(advanceEarnest, 10) || 500000;

    const res = await generator.generateAgreement(
      sellerName,
      buyerName,
      session.district,
      session.tehsil,
      'Banthra',
      activeKhasra,
      tot,
      adv,
      timelineMonths
    );

    setAgreement(res);
    setGenerating(false);
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={t('bayanaScreenTitle')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[Typography.headlineMd, styles.title]}>
          {t('bayanaScreenTitle')}
        </Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>
          {t('bayanaScreenDesc')}
        </Text>

        {/* Parties Card */}
        <View style={styles.card}>
          <Text style={[Typography.bodyLg, styles.cardTitle]}>Contract Parties</Text>
          <LabeledTextField
            label={t('sellerNameLabel')}
            value={sellerName}
            onChangeText={setSellerName}
            required
          />
          <LabeledTextField
            label={t('buyerNameLabel')}
            value={buyerName}
            onChangeText={setBuyerName}
            required
          />
        </View>

        {/* Financial Terms Card */}
        <View style={styles.card}>
          <Text style={[Typography.bodyLg, styles.cardTitle]}>Financial Terms</Text>
          <LabeledTextField
            label={t('totalSalePrice')}
            value={totalPrice}
            onChangeText={setTotalPrice}
            keyboardType="numeric"
            required
          />
          <LabeledTextField
            label={t('earnestAdvance')}
            value={advanceEarnest}
            onChangeText={setAdvanceEarnest}
            keyboardType="numeric"
            required
          />
          <LabeledTextField
            label={t('executionMonths')}
            value={`${timelineMonths} Months`}
            onChangeText={() => {}}
            editable={false}
            helperText="Standard UP Transfer of Property statutory timeline."
          />
        </View>

        <PrimaryButton
          title={t('generateBayanaBtn')}
          onPress={handleGenerate}
          loading={generating}
        />

        {/* Agreement Preview Card */}
        {agreement && (
          <View style={styles.previewCard}>
            <StatusBanner
              type="SUCCESS"
              title="Official Statutory Bayana Model Draft (Bilingual)"
              message="Clauses structured under UP Transfer of Property regulations."
            />

            <Text style={styles.watermark}>{t('draftLegalWatermark')}</Text>

            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Seller / विक्रेता:</Text>
              <Text style={styles.pVal}>{agreement.sellerName}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Buyer / क्रेता:</Text>
              <Text style={styles.pVal}>{agreement.buyerName}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Plot / खसरा:</Text>
              <Text style={styles.pVal}>{agreement.khasraNo}, {agreement.district}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Total Consideration:</Text>
              <Text style={[styles.pVal, styles.boldVal]}>
                ₹{agreement.totalConsiderationRupees.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Earnest Advance Paid:</Text>
              <Text style={[styles.pVal, { color: Colors.success, fontWeight: '700' }]}>
                ₹{agreement.advanceEarnestRupees.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.pLabel}>Balance Due at Registry:</Text>
              <Text style={[styles.pVal, { color: Colors.actionBlue, fontWeight: '700' }]}>
                ₹{agreement.balanceDueRupees.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        )}

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
  previewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    marginTop: 16,
  },
  watermark: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warning,
    marginVertical: 8,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  pLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  pVal: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  boldVal: {
    fontWeight: '700',
  },
});
