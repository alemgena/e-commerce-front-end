import Head from 'next/head';
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '@/config';
import { FiArrowLeft } from 'react-icons/fi';
import Notification from '@/components/Ui/Notification';
import Notify from '@/components/Ui/Notify';
import ProtectedRoute from '@/components/protected/protected';
const NotificationsPage = () => {
    const { NotifyMessage, notify, setNotify } = Notify();
  const[data,setData]=useState<any>([])
   useEffect(() => {
  const getNotification=async()=>{
    let login_token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${login_token}`,
      },
    };
     try {
       const { data } = await axios.get(
         `${baseURL}api/notifications/userNotification`,
         config
       );
       setData(data.data);
     } catch (error: any) {
       let message: string;
       if (error.response.data.error.message === 'Please authenticate')
         message = 'your sesstion is expired login again';
       else {
         message = error.response.data.error.message;
       }
       NotifyMessage({
         message: message,
         type: 'error',
       });
     }
  }
  getNotification()
  }, []);
  const router = useRouter();
  return (
    <ProtectedRoute>
      <Head>
        <title>Notification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification notify={notify} setNotify={setNotify} />
      <div className=" bg-gray-50 px-12 pb-32">
        <div
          onClick={() => router.push('/')}
          className="mb-4 flex items-center gap-2 py-4 text-xl  hover:cursor-pointer"
        >
          <FiArrowLeft />
          <h2 className="font-roboto-medium ">Notification</h2>
        </div>
        <div className="mt-4 flex flex-col gap-8">
          {data.map((item: any, idx: any) => (
            <div
              key={idx.toString()}
              className=" flex items-center justify-between gap-12 bg-white px-6 py-8"
            >
              <div className="overflow-hidden rounded-full">
                <img
                  src="/images/product/product.png"
                  className="h-16 w-16 "
                  alt="product image"
                />
              </div>
              <div className="flex w-2/3 flex-grow flex-col gap-2">
                <h6 className=" font-roboto-medium text-lg text-gray-600">
                  {item.title}
                </h6>
                <h3 className="font-roboto-light text-sm text-gray-500">
                  {item.description}
                </h3>
              </div>
              <div className="font-roboto-regular self-end whitespace-nowrap text-sm text-gray-600">
                <p>{new Date(item.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NotificationsPage;
