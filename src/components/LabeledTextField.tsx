import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Colors, Radius } from '../theme/colors';
import { Typography } from '../theme/typography';

interface LabeledTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
}

export const LabeledTextField: React.FC<LabeledTextFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorMessage,
  required = false,
  keyboardType = 'default',
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = errorMessage
    ? Colors.danger
    : isFocused
    ? Colors.actionBlue
    : Colors.borderStrong;

  const borderWidth = isFocused || errorMessage ? 2 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[Typography.labelMd, styles.labelText]}>{label}</Text>
        {required && <Text style={styles.requiredStar}> *</Text>}
      </View>

      <TextInput
        style={[
          styles.input,
          {
            borderColor,
            borderWidth,
            backgroundColor: editable ? Colors.surface : Colors.surfaceContainerLow,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        keyboardType={keyboardType}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityLabel={label}
      />

      {errorMessage ? (
        <Text style={[Typography.caption, styles.errorText]}>{errorMessage}</Text>
      ) : helperText ? (
        <Text style={[Typography.caption, styles.helperText]}>{helperText}</Text>
      ) : null}
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
  input: {
    height: 48,
    borderRadius: Radius.input,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  helperText: {
    color: Colors.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
  errorText: {
    color: Colors.danger,
    marginTop: 4,
    fontSize: 12,
  },
});
