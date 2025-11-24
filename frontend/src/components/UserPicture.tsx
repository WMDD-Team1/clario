interface Props {
  imgURL?: string;
  variant?: 'desktop' | 'mobile';
}

const UserPicture = ({ imgURL, variant = 'desktop' }: Props) => {
  const sizeClasses = variant === 'mobile' 
    ? 'w-[40px] h-[40px]' 
    : 'w-[46px] h-[46px]';

  return (
    <>
      {imgURL && (
        <div>
          <img
            src={imgURL}
            alt="Profile Picture"
            className={`${sizeClasses} rounded-full bg-amber-100 object-cover transition-all`}
          />
        </div>
      )}
    </>
  );
};

export default UserPicture;