import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { TitleEvent } from '../types/models';

interface TimelineNodeProps {
  event: TitleEvent;
  isLast?: boolean;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ event, isLast = false }) => {
  const markerColor = event.isRisk ? Colors.danger : Colors.success;
  const markerBg = event.isRisk ? Colors.dangerBg : Colors.successBg;

  return (
    <View style={styles.container}>
      {/* Left rail */}
      <View style={styles.rail}>
        <View style={[styles.marker, { backgroundColor: markerBg, borderColor: markerColor }]}>
          <MaterialIcons
            name={event.isRisk ? 'priority-high' : 'check'}
            size={14}
            color={markerColor}
          />
        </View>
        {!isLast && <View style={styles.verticalLine} />}
      </View>

      {/* Right card content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.yearBadge}>
            <Text style={styles.yearText}>{event.year}</Text>
          </View>
          <Text style={[Typography.captionSm, styles.dateText]}>{event.date}</Text>
        </View>

        <Text style={[Typography.bodyLg, styles.typeTitle]}>{event.type}</Text>

        <View style={styles.detailsTable}>
          <View style={styles.detailRow}>
            <Text style={[Typography.caption, styles.label]}>Grantor / विक्रेता:</Text>
            <Text style={[Typography.caption, styles.value]}>{event.grantor}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[Typography.caption, styles.label]}>Grantee / क्रेता:</Text>
            <Text style={[Typography.caption, styles.value, styles.boldValue]}>
              {event.grantee}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[Typography.caption, styles.label]}>Area / रकबा:</Text>
            <Text style={[Typography.caption, styles.value]}>{event.areaSqm}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[Typography.caption, styles.label]}>Doc / विलेख:</Text>
            <Text style={[Typography.caption, styles.value]}>{event.docNumber}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusPill,
            { backgroundColor: event.mutationRecorded ? Colors.successBg : Colors.dangerBg },
          ]}
        >
          <MaterialIcons
            name={event.mutationRecorded ? 'verified' : 'cancel'}
            size={14}
            color={event.mutationRecorded ? Colors.success : Colors.danger}
          />
          <Text
            style={[
              Typography.captionSm,
              { color: event.mutationRecorded ? Colors.success : Colors.danger, fontWeight: '700' },
            ]}
          >
            {event.statusText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  rail: {
    width: 32,
    alignItems: 'center',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: 14,
    marginBottom: 16,
    marginLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  yearBadge: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  yearText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.navy,
  },
  dateText: {
    color: Colors.textSecondary,
  },
  typeTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailsTable: {
    gap: 4,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.textSecondary,
  },
  value: {
    color: Colors.textPrimary,
  },
  boldValue: {
    fontWeight: '600',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
