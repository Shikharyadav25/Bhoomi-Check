import { TextStyle } from 'react-native';

export const Typography: Record<string, TextStyle> = {
  headlineLg: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  headlineMd: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  headlineSm: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodyLg: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodyMd: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySm: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  labelLg: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
  labelMd: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  captionSm: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
  },
};
