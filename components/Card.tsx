import React from 'react';

interface CardProps {
  id: string;
  todo: string;
}

const Card: React.FC<CardProps> = ({ id, todo }) => {
  return (
    <div
      draggable
      className="card"
      id={id}
    >
      {todo}
    </div>
  );
};

export default Card;
