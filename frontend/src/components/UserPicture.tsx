interface Props {
    imgURL?: string;
}

const UserPicture = ({ imgURL }: Props) => {
    return (
        <>
            {imgURL && (<div>
                <img src={imgURL} alt="Profile Picture" className='w-[50px] h-[50px] rounded-full bg-amber-100 object-cover' />
            </div>)}
        </>
    )
}

export default UserPicture