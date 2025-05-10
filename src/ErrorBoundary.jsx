import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar una UI alternativa
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes loguearlo a un servicio externo si deseas
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="p-8 max-w-2xl text-red-600 text-center text-xl bg-red-50 rounded-lg shadow-md">
                <h1 className="mb-4 font-bold text-2xl">
                Algo salió mal, toma una captura y mándala con tus datos 😁.
                </h1>
                <pre className="bg-red-100 p-4 rounded text-left text-sm overflow-auto">
                {this.state.error?.message}
                </pre>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}
