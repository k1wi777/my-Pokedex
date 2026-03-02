'use client'
import useObserver from '@/hooks/useObserver'

export default function ObserverCart({children}){
    const {ref,visible}= useObserver()
    return (<aside ref={ref} className={` ${visible 
      ? "opacity-100 translate-y-0 animate-[fadeUp_0.8s_ease-out_forwards]" 
      : "opacity-0 translate-y-6"} `}>
        {children}
    </aside>)
}