import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useSession } from '../context/SessionContext';

interface DisclaimerTextProps {
  customText?: string;
}

export const DisclaimerText: React.FC<DisclaimerTextProps> = ({ customText }) => {
  const { t } = useSession();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="gavel"
        size={18}
        color={Colors.textSecondary}
        style={styles.icon}
      />
      <Text style={[Typography.caption, styles.text]}>
        {customText || t('disclaimerText')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 12,
    marginVertical: 12,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 17,
    fontSize: 12,
  },
});
