import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ComingSoonPage } from './ComingSoonPage';

export const ReportPage: React.FC = () => (
  <ComingSoonPage
    title="Report Issue"
    description="Report local infrastructure issues, civic problems, and concerns directly to the concerned authorities."
    icon={<AlertTriangle className="h-12 w-12 text-secondary-400 dark:text-secondary-500" />}
  />
);
