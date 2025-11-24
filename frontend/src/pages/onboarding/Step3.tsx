import Select from '@components/Select';
import Button from '@components/Button';
import { goalOptions, StepProps } from '@api/types/userApi';
import { completeOnBoarding } from '@api/services/authService';
import { useNavigate } from 'react-router-dom';

export default function Step3({ prev, formData, setFormData }: StepProps) {
  const navigate = useNavigate();
  const handleFinish = async () => {
    try {
      await completeOnBoarding(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <h3 className="text-[18px] text-center">What’s your main goal right now?</h3>

      <Select
        label="Your Goal"
        options={goalOptions}
        value={formData.goal ?? ''}
        onChange={(val) => setFormData({ ...formData, goal: val })}
        color="text-gray-500"
        placeHolder="Select an Option"
        width="100%"
      />

      <Button
        buttonColor="regularButton"
        textColor="#fff"
        onClick={prev}
        disabled={!formData.userType}
        width="100%"
      >
        Back
      </Button>
      <Button
        buttonColor="regularButton"
        textColor="#fff"
        onClick={handleFinish}
        disabled={!formData.goal}
        width="100%"
      >
        Go To Dashboard
      </Button>
    </div>
  );
}
