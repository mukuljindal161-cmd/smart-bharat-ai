import React from 'react';
import { FileText } from 'lucide-react';
import { ComingSoonPage } from './ComingSoonPage';

export const ComplaintsPage: React.FC = () => (
  <ComingSoonPage
    title="Complaint Tracker"
    description="Track the status of your complaints, applications, and grievances in real-time with detailed updates."
    icon={<FileText className="h-12 w-12 text-secondary-400 dark:text-secondary-500" />}
  />
);
