import React, { useState, useEffect } from "react";

const ProgressBar = ({ progressValue }) => {
  const [isToLong, setIsToLong] = useState(false);

  const style = {
    width: `${progressValue}%`,
  };

  useEffect(() => {
    setTimeout(() => {
      setIsToLong(true);
    }, 10000);
  }, []);

  return (
    <div className="progressBar">
      <p>Création du site en cour... {progressValue.toFixed(1)}%</p>
      <div className="progressBar-value" style={style}>
        .
      </div>
      {isToLong && (
        <div className="progressBar-timeAdvertiser">
          <p>le réseau semble anormalement lent... </p>
          <p>Veuillez patienter</p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
