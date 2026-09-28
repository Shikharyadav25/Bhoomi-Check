import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Radius } from '../theme/colors';
import { Typography } from '../theme/typography';

interface DropdownFieldProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (option: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  options,
  onSelect,
  required = false,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[Typography.labelMd, styles.labelText]}>{label}</Text>
        {required && <Text style={styles.requiredStar}> *</Text>}
      </View>

      <TouchableOpacity
        style={[styles.box, disabled && styles.disabledBox]}
        onPress={() => !disabled && setModalVisible(true)}
        activeOpacity={0.7}
        accessibilityRole="combobox"
        accessibilityLabel={label}
      >
        <Text style={[Typography.bodyMd, styles.valueText]} numberOfLines={1}>
          {value || 'Select an option'}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={disabled ? Colors.borderStrong : Colors.actionBlue}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[Typography.headlineSm, styles.modalTitle]}>{label}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                accessibilityLabel="Close"
              >
                <MaterialIcons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = item === value;
                return (
                  <TouchableOpacity
                    style={[styles.optionItem, isSelected && styles.selectedOption]}
                    onPress={() => {
                      onSelect(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        Typography.bodyMd,
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                    {isSelected && (
                      <MaterialIcons name="check" size={20} color={Colors.actionBlue} />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  labelText: {
    color: Colors.textPrimary,
  },
  requiredStar: {
    color: Colors.danger,
    fontWeight: '700',
  },
  box: {
    height: 48,
    borderRadius: Radius.input,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderColor: Colors.borderSubtle,
  },
  valueText: {
    color: Colors.textPrimary,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    maxHeight: '75%',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: 8,
  },
  modalTitle: {
    color: Colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  selectedOption: {
    backgroundColor: Colors.infoBg,
  },
  optionText: {
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.actionBlue,
    fontWeight: '700',
  },
});
