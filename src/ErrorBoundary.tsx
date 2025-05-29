import React from "react";

type Props = {
    fallbackView: React.ReactNode;
    fallbackAction?: () => void;
    children: React.ReactNode;
};
type State = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.warn('ErrorBoundary caught an error', error, info);
        if (this.props.fallbackAction) {
            this.props.fallbackAction();
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackView;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
