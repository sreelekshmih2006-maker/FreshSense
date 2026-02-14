import React from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './ImagePreview.module.css';

interface ImagePreviewProps {
    imageFile: File;
    onConfirm: (type: 'fridge' | 'receipt') => void;
    onRetake: () => void;
}

export function ImagePreview({ imageFile, onConfirm, onRetake }: ImagePreviewProps) {
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);
    const [selectedType, setSelectedType] = React.useState<'fridge' | 'receipt'>('fridge');

    React.useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(imageFile);
        return () => {
            // Cleanup if needed
        };
    }, [imageFile]);

    if (!imageSrc) return null;

    return (
        <Card className={styles.container} variant="glass" padding="none">
            <div className={styles.imageContainer}>
                <Image
                    src={imageSrc}
                    alt="Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                />
                <Button
                    variant="glass"
                    size="icon"
                    className={styles.closeButton}
                    onClick={onRetake}
                >
                    <X size={20} />
                </Button>
            </div>

            <div className={styles.controls}>
                <h3 className={styles.title}>What kind of image is this?</h3>

                <div className={styles.typeSelector}>
                    <button
                        className={`${styles.typeOption} ${selectedType === 'fridge' ? styles.selected : ''}`}
                        onClick={() => setSelectedType('fridge')}
                    >
                        <span className={styles.emoji}>🧊</span>
                        <span className={styles.label}>Fridge Interior</span>
                    </button>

                    <button
                        className={`${styles.typeOption} ${selectedType === 'receipt' ? styles.selected : ''}`}
                        onClick={() => setSelectedType('receipt')}
                    >
                        <span className={styles.emoji}>🧾</span>
                        <span className={styles.label}>Grocery Receipt</span>
                    </button>
                </div>

                <div className={styles.actions}>
                    <Button variant="outline" onClick={onRetake}>Retake</Button>
                    <Button
                        variant="primary"
                        onClick={() => onConfirm(selectedType)}
                        rightIcon={<Check size={18} />}
                    >
                        Analyze Image
                    </Button>
                </div>
            </div>
        </Card>
    );
}
