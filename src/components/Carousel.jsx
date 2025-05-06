import React from 'react';
import '../styles/Carousel.css';

export default function Carousel({items, renderItem }) {
  return (
    <div className="carousel">
      <div className="carousel__track">
        {items.map(item => (
          <div className="carousel__item" key={item.id}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
