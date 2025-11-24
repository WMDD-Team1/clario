import { roleOptions, StepProps } from '@api/types/userApi';
import Button from '@components/Button';
import Select from '@components/Select';

export default function Step1({ next, formData, setFormData }: StepProps) {
  return (
    <div className="flex flex-col gap-[30px]">
      <h3 className="text-[18px] text-center">What best describes your role?</h3>

      <Select
        label="Your Role"
        options={roleOptions}
        value={formData.userType ?? ''}
        onChange={(role) => setFormData({ ...formData, userType: role })}
        color="text-gray-500"
        placeHolder="Select your role"
        width="100%"
      />

      <Button
        buttonColor="regularButton"
        textColor="#fff"
        onClick={next}
        disabled={!formData.userType}
        width="100%"
      >
        Next Step
      </Button>
    </div>
  );
}
