import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from "./ErrorBoundary";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider >        
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
