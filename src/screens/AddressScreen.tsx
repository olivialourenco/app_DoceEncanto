import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Address, STORAGE_KEYS } from '../types';
import { fetchAddressByCep, formatCep, isValidCep } from '../services';
import { usePersistentState } from '../hooks';
import { Texto, MusicToggle } from '../components';
import { colors, spacing, borderRadius, shadows } from '../theme';

export default function AddressScreen() {
  const [lastCep, setLastCep] = usePersistentState<string>(STORAGE_KEYS.LAST_CEP, '');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill with last used CEP
  useEffect(() => {
    if (lastCep && !cep) {
      setCep(lastCep);
    }
  }, [lastCep]);

  const handleCepChange = (text: string) => {
    const formatted = formatCep(text);
    setCep(formatted);
    setError(null);
  };

  const handleSearch = async () => {
    if (!isValidCep(cep)) {
      setError('Digite um CEP válido (8 dígitos)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAddress(null);

    try {
      const addressData = await fetchAddressByCep(cep);
      setAddress(addressData);
      setLastCep(cep);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar CEP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = () => {
    if (address) {
      Alert.alert(
        'Endereço Salvo',
        `Endereço salvo com sucesso!\n\n${address.logradouro}, ${address.bairro}\n${address.localidade} - ${address.uf}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <Texto style={styles.headerTitle}>📍 Endereço de Entrega</Texto>
        <MusicToggle size="small" />
      </View>

      <View style={styles.body}>
        {/* CEP Input */}
        <View style={styles.section}>
          <Texto style={styles.sectionTitle}>Buscar por CEP</Texto>
          <Texto style={styles.sectionSubtitle}>
            Digite seu CEP para preencher automaticamente o endereço
          </Texto>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.cepInput}
              placeholder="00000-000"
              placeholderTextColor={colors.textMuted}
              value={cep}
              onChangeText={handleCepChange}
              keyboardType="numeric"
              maxLength={9}
            />
            <TouchableOpacity
              style={[styles.searchButton, isLoading && styles.buttonDisabled]}
              onPress={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <>
                  <Ionicons name="search" size={18} color={colors.white} />
                  <Texto style={styles.searchButtonText}>Buscar</Texto>
                </>
              )}
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={colors.error} />
              <Texto style={styles.errorText}>{error}</Texto>
            </View>
          )}
        </View>

        {/* Address Form */}
        {address && (
          <View style={styles.section}>
            <Texto style={styles.sectionTitle}>Endereço Encontrado</Texto>

            <View style={styles.formGroup}>
              <Texto style={styles.label}>Rua / Logradouro</Texto>
              <TextInput
                style={styles.input}
                value={address.logradouro}
                editable={false}
              />
            </View>

            <View style={styles.formGroup}>
              <Texto style={styles.label}>Bairro</Texto>
              <TextInput
                style={styles.input}
                value={address.bairro}
                editable={false}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 2 }]}>
                <Texto style={styles.label}>Cidade</Texto>
                <TextInput
                  style={styles.input}
                  value={address.localidade}
                  editable={false}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Texto style={styles.label}>UF</Texto>
                <TextInput
                  style={styles.input}
                  value={address.uf}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Texto style={styles.label}>Número</Texto>
              <TextInput
                style={styles.input}
                placeholder="Digite o número"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Texto style={styles.label}>Complemento (opcional)</Texto>
              <TextInput
                style={styles.input}
                placeholder="Apto, bloco, etc."
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
              <Ionicons name="checkmark-circle" size={20} color={colors.white} />
              <Texto style={styles.saveButtonText}>Salvar Endereço</Texto>
            </TouchableOpacity>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.pastelPinkDark} />
          <View style={styles.infoContent}>
            <Texto style={styles.infoTitle}>Sobre a entrega</Texto>
            <Texto style={styles.infoText}>
              Nossos doces são entregues com muito cuidado e carinho. 
              O prazo de entrega varia de acordo com a sua região.
            </Texto>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  body: {
    padding: spacing.md,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cepInput: {
    flex: 1,
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 18,
    color: colors.textPrimary,
    fontFamily: 'FontePadrao',
    letterSpacing: 1,
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: colors.pastelPink,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
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
  formGroup: {
    marginBottom: spacing.md,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: 'FontePadrao',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.chocolateBrown,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.pastelPinkLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

