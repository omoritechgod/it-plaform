import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { ROUTES } from "../config/constants";
import { Link } from "react-router-dom";

interface ErrorProps {
  error: string;
  refetch: () => void;
}

const ErrorComponent = ({ error, refetch }: ErrorProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="h-2 bg-red-500 w-full" />

        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative bg-red-50 p-5 rounded-full border border-red-100">
              <AlertCircle size={44} className="text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            System Error
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {error && "Connection failed"}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => refetch()}
              className="w-full flex items-center justify-center gap-2 bg-blue/60 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
            >
              <RefreshCcw size={20} /> Try Reconnecting
            </button>
          </div>
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="mt-6 flex items-center justify-center gap-1 mx-auto text-sm font-medium text-gray-400 hover:text-gray-600"
          >
            <Home size={14} /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
