import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UnderDevelopment = () => {
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col space-y-4 justify-center items-center">
      <div className="font-semibold font-montserrat text-2xl">
        Page Under Development
      </div>
      <Link to="/" className="text-primary hover:underline bg-none">
        Go Back
      </Link>
      <div>Auto Redirecting in {timer}...</div>
    </div>
  );
};

export default UnderDevelopment;
