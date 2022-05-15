import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    state = {
        errorBoundaryKey: 0
    };

    render() {
        if (this.state.hasError) {
            this.setState(() => ({ hasError: false }));
            return <Redirect to="/error" />
        }
        return this.props.children;
    }
}
