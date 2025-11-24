interface Props {
  imgURL?: string;
  variant?: 'desktop' | 'mobile';
  name?: string;
}

const UserPicture = ({ imgURL, variant = 'desktop', name = '' }: Props) => {
  const sizeClasses = variant === 'mobile' ? 'w-[40px] h-[40px]' : 'w-[46px] h-[46px]';

  return (
    <>
      <div
        className={`${sizeClasses} rounded-full bg-amber-100 object-cover transition-all justify-center flex items-center`}
      >
        {name[0]?.toUpperCase()}
      </div>
    </>
  );
};

export default UserPicture;
