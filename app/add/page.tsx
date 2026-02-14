"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraCapture } from '@/components/features/camera/CameraCapture';
import { ImagePreview } from '@/components/features/camera/ImagePreview';
import { ItemReview } from '@/components/features/fridge/ItemReview';
import { ManualEntry } from '@/components/features/fridge/ManualEntry';
import { useStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function AddPage() {
    const router = useRouter();
    const [step, setStep] = useState<'capture' | 'preview' | 'review' | 'manual'>('capture');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [detectedItems, setDetectedItems] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const addItem = useStore((state) => state.addItem);

    const handleCapture = (file: File) => {
        setImageFile(file);
        setStep('preview');
    };

    const handleAnalyze = async (type: 'fridge' | 'receipt') => {
        if (!imageFile) return;

        setIsAnalyzing(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = async () => {
                const base64Image = reader.result as string;

                try {
                    const response = await fetch('/api/ai/analyze-image', {
                        method: 'POST',
                        body: JSON.stringify({ image: base64Image, type }),
                    });

                    if (!response.ok) throw new Error('Analysis failed');

                    const data = await response.json();
                    setDetectedItems(data.items);
                    setStep('review');
                } catch (error) {
                    console.error(error);
                    alert('Failed to analyze image. Please try again.');
                } finally {
                    setIsAnalyzing(false);
                }
            };
        } catch (error) {
            console.error(error);
            setIsAnalyzing(false);
        }
    };

    const handleSave = (items: any[]) => {
        items.forEach(item => {
            addItem({
                id: uuidv4(),
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                purchaseDate: new Date().toISOString(),
                addedDate: new Date().toISOString(),
                source: 'fridge_scan',
                status: 'fresh',
                confidence: item.confidence || 1,
                expiryDate: new Date(Date.now() + (item.daysToExpire || 7) * 24 * 60 * 60 * 1000).toISOString()
            });
        });

        router.push('/dashboard');
    };

    const handleManualSave = (items: any[]) => {
        items.forEach(item => {
            addItem({
                id: uuidv4(),
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                purchaseDate: new Date().toISOString(),
                addedDate: new Date().toISOString(),
                source: 'manual',
                status: 'fresh',
                confidence: 1,
                expiryDate: new Date(Date.now() + (item.daysToExpire || 7) * 24 * 60 * 60 * 1000).toISOString()
            });
        });

        router.push('/dashboard');
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            {step === 'capture' && (
                <CameraCapture
                    onCapture={handleCapture}
                    onManualEntry={() => setStep('manual')}
                />
            )}

            {step === 'preview' && imageFile && (
                <ImagePreview
                    imageFile={imageFile}
                    onConfirm={handleAnalyze}
                    onRetake={() => setStep('capture')}
                />
            )}

            {step === 'review' && (
                <ItemReview
                    initialItems={detectedItems}
                    onSave={handleSave}
                    onCancel={() => setStep('capture')}
                />
            )}

            {step === 'manual' && (
                <ManualEntry
                    onSave={handleManualSave}
                    onCancel={() => setStep('capture')}
                />
            )}

            {isAnalyzing && (
                <div className="glass-panel" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    zIndex: 50, color: 'white'
                }}>
                    <div className="animate-spin" style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', marginBottom: 16 }}></div>
                    <p>Analyzing image with AI...</p>
                </div>
            )}
        </div>
    );
}
