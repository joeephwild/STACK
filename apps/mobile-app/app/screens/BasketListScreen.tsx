import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { router } from 'expo-router';
import { 
  Header, 
  SearchBar, 
  FilterChips, 
  BasketCard, 
  LoadingSkeleton,
  type BasketCardProps,
  type FilterChip 
} from '@stack/ui-library';
import { useBasketStore } from '../../store/basketStore';
import type { BasketResponse } from '../../lib/api';

const CATEGORY_FILTERS: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Technology' },
  { id: 'green', label: 'Green Energy' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Finance' },
];

const RISK_LEVEL_FILTERS: FilterChip[] = [
  { id: 'all', label: 'All Risk' },
  { id: 'LOW', label: 'Low Risk' },
  { id: 'MEDIUM', label: 'Medium Risk' },
  { id: 'HIGH', label: 'High Risk' },
];

export default function BasketListScreen() {
  const {
    baskets,
    loading,
    refreshing,
    error,
    pagination,
    filters,
    fetchBaskets,
    loadMoreBaskets,
    refreshBaskets,
    setFilters,
    clearFilters,
    clearError,
  } = useBasketStore();

  const [searchText, setSearchText] = useState(filters.search || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.category ? [filters.category] : ['all']
  );
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>(
    filters.riskLevel ? [filters.riskLevel] : ['all']
  );

  useEffect(() => {
    fetchBaskets();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [error]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilters({
      search: text || undefined,
      category: selectedCategories.includes('all') ? undefined : selectedCategories[0],
      riskLevel: selectedRiskLevels.includes('all') ? undefined : selectedRiskLevels[0] as 'LOW' | 'MEDIUM' | 'HIGH',
    });
  };

  const handleCategoryFilter = (chipId: string) => {
    const newSelection = chipId === 'all' ? ['all'] : [chipId];
    setSelectedCategories(newSelection);
    setFilters({
      search: searchText || undefined,
      category: chipId === 'all' ? undefined : chipId,
      riskLevel: selectedRiskLevels.includes('all') ? undefined : selectedRiskLevels[0] as 'LOW' | 'MEDIUM' | 'HIGH',
    });
  };

  const handleRiskLevelFilter = (chipId: string) => {
    const newSelection = chipId === 'all' ? ['all'] : [chipId];
    setSelectedRiskLevels(newSelection);
    setFilters({
      search: searchText || undefined,
      category: selectedCategories.includes('all') ? undefined : selectedCategories[0],
      riskLevel: chipId === 'all' ? undefined : chipId as 'LOW' | 'MEDIUM' | 'HIGH',
    });
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCategories(['all']);
    setSelectedRiskLevels(['all']);
    clearFilters();
  };

  const handleBasketPress = (basketId: string) => {
    router.push(`/screens/BasketDetailScreen?id=${basketId}`);
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading) {
      loadMoreBaskets();
    }
  };

  const mapBasketToCardProps = (basket: BasketResponse): BasketCardProps => ({
    id: basket.id,
    name: basket.name,
    description: basket.description,
    riskLevel: basket.riskLevel,
    iconUrl: basket.iconUrl,
    performanceIndicator: {
      returnPercentage: basket.performance.percentage,
      totalInvested: basket.totalValue,
      currentValue: basket.totalValue * (1 + basket.performance.percentage / 100),
    },
    onPress: () => handleBasketPress(basket.id),
  });

  const renderBasketCard = ({ item }: { item: BasketResponse }) => (
    <BasketCard {...mapBasketToCardProps(item)} />
  );

  const renderLoadingSkeleton = () => (
    <View className="p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <LoadingSkeleton key={index} className="mb-4 h-32 rounded-lg" />
      ))}
    </View>
  );

  if (loading && baskets.length === 0) {
    return (
      <View className="flex-1 bg-background-primary">
        <Header 
          title="Investment Baskets" 
          subtitle="Curated investment opportunities"
        />
        {renderLoadingSkeleton()}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-primary">
      <Header 
        title="Investment Baskets" 
        subtitle="Curated investment opportunities"
      />
      
      <View className="px-4 py-2">
        <SearchBar
          placeholder="Search baskets..."
          value={searchText}
          onChangeText={setSearchText}
          onSearch={handleSearch}
          className="mb-4"
        />
        
        <FilterChips
          chips={CATEGORY_FILTERS}
          selectedChips={selectedCategories}
          onChipPress={handleCategoryFilter}
          className="mb-2"
        />
        
        <FilterChips
          chips={RISK_LEVEL_FILTERS}
          selectedChips={selectedRiskLevels}
          onChipPress={handleRiskLevelFilter}
          onClearAll={handleClearFilters}
          showClearAll={!selectedCategories.includes('all') || !selectedRiskLevels.includes('all')}
          className="mb-4"
        />
      </View>

      <FlatList
        data={baskets}
        renderItem={renderBasketCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshBaskets}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && baskets.length > 0 ? (
            <LoadingSkeleton className="h-32 rounded-lg mt-4" />
          ) : null
        }
      />
    </View>
  );
}