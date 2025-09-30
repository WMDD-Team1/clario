import React from 'react';

interface CardProps {
  imgURL: string;
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
    <div>
      <img src={imgURL} alt={cardTitle || "Card image"} />
      <div>
        {cardTitle && <h2>{cardTitle}</h2>}
        {cardDescription && <p>{cardDescription}</p>}
        {buttonLink && buttonName && <a href={buttonLink}>{buttonName}</a>}
      </div>
    </div>
  );
};

export default Card;
