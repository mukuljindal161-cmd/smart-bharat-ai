import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-error-100 dark:bg-error-900/50 mb-6">
              <AlertTriangle className="h-8 w-8 text-error-600 dark:text-error-400" />
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              Something went wrong
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            <Button onClick={this.handleRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
