import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { ScoreGauge } from '../components/ScoreGauge';
import { StatusBanner } from '../components/StatusBanner';
import { TimelineNode } from '../components/TimelineNode';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { DisclaimerText } from '../components/DisclaimerText';
import { FakeTitleAnalyzer } from '../services/fake/fakeTitleAnalyzer';
import { TitleReport } from '../types/models';

export const TitleReportScreen: React.FC = () => {
  const { session, activeKhasra, goBack, t } = useSession();
  const [report, setReport] = useState<TitleReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzer = new FakeTitleAnalyzer();
    analyzer
      .analyzeTitle(session.district, session.tehsil, 'Banthra', activeKhasra)
      .then((res) => {
        setReport(res);
        setLoading(false);
      });
  }, [activeKhasra, session.district, session.tehsil]);

  const handleDownloadPdf = () => {
    Alert.alert(
      'Audit Report PDF',
      `Certified Title Report for Khasra ${activeKhasra} (${session.district}) exported.`
    );
  };

  const handleAdvocate = () => {
    Alert.alert(
      'Advocate Assigned',
      'A licensed revenue advocate has been notified to inspect the original Tehsildar Khatauni records.'
    );
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={t('parcelAuditDetail')} />

      {loading || !report ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.actionBlue} />
          <Text style={[Typography.bodyMd, styles.loadingText]}>
            Inspecting 30-Year UP Bhulekh Chain...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text style={[Typography.headlineMd, styles.title]}>
            Plot {report.khasraNo} Title Audit
          </Text>
          <Text style={[Typography.caption, styles.subtitle]}>
            Jurisdiction: {report.districtJurisdiction}
          </Text>

          {/* Score Gauge */}
          <ScoreGauge score={report.score} />

          {/* Status Banner */}
          <StatusBanner
            type={report.band === 'green' ? 'SUCCESS' : 'DANGER'}
            title={
              report.band === 'green'
                ? 'Clean Title · Zero Mutation Disputes'
                : '2 Critical Discrepancies Requiring Rectification'
            }
            message={report.summary}
          />

          {/* 30-Year Timeline Section */}
          <View style={styles.sectionHeader}>
            <MaterialIcons name="history" size={20} color={Colors.actionBlue} />
            <Text style={[Typography.headlineSm, styles.sectionTitle]}>
              30-Year Deed Continuity Chain
            </Text>
          </View>

          {report.timeline.map((event, index) => (
            <TimelineNode
              key={index}
              event={event}
              isLast={index === report.timeline.length - 1}
            />
          ))}

          {/* Modular Findings Card */}
          <View style={styles.findingsCard}>
            <Text style={[Typography.bodyLg, styles.findingsTitle]}>
              Modular Risk Breakdown
            </Text>
            {report.findings.map((f, i) => (
              <View key={i} style={styles.findingRow}>
                <MaterialIcons
                  name={f.isRisk ? 'cancel' : 'check-circle'}
                  size={18}
                  color={f.isRisk ? Colors.danger : Colors.success}
                />
                <View style={styles.findingTextCol}>
                  <Text style={[Typography.bodySm, styles.findingHeading]}>{f.title}</Text>
                  <Text style={[Typography.caption, styles.findingDesc]}>{f.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <PrimaryButton
              title={t('downloadPdf')}
              onPress={handleDownloadPdf}
              style={{ marginBottom: 10 }}
            />
            <SecondaryButton
              title={t('requestAdvocate')}
              onPress={handleAdvocate}
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
    padding: 20,
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
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
  },
  findingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    marginVertical: 12,
  },
  findingsTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  findingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  findingTextCol: {
    flex: 1,
  },
  findingHeading: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  findingDesc: {
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  actions: {
    marginTop: 8,
  },
});
