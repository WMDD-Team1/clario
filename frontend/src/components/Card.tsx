import React from 'react';
import { colorOptions } from './style/color';
import Button from './Button';

interface CardProps {
  imgURL?: string;
  cardTitle?: string;
  cardDescription?: string;
  buttonLink?: string;
  style: "card1" | "card2" | "card3";
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  imgURL,
  cardTitle,
  cardDescription,
  buttonLink,
  style = 'card1',
  children
}) => {
  return (
    <div className={`${colorOptions[style]} rounded-[20px] overflow-hidden p-[1rem]`}>
      {imgURL && <img src={imgURL} alt={cardTitle || "Card image"} className='w-full h-auto'/>}
      {children}
      <div>
        {cardTitle && <h2 className='text-[2.4rem]'>{cardTitle}</h2>}
        {cardDescription && <p>{cardDescription}</p>}
        {buttonLink && <Button onClick={()=>{
          window.location.href = buttonLink;
        }} buttonColor='lightButton' width='100%'>View Client</Button>}
      </div>
    </div>
  );
};

export default Card;
