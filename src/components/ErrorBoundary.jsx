import { Component } from 'react';

// Keeps a canvas/asset failure from blanking the whole page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Portfolio error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '48px', color: '#ededed', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong.</h2>
          <p>The portfolio failed to load. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
