import React from 'react';

interface CardProps {
  imgURL?: string;
  cardTitle?: string;
  cardDescription?: string;
  buttonName?: string;
  buttonLink?: string;
}

const Card: React.FC<CardProps> = ({
  imgURL,
  cardTitle,
  cardDescription,
  buttonName,
  buttonLink,
}) => {
  return (
    <div className='bg-amber-200 rounded-[20px] overflow-hidden'>
      {imgURL && <img src={imgURL} alt={cardTitle || "Card image"} className='w-full h-auto'/>}
      <div className='p-[1rem]'>
        {cardTitle && <h2 className='text-[2.4rem]'>{cardTitle}</h2>}
        {cardDescription && <p>{cardDescription}</p>}
        {buttonLink && buttonName && <a href={buttonLink}>{buttonName}</a>}
      </div>
    </div>
  );
};

export default Card;
