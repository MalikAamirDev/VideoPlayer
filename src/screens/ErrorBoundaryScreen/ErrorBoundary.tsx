import React, {ErrorInfo, ReactNode} from 'react';
import {appUtils} from '../../utils';
import {CustomError} from '../../components';

interface Props {
  children: ReactNode;
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  onReset(): void;
}
interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * This component handles whenever the user encounters a JS error in the
 * app. It follows the "error boundary" pattern in React. We're using a
 * class component because according to the documentation, only class
 * components can be error boundaries.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Error-Boundary.md)
 * - [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state = {error: null, errorInfo: null};

  // Reset the error back to null
  resetError = () => {
    this.props.onReset();
    this.setState({error: null, errorInfo: null});
  };

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error is', error);
    this.setState({
      error,
      errorInfo,
    });
    appUtils.crashLogs({filename: 'ErrorBoundary', functionName: 'ErrorBoundary', error});
  }

  // To avoid unnecessary re-renders
  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>): boolean {
    return nextState.error !== nextProps.error;
  }

  render() {
    if (this.state.error) {
      // Error path
      return <CustomError error={this.state.error} resetError={this.resetError} />;
    } else {
      return this.props.children;
    }
  }
}
