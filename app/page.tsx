import Link from 'next/link';
import { ChefHat, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '4rem' }}>

      <div className="animate-fade-in">
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
          Smart Fridge<br />Simulator
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Turn your fridge into a smart inventory system. Snap a photo of your groceries or receipt, and let AI track freshness and suggest recipes.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/add">
            <Button size="lg" variant="primary" leftIcon={<Plus size={20} />}>
              Add Items
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="glass" rightIcon={<ArrowRight size={20} />}>
              View Fridge
            </Button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '900px' }}>
        <FeatureCard
          icon="📸"
          title="Snap & Scan"
          description="Upload a photo of your fridge or a grocery receipt. AI automatically extracts items and quantities."
        />
        <FeatureCard
          icon="⏳"
          title="Track Freshness"
          description="Never let food go to waste. Get estimated expiry dates and status indicators for all your items."
        />
        <FeatureCard
          icon="👨‍🍳"
          title="AI Chef"
          description="Don't know what to cook? Generate creative recipes based on ingredients you already have."
        />
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <Card variant="glass" padding="lg">
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{description}</p>
    </Card>
  );
}
