
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    'الموقع والتاريخ',
    'نوع السيارة',
    'تفضيلات السائق',
    'البيانات الشخصية'
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs text-center ${
              index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute w-full h-0.5 top-5 left-1/2 transform -translate-y-1/2 ${
                index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} style={{ width: 'calc(100% - 2.5rem)', marginLeft: '1.25rem' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
