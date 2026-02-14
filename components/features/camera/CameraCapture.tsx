"use client";

import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './CameraCapture.module.css';

interface CameraCaptureProps {
    onCapture: (file: File) => void;
    onManualEntry?: () => void;
}

export function CameraCapture({ onCapture, onManualEntry }: CameraCaptureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onCapture(files[0]);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onCapture(files[0]);
        }
    }, [onCapture]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    return (
        <Card className={styles.container} variant="glass" padding="lg">
            <div
                className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className={styles.iconWrapper}>
                    <Camera size={48} className={styles.icon} />
                </div>
                <h3 className={styles.title}>Capture or Upload</h3>
                <p className={styles.description}>
                    Take a photo of your fridge or receipt to magically extract items.
                </p>

                <div className={styles.actions}>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        className={styles.hiddenInput}
                        onChange={handleFileChange}
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        leftIcon={<Camera size={20} />}
                        variant="primary"
                    >
                        Take Photo
                    </Button>
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        leftIcon={<Upload size={20} />}
                        variant="outline"
                    >
                        Upload Image
                    </Button>
                </div>
            </div>

            {onManualEntry && (
                <div className={styles.divider}>
                    <span className={styles.dividerLine} />
                    <span className={styles.dividerText}>or</span>
                    <span className={styles.dividerLine} />
                </div>
            )}

            {onManualEntry && (
                <Button
                    onClick={onManualEntry}
                    leftIcon={<PenLine size={20} />}
                    variant="ghost"
                    className={styles.manualBtn}
                >
                    Add Items Manually
                </Button>
            )}
        </Card>
    );
}
