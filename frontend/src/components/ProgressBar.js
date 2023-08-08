import React from "react";

const ProgressBar = ({ progressValue }) => {
  const progressBarWidth = {
    width: `${progressValue}%`,
  };

  return (
    <div className="progressBar">
      <div className="progressBar-value" style={progressBarWidth}>
        <p>Création du site en cour...</p>
      </div>
    </div>
  );
};

export default ProgressBar;
