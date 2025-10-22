interface Props {
    imgURL?: string;
}

const UserPicture = ({ imgURL }: Props) => {
    return (
        <>
            {imgURL && (<div>
                <img src={imgURL} alt="Profile Picture" className='w-[60px] h-[60px] rounded-full bg-amber-100 object-cover' />
            </div>)}
        </>
    )
}

export default UserPicture