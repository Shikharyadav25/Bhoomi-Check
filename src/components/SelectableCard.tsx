import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Radius } from '../theme/colors';
import { Typography } from '../theme/typography';

interface SelectableCardProps {
  title: string;
  description: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  selected: boolean;
  onPress: () => void;
  activeBadgeText?: string;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  iconName,
  selected,
  onPress,
  activeBadgeText,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={title}
    >
      {/* 4px Left accent border when selected */}
      <View style={[styles.leftAccent, selected && styles.activeAccent]} />

      <View style={styles.cardContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: selected ? Colors.infoBg : Colors.surfaceContainer },
          ]}
        >
          <MaterialIcons
            name={iconName}
            size={24}
            color={selected ? Colors.actionBlue : Colors.textSecondary}
          />
        </View>

        <View style={styles.textColumn}>
          <View style={styles.headerRow}>
            <Text style={[Typography.headlineSm, styles.titleText]}>{title}</Text>
            {selected && activeBadgeText && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeBadgeText}</Text>
              </View>
            )}
          </View>

          <Text style={[Typography.bodySm, styles.descText]}>{description}</Text>
        </View>

        <MaterialIcons
          name="chevron-right"
          size={24}
          color={selected ? Colors.actionBlue : Colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: Colors.actionBlue,
    borderWidth: 1.5,
  },
  leftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  activeAccent: {
    backgroundColor: Colors.actionBlue,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 18,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  titleText: {
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: '#D2E4FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.actionBlue,
    textTransform: 'uppercase',
  },
  descText: {
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
