const desktopImages: Record<number, string> = {
  1: 'https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Fstep1.svg?alt=media&token=c638b1ed-0e17-4469-9674-d9747389aa64',
  2: 'https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Fstep2.svg?alt=media&token=7e251c6e-0ae0-4af3-8eca-5688611d3b5e',
  3: 'https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Fstep3.svg?alt=media&token=007ee6fe-08d5-4e47-a84d-1ef1f87a08e0',
};

const mobileImage =
  'https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Fmobile.svg?alt=media&token=9a43953f-7aa6-484f-8cce-cb49dbeb7d8c';

const StepImage = ({ step }: { step: number }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--background)] ">
      <img
        src={desktopImages[step]}
        className="hidden md:block w-full h-full object-contain object-center pr-[40px]"
      />

      <img
        src={mobileImage}
        className="block md:hidden w-full h-full object-cover object-center"
        alt="mobile-step"
      />
    </div>
  );
};

export default StepImage;
