import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';
import { StepIndicator } from '../components/StepIndicator';
import { DropdownField } from '../components/DropdownField';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusBanner } from '../components/StatusBanner';

const UP_DISTRICTS = [
  'Lucknow',
  'Varanasi',
  'Gorakhpur',
  'Ayodhya',
  'Prayagraj',
  'Kanpur Nagar',
  'Agra',
  'Meerut',
];

const TEHSIL_MAP: Record<string, string[]> = {
  Lucknow: ['Sarojini Nagar', 'Lucknow Sadar', 'Mohanlalganj', 'Bakshi Ka Talab', 'Malihabad'],
  Varanasi: ['Pindra', 'Varanasi Sadar', 'Raja Talab'],
  Gorakhpur: ['Gorakhpur Sadar', 'Campierganj', 'Bansgaon', 'Sahjanwa'],
  Ayodhya: ['Ayodhya Sadar', 'Rudauli', 'Bikapur', 'Sohawal'],
  Prayagraj: ['Sadar', 'Phulpur', 'Koraon', 'Bara', 'Handia'],
  'Kanpur Nagar': ['Kanpur Sadar', 'Ghatampur', 'Bilhaur'],
  Agra: ['Agra Sadar', 'Fatehabad', 'Bah', 'Etmadpur', 'Kheragarh'],
  Meerut: ['Meerut Sadar', 'Mawana', 'Sardhana'],
};

export const LocationSelectScreen: React.FC = () => {
  const { session, setLocation, navigate, goBack, t } = useSession();

  const [selectedDistrict, setSelectedDistrict] = useState(session.district);
  const [selectedTehsil, setSelectedTehsil] = useState(session.tehsil);

  const availableTehsils = TEHSIL_MAP[selectedDistrict] || ['Sadar'];

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    const tehsils = TEHSIL_MAP[district] || ['Sadar'];
    setSelectedTehsil(tehsils[0]);
  };

  const handleContinue = () => {
    setLocation(selectedDistrict, selectedTehsil);
    navigate('MapAndProblems');
  };

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar showBack onBack={goBack} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StepIndicator
          currentStep={2}
          totalSteps={3}
          stepLabel="Geographic Jurisdiction"
        />

        <Text style={[Typography.headlineMd, styles.title]}>
          {t('selectLocationTitle')}
        </Text>
        <Text style={[Typography.bodySm, styles.subtitle]}>
          {t('selectLocationDesc')}
        </Text>

        <View style={styles.formCard}>
          <DropdownField
            label={t('stateLabel')}
            value={t('stateUp')}
            options={[t('stateUp')]}
            onSelect={() => {}}
            disabled
          />

          <DropdownField
            label={t('districtLabel')}
            value={selectedDistrict}
            options={UP_DISTRICTS}
            onSelect={handleDistrictChange}
            required
          />

          {/* Quick chips */}
          <View style={styles.chipsSection}>
            <Text style={[Typography.caption, styles.chipsLabel]}>Popular in UP:</Text>
            <View style={styles.chipsRow}>
              {['Lucknow', 'Varanasi', 'Ayodhya', 'Gorakhpur'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.chip,
                    selectedDistrict === item && styles.selectedChip,
                  ]}
                  onPress={() => handleDistrictChange(item)}
                >
                  <Text
                    style={[
                      Typography.captionSm,
                      styles.chipText,
                      selectedDistrict === item && styles.selectedChipText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <DropdownField
            label={t('tehsilLabel')}
            value={selectedTehsil}
            options={availableTehsils}
            onSelect={setSelectedTehsil}
          />
        </View>

        <StatusBanner
          type="WARNING"
          title={t('statutoryNoticeTitle')}
          message={t('statutoryNoticeDesc')}
        />

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={t('continueToServices')}
            onPress={handleContinue}
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
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    marginBottom: 16,
  },
  chipsSection: {
    marginBottom: 12,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  selectedChip: {
    backgroundColor: Colors.infoBg,
    borderColor: Colors.actionBlue,
  },
  chipText: {
    color: Colors.textPrimary,
  },
  selectedChipText: {
    color: Colors.actionBlue,
    fontWeight: '700',
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
