import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';

interface AppTopBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
}) => {
  const { session, toggleLanguage } = useSession();
  const isSeller = session.mode === 'SELLER';
  const bgColor = isSeller ? Colors.sellerHeader : Colors.navy;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.topRow}>
        <View style={styles.branding}>
          {showBack && onBack ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              accessibilityLabel="Go back"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconCircle}>
              <MaterialIcons name="shield" size={22} color={Colors.actionBlue} />
            </View>
          )}

          <View style={styles.titleColumn}>
            <View style={styles.titleRow}>
              <Text style={[Typography.headlineSm, styles.brandTitle]} numberOfLines={1}>
                {title || 'BhoomiCheck'}
              </Text>
              <View style={styles.upBadge}>
                <Text style={styles.upBadgeText}>UP</Text>
              </View>
            </View>
            <Text style={[Typography.captionSm, styles.brandSubtitle]} numberOfLines={1}>
              {subtitle || 'Civil & Statutory Land Verification Portal'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.langButton}
          onPress={toggleLanguage}
          activeOpacity={0.8}
          accessibilityLabel="Switch language between English and Hindi"
        >
          <MaterialIcons name="translate" size={16} color="#FFFFFF" />
          <Text style={styles.langText}>
            {session.language === 'en' ? 'हिन्दी' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  backButton: {
    marginRight: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  titleColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  upBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  upBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: '#D2E4FF',
    marginTop: 1,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    minHeight: 34,
  },
  langText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
