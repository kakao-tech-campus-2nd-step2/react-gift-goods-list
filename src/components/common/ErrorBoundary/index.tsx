import type { ReactNode } from 'react';
import React from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state to track error occurrence
    this.state = { hasError: false };
  }

  // This lifecycle method is invoked after an error has been thrown by a descendant component.
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // This lifecycle method is called after an error is thrown in a descendant component.
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Example function to log error details, replace with your own implementation.
    logErrorToMyService(error, errorInfo);
  }

  // Render method to display UI.
  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs.
      return this.props.fallback;
    }

    // Render children components normally when no error.
    return this.props.children;
  }
}

// Example function to log error details. Replace this with your actual logging implementation.
function logErrorToMyService(error: Error, errorInfo: React.ErrorInfo): void {
  console.error('Logged error:', error, errorInfo);
}

export default ErrorBoundary;
