import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

let hasShownToast = false;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    if (!hasShownToast) {
      hasShownToast = true;
      toast.error("Please login to continue");

      setTimeout(() => {
        hasShownToast = false;
      }, 1000);
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;