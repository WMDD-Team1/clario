interface Props {
  imgURL?: string;
  variant?: 'desktop' | 'mobile';
}

const UserPicture = ({ imgURL, variant = 'desktop' }: Props) => {
  const sizeClasses = variant === 'mobile' 
    ? 'w-[50px] h-[50px]' 
    : 'w-[60px] h-[60px]';

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