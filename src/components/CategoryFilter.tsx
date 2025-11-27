import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductCategory } from '../types';
import Texto from './Texto';
import { colors, borderRadius, spacing } from '../theme';

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const CATEGORY_EMOJIS: Record<ProductCategory, string> = {
  Brigadeiros: '🍫',
  Bolos: '🎂',
  Tortas: '🥧',
  Cookies: '🍪',
  Docinhos: '🍬',
  Especiais: '✨',
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.chip, !selectedCategory && styles.chipActive]}
        onPress={() => onSelectCategory(null)}
      >
        <Texto style={[styles.chipText, !selectedCategory && styles.chipTextActive]}>
          🏠 Todos
        </Texto>
      </TouchableOpacity>

      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[styles.chip, selectedCategory === category && styles.chipActive]}
          onPress={() => onSelectCategory(category)}
        >
          <Texto
            style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}
          >
            {CATEGORY_EMOJIS[category]} {category}
          </Texto>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.pastelPink,
    marginRight: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.pastelPink,
    borderColor: colors.pastelPinkDark,
  },
  chipText: {
    fontSize: 14,
    color: colors.chocolateBrown,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.chocolateDark,
    fontWeight: '700',
  },
});

