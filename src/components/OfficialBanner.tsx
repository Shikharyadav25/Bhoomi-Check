import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';

export const OfficialBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftRow}>
          <MaterialIcons name="security" size={16} color={Colors.textSecondary} />
          <Text style={[Typography.caption, styles.bannerText]} numberOfLines={1}>
            {t('officialBannerTitle')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
          accessibilityLabel="Information about official statutory service"
        >
          <Text style={[Typography.caption, styles.howText]}>
            {t('officialBannerHow')}
          </Text>
          <MaterialIcons
            name={expanded ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={18}
            color={Colors.actionBlue}
          />
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.detailsBox}>
          <Text style={[Typography.caption, styles.detailsText]}>
            BhoomiCheck provides deterministic analysis of official land records from Uttar Pradesh
            revenue authorities (UP Bhulekh, Bhunaksha, Sub-Registrar registry).
          </Text>
        </View>
      )}

      {/* 3px Gold highlight bar */}
      <View style={styles.goldBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  content: {
    minHeight: 34,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  bannerText: {
    color: Colors.textSecondary,
    marginLeft: 6,
    fontSize: 12,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  howText: {
    color: Colors.actionBlue,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  detailsBox: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  detailsText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  goldBar: {
    height: 3,
    backgroundColor: Colors.gold,
    width: '100%',
  },
});
