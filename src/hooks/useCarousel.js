import { useState } from "react";
import { useEffect } from "react";

export default function useCarousel(total =0,time){
    const [index, setIndex] = useState(0);
      const [isPaused, setPaused]= useState(false)
    
      //efecto para el autoplay
      useEffect(() => {
        if(isPaused) return
    
        const interval = setInterval(() => {
           setIndex((prev) => (prev + 1) % total);
        }, time);
        return () => {
          clearInterval(interval);
        };
      }, [index,isPaused]);
    
      const next = () => {
        setIndex((prev) => (prev + 1) % total);
      };
    
      const prev = () => {
        setIndex((prev) => (prev - 1 + total) % total);
      };
    
      // función para obtener índice circular
      const getItem = (offset) => {
        return [(index + offset + total) % total];
      };

      return {prev,next,getItem,isPaused,setPaused}
}

