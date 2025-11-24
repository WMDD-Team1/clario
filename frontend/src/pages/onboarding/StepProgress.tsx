const StepProgress = ({ step }: { step: number }) => {
  const steps = [1, 2, 3];

  return (
    <div className="flex gap-4 items-center justify-center">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`h-4 rounded-full transition-all ${
            num === step ? 'bg-[#2F80ED] w-16' : 'bg-[#DDE6F5] w-10'
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgress;
