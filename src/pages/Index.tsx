import { useEffect } from "react";


const Index = () => {
  // Redirect to docs home after a short delay to show the landing
  useEffect(() => {
    window.location.href = "/docs"
  }, []);
};

export default Index;
