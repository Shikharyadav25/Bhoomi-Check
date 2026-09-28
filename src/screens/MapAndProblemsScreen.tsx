import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, G, Text as SvgText, Rect } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';
import { OfficialBanner } from '../components/OfficialBanner';
import { AppTopBar } from '../components/AppTopBar';

interface ProblemItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  badge?: string;
  screen: any;
}

export const MapAndProblemsScreen: React.FC = () => {
  const { session, navigate, t } = useSession();
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const isBuyer = session.mode === 'BUYER';

  const buyerProblems: ProblemItem[] = [
    {
      id: 'title_search',
      title: t('titleSearchTitle'),
      description: t('titleSearchDesc'),
      icon: 'manage-search',
      badge: '30-Yr',
      screen: 'TitleSearchInput',
    },
    {
      id: 'ec',
      title: t('ecTitle'),
      description: t('ecDesc'),
      icon: 'receipt-long',
      screen: 'EcAnalysis',
    },
    {
      id: 'eligibility',
      title: t('buyerEligibilityTitle'),
      description: t('buyerEligibilityDesc'),
      icon: 'verified-user',
      badge: 'Sec. 89',
      screen: 'BuyerEligibility',
    },
    {
      id: 'survey',
      title: t('surveyTitle'),
      description: t('surveyDesc'),
      icon: 'satellite-alt',
      screen: 'SurveyTracker',
    },
  ];

  const sellerProblems: ProblemItem[] = [
    {
      id: 'land_records',
      title: t('landRecordsTitle'),
      description: t('landRecordsDesc'),
      icon: 'folder-shared',
      screen: 'LandRecordsPlaceholder',
    },
    {
      id: 'seller_ec',
      title: t('ecTitle'),
      description: t('ecDesc'),
      icon: 'receipt-long',
      screen: 'EcAnalysis',
    },
    {
      id: 'section_80',
      title: t('section80Title'),
      description: t('section80Desc'),
      icon: 'gavel',
      badge: 'Sec. 80',
      screen: 'Section80Placeholder',
    },
    {
      id: 'seller_survey',
      title: t('surveyTitle'),
      description: t('surveyDesc'),
      icon: 'satellite-alt',
      screen: 'SurveyTracker',
    },
    {
      id: 'bayana',
      title: t('bayanaTitle'),
      description: t('bayanaDesc'),
      icon: 'history-edu',
      screen: 'BayanaDraft',
    },
    {
      id: 'execute_deed',
      title: t('executeDeedTitle'),
      description: t('executeDeedDesc'),
      icon: 'assignment-turned-in',
      screen: 'ExecuteSaleDeedPlaceholder',
    },
  ];

  const problems = isBuyer ? buyerProblems : sellerProblems;

  return (
    <View style={styles.screen}>
      <OfficialBanner />
      <AppTopBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* District Map Card */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <View style={styles.districtBadge}>
              <MaterialIcons name="place" size={16} color={Colors.actionBlue} />
              <Text style={styles.districtText}>
                {session.district}, UP
              </Text>
            </View>

            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => navigate('LocationSelect')}
              accessibilityLabel="Change district"
            >
              <Text style={styles.changeText}>{t('changeDistrict')}</Text>
              <MaterialIcons name="chevron-right" size={16} color={Colors.actionBlue} />
            </TouchableOpacity>
          </View>

          {/* UP District Vector Map */}
          <View style={styles.mapCanvas}>
            <Svg width="100%" height="180" viewBox="0 0 320 180">
              <Rect width="320" height="180" fill="#E8EEF5" />
              {/* Surrounding state boundaries */}
              <Path
                d="M 10 20 L 70 10 L 140 25 L 210 15 L 290 35 L 310 90 L 290 150 L 200 170 L 110 160 L 30 140 Z"
                fill="#D4E0EC"
                stroke="#B8C8D8"
                strokeWidth="1.5"
              />

              {/* UP Districts polygons */}
              {/* Western UP */}
              <Path d="M 40 45 L 85 30 L 95 75 L 50 85 Z" fill="#C5D5E5" stroke="#FFFFFF" strokeWidth="1.5" />
              <SvgText x="58" y="60" fontSize="8" fill="#4A5568">Agra/Meerut</SvgText>

              {/* Central / Lucknow (Selected) */}
              <Path
                d="M 125 60 L 175 55 L 185 100 L 135 105 Z"
                fill={Colors.actionBlue}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <SvgText x="135" y="85" fontSize="10" fontWeight="bold" fill="#FFFFFF">
                {session.district}
              </SvgText>

              {/* Eastern / Varanasi / Gorakhpur */}
              <Path d="M 195 55 L 260 45 L 275 95 L 205 105 Z" fill="#C5D5E5" stroke="#FFFFFF" strokeWidth="1.5" />
              <SvgText x="215" y="75" fontSize="8" fill="#4A5568">Varanasi</SvgText>

              {/* Southern UP */}
              <Path d="M 130 115 L 195 110 L 190 155 L 120 150 Z" fill="#C5D5E5" stroke="#FFFFFF" strokeWidth="1.5" />
              <SvgText x="140" y="135" fontSize="8" fill="#4A5568">Prayagraj</SvgText>
            </Svg>

            {/* Map Controls */}
            <View style={styles.zoomControls}>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              >
                <MaterialIcons name="add" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              >
                <MaterialIcons name="remove" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Problems & Services Section */}
        <View style={styles.problemsHeader}>
          <Text style={[Typography.headlineMd, styles.problemsTitle]}>
            {t('whatNeedHelp')}
          </Text>
          <Text style={[Typography.bodySm, styles.problemsSubtitle]}>
            {isBuyer ? t('buyerServicesSubtitle') : t('sellerServicesSubtitle')}
          </Text>
        </View>

        {/* Problem items list */}
        {problems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.problemCard}
            onPress={() => navigate(item.screen)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.title}
          >
            <View style={styles.problemIconBox}>
              <MaterialIcons name={item.icon} size={22} color={Colors.actionBlue} />
            </View>

            <View style={styles.problemTextColumn}>
              <View style={styles.problemTitleRow}>
                <Text style={[Typography.bodyLg, styles.problemTitle]}>
                  {item.title}
                </Text>
                {item.badge && (
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={[Typography.bodySm, styles.problemDesc]}>
                {item.description}
              </Text>
            </View>

            <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
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
  mapCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  districtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  districtText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeText: {
    fontSize: 13,
    color: Colors.actionBlue,
    fontWeight: '600',
  },
  mapCanvas: {
    position: 'relative',
    height: 180,
    backgroundColor: '#E8EEF5',
  },
  zoomControls: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    elevation: 2,
  },
  zoomButton: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  problemsHeader: {
    marginBottom: 12,
  },
  problemsTitle: {
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  problemsSubtitle: {
    color: Colors.textSecondary,
  },
  problemCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  problemIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.infoBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  problemTextColumn: {
    flex: 1,
    marginRight: 8,
  },
  problemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  problemTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  tagBadge: {
    backgroundColor: '#D2E4FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  tagBadgeText: {
    color: Colors.actionBlue,
    fontSize: 10,
    fontWeight: '700',
  },
  problemDesc: {
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
