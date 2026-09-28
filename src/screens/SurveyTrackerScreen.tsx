import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Svg, { Rect, Polygon, Line, Text as SvgText } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { StatusBanner } from '../components/StatusBanner';
import { PrimaryButton } from '../components/PrimaryButton';
import { DisclaimerText } from '../components/DisclaimerText';
import { FakeSurveyCoordinator } from '../services/fake/fakeSurveyCoordinator';
import { SurveyData } from '../types/models';

export const SurveyTrackerScreen: React.FC = () => {
  const { session, activeKhasra, goBack, t } = useSession();
  const [data, setData] = useState<SurveyData | null>(null);
  const [showRevenue, setShowRevenue] = useState(true);
  const [showSatellite, setShowSatellite] = useState(true);
  const [showBuffer, setShowBuffer] = useState(true);

  useEffect(() => {
    const coordinator = new FakeSurveyCoordinator();
    coordinator.getSurveyData(activeKhasra).then(setData);
  }, [activeKhasra]);

  const handleExport = () => {
    Alert.alert(
      'Demarcation Notice Exported',
      'Joint Physical Demarcation Notice (Section 24 UP Revenue Code) prepared for the Tehsildar.'
    );
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} title={t('surveyHeader')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[Typography.headlineMd, styles.title]}>
          {t('surveyHeader')}
        </Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>
          {t('surveySubhead')} (Plot {activeKhasra}, {session.district})
        </Text>

        {/* Cadastral Visualizer Box */}
        <View style={styles.mapCard}>
          <Svg width="100%" height="200" viewBox="0 0 320 200">
            {/* Background Grid / Satellite base */}
            <Rect width="320" height="200" fill={showSatellite ? '#3B4F3A' : '#F0F4F9'} />

            {/* Road Buffer */}
            {showBuffer && (
              <>
                <Line x1="10" y1="20" x2="310" y2="60" stroke="#FA9441" strokeWidth="16" opacity="0.4" />
                <SvgText x="30" y="45" fontSize="10" fontWeight="bold" fill="#FA9441">
                  PWD Highway Buffer (12m)
                </SvgText>
              </>
            )}

            {/* Official BhuNaksha Boundary (Blue) */}
            {showRevenue && (
              <Polygon
                points="60,70 260,80 240,180 80,170"
                fill="rgba(0, 94, 162, 0.25)"
                stroke="#005EA2"
                strokeWidth="2.5"
              />
            )}

            {/* Actual Ground Demarcation (Orange/Red overlap) */}
            <Polygon
              points="60,70 230,78 220,180 80,170"
              fill="rgba(213, 67, 9, 0.25)"
              stroke="#D54309"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            <SvgText x="110" y="130" fontSize="12" fontWeight="bold" fill="#FFFFFF">
              Plot {activeKhasra} (-0.025 Ha Deficit)
            </SvgText>
          </Svg>

          {/* Layer toggles */}
          <View style={styles.togglesRow}>
            <TouchableOpacity
              style={[styles.toggleChip, showRevenue && styles.activeChip]}
              onPress={() => setShowRevenue(!showRevenue)}
            >
              <Text style={styles.chipText}>Revenue Map (1:2000)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleChip, showSatellite && styles.activeChip]}
              onPress={() => setShowSatellite(!showSatellite)}
            >
              <Text style={styles.chipText}>Satellite</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleChip, showBuffer && styles.activeChip]}
              onPress={() => setShowBuffer(!showBuffer)}
            >
              <Text style={styles.chipText}>Road Buffer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {data && (
          <View style={styles.card}>
            <Text style={[Typography.bodyLg, styles.cardTitle]}>
              Boundary Discrepancy Findings
            </Text>

            <View style={styles.metricGrid}>
              <View style={styles.metricCol}>
                <Text style={styles.mLabel}>Deed Registered Area</Text>
                <Text style={styles.mVal}>{data.deedAreaHa} Ha (1.037 Acre)</Text>
              </View>
              <View style={styles.metricCol}>
                <Text style={styles.mLabel}>Ground Measured Area</Text>
                <Text style={styles.mVal}>{data.groundAreaHa} Ha (0.976 Acre)</Text>
              </View>
            </View>

            <StatusBanner
              type="WARNING"
              title="0.025 Hectare (250 sq.m) Deficit"
              message={data.recommendation}
              iconName="warning"
            />
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="Export Demarcation Notice (Sec. 24)"
            onPress={handleExport}
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
  mapCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    overflow: 'hidden',
    marginBottom: 16,
  },
  togglesRow: {
    flexDirection: 'row',
    padding: 10,
    gap: 8,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  toggleChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.surfaceContainer,
  },
  activeChip: {
    backgroundColor: Colors.infoBg,
    borderWidth: 1,
    borderColor: Colors.actionBlue,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.actionBlue,
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
  metricGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCol: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 4,
  },
  mLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  mVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
