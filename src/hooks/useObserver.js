import { useEffect, useRef, useState } from "react";

export default function UseObserver(){
    const ref = useRef();
const [visible, setVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  if (ref.current) observer.observe(ref.current);

  return () => observer.disconnect();
}, []);

return {ref,visible}
}