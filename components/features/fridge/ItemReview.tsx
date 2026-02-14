"use client";

import React, { useState } from 'react';
import { Trash2, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { FridgeItem, ItemCategory } from '@/lib/types';
import styles from './ItemReview.module.css';

interface ItemReviewProps {
    initialItems: Partial<FridgeItem>[];
    onSave: (items: any[]) => void;
    onCancel: () => void;
}

export function ItemReview({ initialItems, onSave, onCancel }: ItemReviewProps) {
    const [items, setItems] = useState(initialItems);

    const handleUpdate = (index: number, field: keyof FridgeItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleDelete = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, { name: '', quantity: '1', category: 'Other', confidence: 1 }]);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Review Detected Items</h2>
            <p className={styles.subtitle}>Check the items and confirm to add them to your fridge.</p>

            <div className={styles.itemList}>
                {items.map((item, index) => (
                    <Card key={index} className={styles.itemCard} padding="sm" variant="glass">
                        <div className={styles.itemRow}>
                            <Input
                                value={item.name}
                                onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                                placeholder="Item Name"
                                className={styles.nameInput}
                            />
                            <Input
                                value={item.quantity}
                                onChange={(e) => handleUpdate(index, 'quantity', e.target.value)}
                                placeholder="Qty"
                                className={styles.qtyInput}
                            />
                            <select
                                className={styles.categorySelect}
                                value={item.category}
                                onChange={(e) => handleUpdate(index, 'category', e.target.value)}
                            >
                                <option value="Dairy">Dairy</option>
                                <option value="Produce">Produce</option>
                                <option value="Meat">Meat</option>
                                <option value="Pantry">Pantry</option>
                                <option value="Frozen">Frozen</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Other">Other</option>
                            </select>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(index)}
                                className={styles.deleteBtn}
                            >
                                <Trash2 size={18} className="text-red-400" />
                            </Button>
                        </div>
                        {item.confidence && item.confidence < 0.8 && (
                            <div className={styles.lowConfidence}>
                                ⚠️ Low confidence detection - please verify
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <div className={styles.actions}>
                <Button variant="outline" onClick={handleAdd} leftIcon={<Plus size={18} />}>
                    Add Manual Item
                </Button>
            </div>

            <div className={styles.footer}>
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(items)} leftIcon={<Save size={18} />}>
                    Confirm & Save
                </Button>
            </div>
        </div>
    );
}
