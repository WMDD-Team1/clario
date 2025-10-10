import React from 'react';
import { colorOptions } from './style/color';

interface CardProps {
  imgURL?: string;
  cardTitle?: string;
  cardDescription?: string;
  buttonName?: string;
  buttonLink?: string;
  style: "card1" | "card2" | "card3"
}

const Card: React.FC<CardProps> = ({
  imgURL,
  cardTitle,
  cardDescription,
  buttonName,
  buttonLink,
  style = 'card1'
}) => {
  return (
    <div className={`${colorOptions[style]} rounded-[20px] overflow-hidden`}>
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
