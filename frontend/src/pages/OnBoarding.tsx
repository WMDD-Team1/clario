import React, { useState } from 'react';
import StepImage from './onboarding/StepImage';
import Step1 from './onboarding/Step1';
import Step2 from './onboarding/Step2';
import Step3 from './onboarding/Step3';
import { OnboardingForm } from '@api/index';
import StepProgress from './onboarding/StepProgress';

const OnBoarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingForm>({});

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      <div className="h-1/2 md:h-full w-full md:w-1/2">
        <StepImage step={step} />
      </div>

      <div className="h-1/2 md:h-full w-full md:w-1/2 flex flex-col items-center justify-start md:justify-center py-10 md:py-0">
        <div className="w-full max-w-[500px] flex flex-col gap-[40px] px-6 md:px-0">
          <div className="flex items-center justify-between">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Flogo.svg?alt=media&token=233ce12a-9ead-4ee3-b0bb-1f54877e80e0"
              alt="logo"
              className="h-[32px]"
            />
            <StepProgress step={step} />
          </div>

          {step === 1 && <Step1 next={next} formData={formData} setFormData={setFormData} />}
          {step === 2 && (
            <Step2 next={next} prev={prev} formData={formData} setFormData={setFormData} />
          )}
          {step === 3 && <Step3 prev={prev} formData={formData} setFormData={setFormData} />}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
