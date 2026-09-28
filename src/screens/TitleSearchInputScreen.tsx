import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { LabeledTextField } from '../components/LabeledTextField';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusBanner } from '../components/StatusBanner';

export const TitleSearchInputScreen: React.FC = () => {
  const { session, navigate, goBack, t } = useSession();

  const [village, setVillage] = useState('Banthra');
  const [khasraNo, setKhasraNo] = useState('248/2');
  const [loading, setLoading] = useState(false);

  const handleRunSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('TitleReport', { khasraNo });
    }, 400);
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[Typography.headlineMd, styles.title]}>
          {t('searchRecordsTitle')}
        </Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>
          {t('searchRecordsDesc')}
        </Text>

        {/* Jurisdiction Info Box */}
        <View style={styles.jurisdictionBox}>
          <View style={styles.jurisdictionRow}>
            <MaterialIcons name="account-balance" size={18} color={Colors.actionBlue} />
            <Text style={[Typography.caption, styles.jurisdictionLabel]}>
              Revenue Jurisdiction:
            </Text>
          </View>
          <Text style={[Typography.bodyMd, styles.jurisdictionValue]}>
            {session.district} · {session.tehsil} · UP Bhulekh
          </Text>
        </View>

        {/* Input Card */}
        <View style={styles.formCard}>
          <LabeledTextField
            label={t('villageLabel')}
            value={village}
            onChangeText={setVillage}
            required
          />

          <LabeledTextField
            label={t('khasraLabel')}
            value={khasraNo}
            onChangeText={setKhasraNo}
            placeholder={t('khasraPlaceholder')}
            required
            helperText="Enter official plot/khasra number."
          />

          {/* Quick Demo Chips */}
          <View style={styles.chipsSection}>
            <Text style={[Typography.caption, styles.chipsLabel]}>
              Quick Demo Samples:
            </Text>
            <View style={styles.chipsRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  khasraNo === '248/2' && styles.selectedChip,
                ]}
                onPress={() => setKhasraNo('248/2')}
              >
                <Text style={styles.chipText}>248/2 (Clean Title 82)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.chip,
                  khasraNo === '248/1' && styles.selectedChip,
                ]}
                onPress={() => setKhasraNo('248/1')}
              >
                <Text style={styles.chipText}>248/1 (Disputed 38)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <StatusBanner
          type="INFO"
          title="Demo Even/Odd Rule"
          message={t('evenOddHint')}
          iconName="lightbulb"
        />

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={t('runVerifyBtn')}
            onPress={handleRunSearch}
            loading={loading}
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
  title: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  jurisdictionBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 12,
    marginBottom: 16,
  },
  jurisdictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  jurisdictionLabel: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  jurisdictionValue: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginLeft: 24,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    marginBottom: 16,
  },
  chipsSection: {
    marginTop: 4,
  },
  chipsLabel: {
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  selectedChip: {
    backgroundColor: Colors.infoBg,
    borderColor: Colors.actionBlue,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.actionBlue,
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
