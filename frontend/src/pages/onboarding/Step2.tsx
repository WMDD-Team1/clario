import Select from '@components/Select';
import Button from '@components/Button';
import { feeOptions, StepProps } from '@api/types/userApi';

export default function Step2({ next, prev, formData, setFormData }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[18px] text-center">What’s your typical project payment type?</h3>

      <Select
        label="Payment Type"
        options={feeOptions}
        value={formData.defaultFeeType ?? ''}
        onChange={(val) => setFormData({ ...formData, defaultFeeType: val })}
        color="text-gray-500"
        placeHolder="Select an Option"
        width="100%"
      />

      <div className="flex flex-col gap-[40px]">
        <Button buttonColor="regularButton" textColor="#fff" onClick={prev} width="100%">
          Back
        </Button>

        <Button
          buttonColor="regularButton"
          onClick={next}
          textColor="#fff"
          disabled={!formData.defaultFeeType}
          width="100%"
        >
          Next step
        </Button>
      </div>
    </div>
  );
}
