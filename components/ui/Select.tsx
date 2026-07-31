import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "../../constants/design/theme";

export interface SelectOption<T> {
  label: string;
  value: T;
  code?: string;
}

interface SelectProps<T> {
  label?: string;
  placeholder?: string;
  title?: string;
  options: SelectOption<T>[];
  value: T | undefined;
  onChange: (value: T, code?: string) => void;
  searchable?: boolean;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Select<T extends string | number>({
  label,
  placeholder = "Select an option",
  title = "Select",
  options,
  value,
  onChange,
  searchable = false,
  error,
  disabled = false,
  loading = false,
  className = "mb-4",
}: SelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const selected = options.find((o) => o.value === value);

  const filtered =
    searchable && search.trim()
      ? options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase()),
        )
      : options;

  const handleSelect = (option: SelectOption<T>) => {
    onChange(option.value, option.code);
    setVisible(false);
    setSearch("");
  };

  return (
    <View className={className}>
      {label && (
        <Text
          className="mb-1 text-sm text-text-primary"
          style={{ fontFamily: "DMSansBold" }}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        className={`flex-row items-center justify-between rounded-lg border bg-surface px-4 py-3.5 ${
          error ? "border-danger" : "border-border"
        } ${disabled ? "bg-text-muted/10" : ""}`}
        onPress={() => !disabled && !loading && setVisible(true)}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <>
            <Text
              className={
                selected
                  ? "flex-1 text-base text-text-primary"
                  : "flex-1 text-base text-text-muted"
              }
              style={{ fontFamily: "DMSans" }}
              numberOfLines={1}
            >
              {selected ? selected.label : placeholder}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={18}
              color={colors.textMuted}
            />
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Text
          className="mt-1 text-xs text-danger"
          style={{ fontFamily: "DMSans" }}
        >
          ⚠ {error}
        </Text>
      )}

      <Modal visible={visible} animationType="slide" transparent>
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            className="overflow-hidden rounded-t-3xl bg-background"
            style={{ flex: 1, marginTop: 80 }}
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
              <Text
                className="text-lg text-text-primary"
                style={{ fontFamily: "PlayfairDisplayBold" }}
              >
                {title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setSearch("");
                }}
                className="h-8 w-8 items-center justify-center"
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>
            </View>

            {/* Search */}
            {searchable && (
              <View className="border-b border-border px-5 py-3">
                <View className="flex-row items-center gap-2 rounded-xl border border-border bg-surface px-3">
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={colors.textMuted}
                  />
                  <TextInput
                    className="flex-1 py-2.5 text-base text-text-primary"
                    placeholder="Search..."
                    placeholderTextColor={colors.textMuted}
                    value={search}
                    onChangeText={setSearch}
                    autoFocus
                    style={{ fontFamily: "DMSans" }}
                  />
                  {search.length > 0 && (
                    <TouchableOpacity onPress={() => setSearch("")}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color={colors.textMuted}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Options List */}
            {filtered.length === 0 ? (
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-sm text-text-muted"
                  style={{ fontFamily: "DMSans" }}
                >
                  No results found
                </Text>
              </View>
            ) : (
              <FlatList
                data={filtered}
                keyExtractor={(item, index) => `${item.value}-${index}`}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => {
                  const isSelected = item.value === value;
                  return (
                    <TouchableOpacity
                      className={`flex-row items-center justify-between border-b border-border px-5 py-4 ${
                        isSelected ? "bg-primary-tint" : ""
                      }`}
                      onPress={() => handleSelect(item)}
                    >
                      <Text
                        className={`flex-1 text-base ${isSelected ? "text-primary" : "text-text-primary"}`}
                        style={{
                          fontFamily: isSelected ? "DMSansBold" : "DMSans",
                        }}
                      >
                        {item.label}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
                getItemLayout={(_, index) => ({
                  length: 57,
                  offset: 57 * index,
                  index,
                })}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
