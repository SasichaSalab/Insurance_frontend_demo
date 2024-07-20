import React from 'react';

const InsuranceCard = ({ name, minAge, maxAge, coverageYears }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white w-full flex flex-col items-start p-4">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <div className="mb-2">Age Range: {minAge} - {maxAge} years</div>
      <div>Coverage: {coverageYears} years</div>
    </div>
  );
};

export default InsuranceCard;
