import { lazy, Suspense, useEffect, useState } from 'react';

export default function LoadBigData(){

    const [images,setImages] = useState([])

    useEffect(()=>{
        async function fetchData(){
        try{
          const response = await fetch('https://picsum.photos/v2/list')
          const data = await response.json();
          setImages(data)
        } catch (error) {
            console.error('Failed to fetch images:', error);
          }
        }
        
        fetchData()
      },[])

    const renderedImages = images.map(image=>{
        
        return(
            <img key={image.id} src={image.download_url} width='200px' height='auto'/>
        )
    })
    return(
        <>{renderedImages}</>
    )
}