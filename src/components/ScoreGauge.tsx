import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const isGreen = score >= 80;
  const isAmber = score >= 50 && score < 80;

  const scoreColor = isGreen ? Colors.success : isAmber ? Colors.warning : Colors.danger;
  const scoreBg = isGreen ? Colors.successBg : isAmber ? Colors.warningBg : Colors.dangerBg;
  const statusLabel = isGreen
    ? 'CLEAN TITLE · MARKETABLE'
    : isAmber
    ? 'MODERATE RISK · REVIEWS NEEDED'
    : 'CRITICAL TITLE DISPUTE';

  return (
    <View style={[styles.container, { backgroundColor: scoreBg }]}>
      <View style={styles.topRow}>
        <View style={[styles.badge, { backgroundColor: scoreColor }]}>
          <Text style={styles.badgeText}>{statusLabel}</Text>
        </View>
        <Text style={[Typography.captionSm, styles.scaleText]}>Max: 100</Text>
      </View>

      <View style={styles.scoreRow}>
        <Text style={[styles.scoreNumber, { color: scoreColor }]}>{score}</Text>
        <Text style={styles.scoreTotal}>/100</Text>
      </View>

      {/* Progress Track */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(Math.max(score, 5), 100)}%`,
              backgroundColor: scoreColor,
            },
          ]}
        />
      </View>

      <View style={styles.bandsLegend}>
        <Text style={[Typography.captionSm, styles.legendItem]}>0-49 Red</Text>
        <Text style={[Typography.captionSm, styles.legendItem]}>50-79 Amber</Text>
        <Text style={[Typography.captionSm, styles.legendItem]}>80-100 Green</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scaleText: {
    color: Colors.textSecondary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 52,
  },
  scoreTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 6,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  bandsLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  legendItem: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
});
