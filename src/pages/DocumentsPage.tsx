import React from 'react';
import { FileCheck } from 'lucide-react';
import { ComingSoonPage } from './ComingSoonPage';

export const DocumentsPage: React.FC = () => (
  <ComingSoonPage
    title="Document Checker"
    description="Verify if your documents are complete and valid for various government applications and services."
    icon={<FileCheck className="h-12 w-12 text-secondary-400 dark:text-secondary-500" />}
  />
);
