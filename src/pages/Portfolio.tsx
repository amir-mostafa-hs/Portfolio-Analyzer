import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const { isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  if (!isConnected) return null;
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Dashboard />
    </div>
  );
};

export default Portfolio;
