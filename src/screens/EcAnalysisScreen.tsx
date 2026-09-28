import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { StatusBanner } from '../components/StatusBanner';
import { PrimaryButton } from '../components/PrimaryButton';
import { DisclaimerText } from '../components/DisclaimerText';
import { FakeEncumbranceAnalyzer } from '../services/fake/fakeEncumbranceAnalyzer';
import { EncumbranceReport } from '../types/models';

export const EcAnalysisScreen: React.FC = () => {
  const { session, activeKhasra, goBack, t } = useSession();
  const [report, setReport] = useState<EncumbranceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzer = new FakeEncumbranceAnalyzer();
    analyzer.getEncumbrances(session.district, activeKhasra).then((res) => {
      setReport(res);
      setLoading(false);
    });
  }, [activeKhasra, session.district]);

  const handleDownload = () => {
    Alert.alert(
      'Encumbrance Certificate',
      `Certificate of Nil Encumbrance (Form 16) generated for Plot ${activeKhasra}, ${session.district}.`
    );
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={t('ecHeader')} />

      {loading || !report ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.actionBlue} />
          <Text style={[Typography.bodyMd, styles.loadingText]}>
            Searching Sub-Registrar Encumbrance Registry...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={[Typography.headlineMd, styles.title]}>
            {t('ecHeader')}
          </Text>
          <Text style={[Typography.bodySm, styles.subtitle]}>
            {t('ecSubhead')} (Plot {report.khasraNo})
          </Text>

          <StatusBanner
            type={report.hasActiveEncumbrances ? 'DANGER' : 'SUCCESS'}
            title={
              report.hasActiveEncumbrances
                ? 'Active Institutional Encumbrance'
                : 'Zero Active Liens · Clean Title Certified'
            }
            message={report.actionRequired}
          />

          <View style={styles.card}>
            <Text style={[Typography.bodyLg, styles.cardTitle]}>
              20-Year Registered Charge History
            </Text>

            {report.entries.map((entry, index) => (
              <View key={index} style={styles.entryRow}>
                <View style={styles.entryHeader}>
                  <View style={styles.yearTag}>
                    <Text style={styles.yearText}>{entry.year}</Text>
                  </View>
                  <View style={styles.dischargedPill}>
                    <MaterialIcons name="check-circle" size={14} color={Colors.success} />
                    <Text style={styles.dischargedText}>DISCHARGED</Text>
                  </View>
                </View>

                <Text style={[Typography.bodySm, styles.deedType]}>{entry.deedType}</Text>
                <Text style={[Typography.caption, styles.lender]}>Lender: {entry.lender}</Text>
                <Text style={[Typography.caption, styles.amount]}>
                  Amount: ₹{entry.amountRupees.toLocaleString('en-IN')} (Reg: {entry.registrationDate})
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Download Nil Encumbrance Certificate (PDF)"
              onPress={handleDownload}
            />
          </View>

          <DisclaimerText />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: Colors.textSecondary,
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
    marginVertical: 14,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 14,
  },
  entryRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: 12,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  yearTag: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  yearText: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.navy,
  },
  dischargedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dischargedText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
  deedType: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  lender: {
    color: Colors.textSecondary,
    marginTop: 2,
  },
  amount: {
    color: Colors.textSecondary,
    marginTop: 2,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
