import React, { useState, useEffect } from 'react';
const ServiceWorkerComponent=()=>{
    const [available, setAvailable]=useState(false)
   useEffect(() => {
   if (typeof window !== 'undefined' && 'serviceWorker' in navigator && typeof navigator.serviceWorker !== 'undefined' ) {
     window.addEventListener('load', () => {
       navigator.serviceWorker
         .register('/firebase-messaging-sw.js')
         .then((registration) => {
           console.log('Service Worker registered:', registration);
         })
         .catch((error) => {
           console.error('Service Worker registration failed:', error);
         });
     });
   }
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      // Render fallback UI or display a message for unsupported browsers
      setAvailable(true)
    } 
   },[])
return(
    <>
    {available&&
    <div>Service Workers are not supported in this browser.</div>
    }
    </>
)
}
export default ServiceWorkerComponent;