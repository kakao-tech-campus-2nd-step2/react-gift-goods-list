import type { ReactElement } from 'react';
import { Component } from 'react';

type ErrorBoundaryProps = {
  fallback: ReactElement;
  onReset: () => void;
  resetKey: unknown;
  children: ReactElement;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const initState = { hasError: false };

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initState;
  }

  resetBoundary = () => {
    this.props.onReset();
    this.setState(initState);
  };

  componentDidUpdate = (prevProps: ErrorBoundaryProps) => {
    if (JSON.stringify(prevProps.resetKey) !== JSON.stringify(this.props.resetKey))
      this.resetBoundary();
  };

  static getDerivedStateFromError = (error: Error) => {
    return { hasError: error !== null, error };
  };

  render = () => {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  };
}
