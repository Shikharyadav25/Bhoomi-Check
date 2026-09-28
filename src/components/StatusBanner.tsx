import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Radius } from '../theme/colors';
import { Typography } from '../theme/typography';

export type StatusBannerType = 'SUCCESS' | 'WARNING' | 'DANGER' | 'INFO';

interface StatusBannerProps {
  type: StatusBannerType;
  title: string;
  message?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  type,
  title,
  message,
  iconName,
}) => {
  const config = {
    SUCCESS: {
      bg: Colors.successBg,
      text: Colors.success,
      defaultIcon: 'check-circle' as const,
    },
    WARNING: {
      bg: Colors.warningBg,
      text: Colors.warning,
      defaultIcon: 'warning' as const,
    },
    DANGER: {
      bg: Colors.dangerBg,
      text: Colors.danger,
      defaultIcon: 'error' as const,
    },
    INFO: {
      bg: Colors.infoBg,
      text: Colors.actionBlue,
      defaultIcon: 'info' as const,
    },
  }[type];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <MaterialIcons
        name={iconName || config.defaultIcon}
        size={22}
        color={config.text}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={[Typography.labelMd, { color: config.text, fontWeight: '700' }]}>
          {title}
        </Text>
        {message ? (
          <Text style={[Typography.caption, styles.message]}>{message}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    width: '100%',
    marginVertical: 6,
  },
  icon: {
    marginRight: 10,
    marginTop: 1,
  },
  content: {
    flex: 1,
  },
  message: {
    color: Colors.textPrimary,
    marginTop: 2,
    lineHeight: 18,
  },
});
