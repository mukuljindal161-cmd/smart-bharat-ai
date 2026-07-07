import React from 'react';
import { Search } from 'lucide-react';
import { ComingSoonPage } from './ComingSoonPage';

export const SchemesPage: React.FC = () => (
  <ComingSoonPage
    title="Scheme Finder"
    description="Discover government schemes you're eligible for based on your profile, income, location, and other criteria."
    icon={<Search className="h-12 w-12 text-secondary-400 dark:text-secondary-500" />}
  />
);
