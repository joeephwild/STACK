import { create } from 'zustand';
import { apiClient, BasketResponse, GetBasketsResponse } from '../lib/api';

export interface BasketFilters {
  search: string;
  category: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | '';
}

export interface BasketState {
  // Data
  baskets: BasketResponse[];
  selectedBasket: BasketResponse | null;
  
  // UI State
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  
  // Filters
  filters: BasketFilters;
  
  // Pagination
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  
  // Actions
  fetchBaskets: (refresh?: boolean) => Promise<void>;
  loadMoreBaskets: () => Promise<void>;
  refreshBaskets: () => Promise<void>;
  setFilters: (filters: Partial<BasketFilters>) => void;
  clearFilters: () => void;
  setSelectedBasket: (basket: BasketResponse | null) => void;
  fetchBasketById: (id: string) => Promise<void>;
  clearError: () => void;
}

const initialFilters: BasketFilters = {
  search: '',
  category: '',
  riskLevel: '',
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasMore: false,
};

export const useBasketStore = create<BasketState>((set, get) => ({
  // Initial state
  baskets: [],
  selectedBasket: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  filters: initialFilters,
  pagination: initialPagination,

  // Fetch baskets with current filters
  fetchBaskets: async (refresh = false) => {
    const state = get();
    
    if (refresh) {
      set({ isRefreshing: true, error: null });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const params = {
        page: refresh ? 1 : state.pagination.page,
        limit: state.pagination.limit,
        search: state.filters.search || undefined,
        category: state.filters.category || undefined,
        riskLevel: state.filters.riskLevel || undefined,
      };

      const response: GetBasketsResponse = await apiClient.getBaskets(params);
      
      set({
        baskets: refresh ? response.baskets : [...state.baskets, ...response.baskets],
        pagination: {
          ...response.pagination,
          hasMore: response.pagination.page < response.pagination.totalPages,
        },
        isLoading: false,
        isRefreshing: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        isRefreshing: false,
        error: error instanceof Error ? error.message : 'Failed to fetch baskets',
      });
    }
  },

  // Load more baskets for pagination
  loadMoreBaskets: async () => {
    const state = get();
    
    if (state.isLoading || !state.pagination.hasMore) return;

    set({
      pagination: {
        ...state.pagination,
        page: state.pagination.page + 1,
      },
    });

    await state.fetchBaskets();
  },

  // Refresh baskets (pull-to-refresh)
  refreshBaskets: async () => {
    const state = get();
    set({
      pagination: {
        ...state.pagination,
        page: 1,
      },
    });
    await state.fetchBaskets(true);
  },

  // Set filters and refetch
  setFilters: (newFilters: Partial<BasketFilters>) => {
    const state = get();
    const updatedFilters = { ...state.filters, ...newFilters };
    
    set({
      filters: updatedFilters,
      pagination: {
        ...initialPagination,
        limit: state.pagination.limit,
      },
      baskets: [],
    });

    // Fetch with new filters
    state.fetchBaskets(true);
  },

  // Clear all filters
  clearFilters: () => {
    const state = get();
    set({
      filters: initialFilters,
      pagination: {
        ...initialPagination,
        limit: state.pagination.limit,
      },
      baskets: [],
    });

    // Fetch without filters
    state.fetchBaskets(true);
  },

  // Set selected basket
  setSelectedBasket: (basket: BasketResponse | null) => {
    set({ selectedBasket: basket });
  },

  // Fetch specific basket by ID
  fetchBasketById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const basket = await apiClient.getBasketById(id);
      set({
        selectedBasket: basket,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch basket',
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));