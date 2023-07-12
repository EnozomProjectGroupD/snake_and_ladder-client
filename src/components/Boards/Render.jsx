import React from 'react'

export default function Render(buffer) {

const canvas = document.createElement("canvas");
canvas.width = buffer.width || null;
canvas.height = buffer.height || null;
const imageData = new ImageData(buffer.width, buffer.height);
imageData.data = buffer;
canvas.data = imageData;
const imageDataUrl = canvas.toDataURL()
const renderd = ( <div><img src={imageDataUrl} alt='test' /></div>
)

   
  return (
    <>
   {renderd}
    </>)
}
