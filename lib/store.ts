import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, FridgeItem, ItemStatus } from './types';

// Helper to determine status based on expiry
export const calculateStatus = (expiryDate?: string): ItemStatus => {
    if (!expiryDate) return 'fresh';
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'expired';
    if (diffDays <= 3) return 'expiring';
    return 'fresh';
};

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            items: [],
            isLoading: false,
            apiKey: null,

            addItem: (item) => set((state) => ({
                items: [...state.items, { ...item, status: calculateStatus(item.expiryDate) }]
            })),

            updateItem: (id, updatedItem) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id
                        ? { ...item, ...updatedItem, status: calculateStatus(updatedItem.expiryDate || item.expiryDate) }
                        : item
                ),
            })),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),

            setApiKey: (key) => set({ apiKey: key }),
            setLoading: (loading) => set({ isLoading: loading }),
        }),
        {
            name: 'freshsense-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
