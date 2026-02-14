"use client";

import React, { useState } from 'react';
import { ChefHat, Clock, AlertTriangle, X, ArrowLeft, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/lib/store';
import { Recipe } from '@/lib/types';
import styles from './RecipeModal.module.css';

interface RecipeModalProps {
    onClose: () => void;
}

export function RecipeModal({ onClose }: RecipeModalProps) {
    const { items, removeItem } = useStore();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const generateRecipes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/ai/generate-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) throw new Error('Failed to generate recipes');

            const data = await response.json();
            setRecipes(data.recipes);
        } catch (err) {
            console.error(err);
            setError('Could not generate recipes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCook = (e: React.MouseEvent, recipe: Recipe) => {
        e.stopPropagation();
        if (confirm(`Cook ${recipe.title}? This will remove used ingredients from your fridge.`)) {
            const ingredients = recipe.ingredients.map(i => i.toLowerCase());
            const itemsToRemove = items.filter(item =>
                ingredients.some(ing => ing.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(ing))
            );

            itemsToRemove.forEach(item => removeItem(item.id));
            alert(`Cooked! Removed ${itemsToRemove.length} items from fridge.`);
            onClose();
        }
    };

    React.useEffect(() => {
        generateRecipes();
    }, []);

    const selectedRecipe = expandedIndex !== null ? recipes[expandedIndex] : null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        {selectedRecipe ? (
                            <Button variant="ghost" size="icon" onClick={() => setExpandedIndex(null)}>
                                <ArrowLeft size={24} />
                            </Button>
                        ) : (
                            <ChefHat className={styles.icon} />
                        )}
                        <h2 className={styles.title}>
                            {selectedRecipe ? selectedRecipe.title : 'Chef AI Suggestions'}
                        </h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={24} />
                    </Button>
                </div>

                <div className={styles.content}>
                    {isLoading && (
                        <div className={styles.loading}>
                            <div className="animate-spin" style={{ width: 32, height: 32, border: '3px solid var(--color-primary)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                            <p>Dreaming up delicious recipes...</p>
                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            <AlertTriangle size={24} />
                            <p>{error}</p>
                            <Button onClick={generateRecipes} variant="primary" size="sm">Try Again</Button>
                        </div>
                    )}

                    {!isLoading && !error && !selectedRecipe && (
                        <div className={styles.recipeList}>
                            {recipes.map((recipe, idx) => (
                                <Card
                                    key={idx}
                                    className={styles.recipeCard}
                                    padding="md"
                                    variant="glass"
                                    onClick={() => setExpandedIndex(idx)}
                                >
                                    <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                                    <p className={styles.description}>{recipe.description}</p>

                                    <div className={styles.meta}>
                                        <span className={styles.metaItem}><Clock size={16} /> {recipe.prepTime}</span>
                                        <span className={styles.metaItem}><Utensils size={16} /> {recipe.cookTime}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {!isLoading && !error && selectedRecipe && (
                        <div className={styles.detailView}>
                            <div className={styles.meta}>
                                <span className={styles.metaItem}><Clock size={16} /> Prep: {selectedRecipe.prepTime}</span>
                                <span className={styles.metaItem}><Clock size={16} /> Cook: {selectedRecipe.cookTime}</span>
                            </div>

                            <p className={styles.detailDescription}>{selectedRecipe.description}</p>

                            <div className={styles.detailSection}>
                                <h4>Ingredients</h4>
                                <div className={styles.tags}>
                                    {selectedRecipe.ingredients.map(i => <span key={i} className={styles.tag}>{i}</span>)}
                                    {selectedRecipe.missingIngredients.map(i => <span key={i} className={`${styles.tag} ${styles.missing}`}>{i} (missing)</span>)}
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <h4>Instructions</h4>
                                <ol className={styles.instructionList}>
                                    {selectedRecipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                                </ol>
                            </div>

                            <div className={styles.actions}>
                                <Button
                                    variant="primary"
                                    className={styles.cookButton}
                                    onClick={(e) => handleCook(e, selectedRecipe)}
                                    leftIcon={<ChefHat size={18} />}
                                    size="lg"
                                >
                                    Cook It!
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
