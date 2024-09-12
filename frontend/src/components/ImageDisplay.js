import React from 'react';

// Replace with your Firebase Storage image URL
const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/trimtime-fad68.appspot.com/o/salon_images%2Fc2c6505f-7d8f-4905-8b63-9fea7b302604_1.jpeg?alt=media&token=5d8b8789-5d44-4b24-9914-9da94f3bf702';

const ImageDisplay = () => {
  return (
    <div>
      <h2>Salon Image</h2>
      <img 
        src={imageUrl} 
        alt="Salon" 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
};

export default ImageDisplay;
