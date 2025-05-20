// File: components/TopSummary.tsx
import React from 'react';
import Card from '../components/ui/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SummaryCard {
  title: string;
  subtitle?: string;
  details: React.ReactNode;
  footer?: React.ReactNode;
}

export interface TopSummaryProps {
  cards: SummaryCard[];
}

const TopSummary: React.FC<TopSummaryProps> = ({ cards }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {cards.map((card, idx) => (
      <Card key={idx}>
        <h3 className="text-sm text-[#7E7979] mb-1">{card.title}</h3>
        <div className="  flex flex-col">{card.details}</div>
        {card.footer}
      </Card>
    ))}
  </div>
);

export default TopSummary;
