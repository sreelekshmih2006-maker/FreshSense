"use client";

import React, { useState } from 'react';
import { Plus, ArrowLeft, Package, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ItemCategory } from '@/lib/types';
import styles from './ManualEntry.module.css';

interface ManualItem {
    name: string;
    category: ItemCategory;
    quantity: string;
    daysToExpire: number;
}

interface ManualEntryProps {
    onSave: (items: ManualItem[]) => void;
    onCancel: () => void;
}

const CATEGORIES: ItemCategory[] = ['Produce', 'Dairy', 'Meat', 'Pantry', 'Frozen', 'Beverage', 'Other'];

const DEFAULT_ITEM: ManualItem = {
    name: '',
    category: 'Other',
    quantity: '1',
    daysToExpire: 7,
};

export function ManualEntry({ onSave, onCancel }: ManualEntryProps) {
    const [items, setItems] = useState<ManualItem[]>([{ ...DEFAULT_ITEM }]);

    const addRow = () => {
        setItems(prev => [...prev, { ...DEFAULT_ITEM }]);
    };

    const removeRow = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof ManualItem, value: string | number) => {
        setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const handleSubmit = () => {
        const validItems = items.filter(item => item.name.trim() !== '');
        if (validItems.length === 0) {
            alert('Please add at least one item with a name.');
            return;
        }
        onSave(validItems);
    };

    return (
        <Card variant="glass" padding="lg" className={styles.container}>
            <div className={styles.header}>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <ArrowLeft size={20} />
                </Button>
                <h2 className={styles.title}>Add Items Manually</h2>
            </div>

            <div className={styles.itemList}>
                {items.map((item, idx) => (
                    <div key={idx} className={styles.itemRow}>
                        <div className={styles.rowHeader}>
                            <span className={styles.rowNumber}>#{idx + 1}</span>
                            {items.length > 1 && (
                                <button className={styles.deleteBtn} onClick={() => removeRow(idx)}>
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. Milk, Apples..."
                                value={item.name}
                                onChange={(e) => updateItem(idx, 'name', e.target.value)}
                                autoFocus={idx === 0}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Category</label>
                                <select
                                    className={styles.select}
                                    value={item.category}
                                    onChange={(e) => updateItem(idx, 'category', e.target.value)}
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Quantity</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g. 2, 1 bunch"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                                />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Expires in (days)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    min="1"
                                    value={item.daysToExpire}
                                    onChange={(e) => updateItem(idx, 'daysToExpire', parseInt(e.target.value) || 1)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.addRowBtn} onClick={addRow}>
                <Plus size={18} /> Add Another Item
            </button>

            <div className={styles.actions}>
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit} leftIcon={<Package size={18} />}>
                    Save {items.filter(i => i.name.trim()).length} Item{items.filter(i => i.name.trim()).length !== 1 ? 's' : ''}
                </Button>
            </div>
        </Card>
    );
}
