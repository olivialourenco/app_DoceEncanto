import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FreteOption } from '../types';
import { calculateFreteFromStore, formatCep, isValidCep } from '../services';
import { usePersistentState } from '../hooks';
import { STORAGE_KEYS } from '../types';
import Texto from './Texto';
import { colors, borderRadius, spacing, shadows } from '../theme';

interface FreteCalculatorProps {
  cartWeight?: number;
}

export default function FreteCalculator({ cartWeight = 0.5 }: FreteCalculatorProps) {
  const [lastCep, setLastCep] = usePersistentState<string>(STORAGE_KEYS.LAST_CEP, '');
  const [cep, setCep] = useState(lastCep);
  const [freteOptions, setFreteOptions] = useState<FreteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update cep when lastCep is loaded from storage
  React.useEffect(() => {
    if (lastCep && !cep) {
      setCep(lastCep);
    }
  }, [lastCep]);

  const handleCepChange = (text: string) => {
    const formatted = formatCep(text);
    setCep(formatted);
    setError(null);
  };

  const handleCalculate = async () => {
    if (!isValidCep(cep)) {
      setError('Digite um CEP válido (8 dígitos)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFreteOptions([]);

    try {
      const options = await calculateFreteFromStore(cep, cartWeight);
      setFreteOptions(options);
      setLastCep(cep);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular frete');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Texto style={styles.title}>📦 Calcular Frete</Texto>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CEP"
          placeholderTextColor={colors.textMuted}
          value={cep}
          onChangeText={handleCepChange}
          keyboardType="numeric"
          maxLength={9}
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Ionicons name="search" size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={colors.error} />
          <Texto style={styles.errorText}>{error}</Texto>
        </View>
      )}

      {freteOptions.length > 0 && (
        <View style={styles.optionsContainer}>
          {freteOptions.map(option => (
            <View key={option.codigo} style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <Texto style={styles.optionName}>{option.nome}</Texto>
                <Texto style={styles.optionPrice}>R$ {option.valor.replace('.', ',')}</Texto>
              </View>
              <Texto style={styles.optionPrazo}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} /> {option.prazo}
              </Texto>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: 'FontePadrao',
  },
  button: {
    backgroundColor: colors.pastelPink,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
  },
  optionsContainer: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  optionCard: {
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.chocolateBrown,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
  optionPrazo: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

