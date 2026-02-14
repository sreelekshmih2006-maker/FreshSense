export type ItemCategory = 'Dairy' | 'Produce' | 'Meat' | 'Pantry' | 'Frozen' | 'Beverage' | 'Other';
export type ItemStatus = 'fresh' | 'expiring' | 'expired';
export type ItemSource = 'manual' | 'fridge_scan' | 'receipt_scan';

export interface FridgeItem {
    id: string;
    name: string;
    category: ItemCategory;
    quantity: string;
    expiryDate?: string; // ISO 8601 date string
    purchaseDate: string; // ISO 8601 date string
    addedDate: string; // ISO 8601 date string
    status: ItemStatus;
    source: ItemSource;
    confidence: number; // 0 to 1
    storageTips?: string;
    notes?: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: string[]; // List of ingredient names used
    missingIngredients: string[]; // List of ingredients to buy
    instructions: string[];
    prepTime: string;
    cookTime: string;
}

export interface AppState {
    items: FridgeItem[];
    isLoading: boolean;
    apiKey: string | null;
    addItem: (item: FridgeItem) => void;
    updateItem: (id: string, item: Partial<FridgeItem>) => void;
    removeItem: (id: string) => void;
    setApiKey: (key: string) => void;
    setLoading: (loading: boolean) => void;
}
