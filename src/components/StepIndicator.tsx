import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={[Typography.labelMd, styles.stepCounter]}>
          STEP {currentStep} OF {totalSteps}
        </Text>
        <Text style={[Typography.caption, styles.stepLabel]}>{stepLabel}</Text>
      </View>

      <View style={styles.barRow}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;
          return (
            <View
              key={index}
              style={[
                styles.segment,
                {
                  backgroundColor: isCompleted ? Colors.actionBlue : Colors.surfaceContainer,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepCounter: {
    color: Colors.actionBlue,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  stepLabel: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  barRow: {
    flexDirection: 'row',
    gap: 6,
    height: 4,
    width: '100%',
  },
  segment: {
    flex: 1,
    height: '100%',
    borderRadius: 2,
  },
});
