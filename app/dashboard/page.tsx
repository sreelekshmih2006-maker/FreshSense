"use client";

import React, { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { FridgeItem, ItemStatus } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { RecipeModal } from '@/components/features/fridge/RecipeModal';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const { items } = useStore();
    const [showRecipeModal, setShowRecipeModal] = useState(false);

    const { fresh, expiring, expired } = useMemo(() => {
        return items.reduce((acc, item) => {
            acc[item.status].push(item);
            return acc;
        }, { fresh: [] as FridgeItem[], expiring: [] as FridgeItem[], expired: [] as FridgeItem[] });
    }, [items]);

    const ItemList = ({ title, items, status }: { title: string, items: FridgeItem[], status: ItemStatus }) => {
        if (items.length === 0) return null;

        return (
            <div className={styles.section}>
                <h3 className={`${styles.sectionTitle} ${styles[status]}`}>{title} ({items.length})</h3>
                <div className={styles.grid}>
                    {items.map((item) => (
                        <Card key={item.id} className={styles.itemCard} padding="sm" variant="glass">
                            <div className={styles.itemHeader}>
                                <span className={styles.itemEmoji}>{getCategoryEmoji(item.category)}</span>
                                <span className={`${styles.statusDot} ${styles[status]}`}></span>
                            </div>
                            <h4 className={styles.itemName}>{item.name}</h4>
                            <p className={styles.itemMeta}>{item.quantity}</p>
                            <div className={styles.itemFooter}>
                                <span className={styles.expiryDate}>
                                    Exp: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A'}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 'bold' }}>My Fridge</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>{items.length} items tracked</p>
                </div>
                <Link href="/add">
                    <Button leftIcon={<Plus size={20} />}>Add Item</Button>
                </Link>
            </header>

            {items.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🧊</div>
                    <h2>Your fridge is empty!</h2>
                    <p>Add items by scanning a receipt or taking a photo of your fridge.</p>
                    <Link href="/add">
                        <Button size="lg" variant="primary">Get Started</Button>
                    </Link>
                </div>
            ) : (
                <div className={styles.content}>
                    <ItemList title="Expired" items={expired} status="expired" />
                    <ItemList title="Expiring Soon" items={expiring} status="expiring" />
                    <ItemList title="Fresh" items={fresh} status="fresh" />
                </div>
            )}

            <div className={styles.fabContainer}>
                <Button
                    className={styles.fab}
                    variant="secondary"
                    size="lg"
                    leftIcon={<ChefHat size={20} />}
                    onClick={() => setShowRecipeModal(true)}
                    style={{ borderRadius: '50px', paddingLeft: 24, paddingRight: 24, height: 56, boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)' }}
                >
                    What can I cook?
                </Button>
            </div>

            {showRecipeModal && <RecipeModal onClose={() => setShowRecipeModal(false)} />}
        </div>
    );
}

function getCategoryEmoji(category: string) {
    switch (category) {
        case 'Dairy': return '🥛';
        case 'Produce': return '🥬';
        case 'Meat': return '🥩';
        case 'Pantry': return '🥫';
        case 'Frozen': return '🧊';
        case 'Beverage': return '🥤';
        default: return '📦';
    }
}
