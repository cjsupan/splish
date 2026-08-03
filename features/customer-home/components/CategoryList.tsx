import { ScrollView } from "react-native";

import { Pill } from "@/components/ui/Pill";

import { CustomerHomeCategory } from "../types";

interface CategoryListProps {
  categories: CustomerHomeCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryList({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: CategoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-6"
      contentContainerClassName="gap-3"
    >
      {categories.map((category) => (
        <Pill
          key={category.id}
          selected={selectedCategoryId === category.id}
          onPress={() => onCategoryChange(category.id)}
        >
          {category.label}
        </Pill>
      ))}
    </ScrollView>
  );
}
