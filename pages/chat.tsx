/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import ProtectedRoute from '@/components/protected/protected';
import axios from 'axios';
import { baseURL } from '@/config';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import io from 'socket.io-client';
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import { useRouter } from 'next/router';
import { Avatar } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import Norecords from '@/components/Ui/Norecords';
import PageSpinner from '@/components/Ui/PageSpinner';
import Head from 'next/head';
let productDetail: any;
const Chat = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [messages, setMessages] = useState<any>([]);
  const [privateSms, setPrivateSms] = useState<any>([]);
  const[userInfo,setUserInfo]=useState<any>()
  const { user} = useAppSelector(selectCurrentUser);
  const socket = io(baseURL);
  const[loading,setLoading]=useState<boolean>(false)
  const [inputMessage, setInputMessage] = useState('');
  const [reciver, setReciver] = useState<string>('');
  const[reciverData,setReciverData]=useState<any>()
const router=useRouter();
  useEffect(() => {
    if(!!user){
      setUserInfo(user.user ? user.user : user)
    }
    const getChatMessages = async () => {
      setLoading(true)
      try {
        let login_token = localStorage.getItem('token');
        let config = {
          headers: {
            Authorization: `Bearer ${login_token}`,
          },
        };
        const { data } = await axios.get(
          `${baseURL}api/chat/listAll`,
          config
        );
        let uniqueArray = data.data.filter(
          (obj: { to: any }, index: any, arr: any[]) => {
            return (
              index ===
              arr.findIndex((o) => {
                return JSON.stringify(o.to) === JSON.stringify(obj.to);
              })
            );
          }
        );
        setMessages(uniqueArray);
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        NotifyMessage({
          message: error.response?.data.error.message,
          type: 'error',
        });
      }
    };
    productDetail = JSON.parse(localStorage.getItem('productDetail')!);
    socket.on('connection', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.on('receive_message', async (message) => {
      getChatMessages();
    });
    getChatMessages();
  }, []);
  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('send_message', 'newMessage');
    try {
      let login_token = localStorage.getItem('token');
      let config = {
        headers: {
          Authorization: `Bearer ${login_token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}api/chat`,
        {
          message_data: inputMessage,
          // to: productDetail.seller._id,
          to: reciver,
          product: '63da74d8ef4c5a0c5f0d70fd',
        },
        config
      );
      getPrivateMessage(reciver);
    } catch (error: any) {
      NotifyMessage({
        message: error.response?.data.error.message,
        type: 'error',
      });
    }
    setInputMessage('');
  };
  const getPrivateMessage = async (to: string) => {
    setReciver(to);
    try {
      let login_token = localStorage.getItem('token');
      let config = {
        headers: {
          Authorization: `Bearer ${login_token}`,
        },
      };
      const { data } = await axios.get(
        `${baseURL}api/chat/list/${to}`,
        config
      );
      setPrivateSms(data.data);
    } catch (error: any) {
      NotifyMessage({
        message: error.response.data.error.message,
        type: 'error',
      });
    }
  };
const handleReciverData=(data:any)=>{
setReciverData(data)
}

  return (
    <ProtectedRoute>
      <Head>
        <title>Chats</title>
      </Head>
      {loading ? (
        <PageSpinner />
      ) : (
        <div className=" mx-11 mb-32 bg-white">
          <div
            onClick={() => router.push('/')}
            className="my-4 flex items-center gap-2 bg-gray-50 py-4 text-xl hover:cursor-pointer"
          >
            <FiArrowLeft />
            <h2>Chat</h2>
          </div>
          <Notification notify={notify} setNotify={setNotify} />
          {messages.length ? (
            <div className="grid  min-w-full  rounded bg-white sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
              <div className="border-r border-gray-100 bg-gray-100 lg:col-span-1">
                <ul className="h-64 overflow-auto sm:h-96">
                  <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">
                    Chats
                  </h2>
                  <li>
                    {messages.map((item: any, idx: any) => (
                      <>
                        {item.to._id !== userInfo?._id && (
                          <div
                            onClick={() => {
                              getPrivateMessage(item.to?._id);
                              handleReciverData(item.to);
                            }}
                            className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                          >
                            {item.to.imageURL ? (
                              <div>
                                <Avatar
                                  src={`${baseURL}${item.to.imageURL}`}
                                  alt="User profile image"
                                />
                              </div>
                            ) : (
                              <div>
                                <Avatar className="cursor-pointer">
                                  <FaUserCircle size={30} />
                                </Avatar>
                              </div>
                            )}
                            <div className="w-full pb-2">
                              <div className="flex justify-between">
                                <span className="ml-2 block font-semibold text-gray-600">
                                  {item.to?.first_name}
                                </span>
                                <span className="ml-2 block text-sm text-gray-600">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleTimeString()}
                                </span>
                              </div>
                              <span className="ml-2 block text-sm text-gray-600"></span>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </li>
                </ul>
              </div>

              <div className="ml-4 border-red-800 bg-gray-200 lg:col-span-2 lg:ml-2 lg:block">
                <div className="w-full">
                  <div className="relative flex items-center border-b border-gray-300 p-3">
                    {reciverData?.imageURL ? (
                      <div>
                        <Avatar
                          src={`${baseURL}${reciverData.imageURL}`}
                          alt="User profile image"
                        />
                      </div>
                    ) : (
                      <div>
                        <Avatar className="cursor-pointer">
                          <FaUserCircle size={30} />
                        </Avatar>
                      </div>
                    )}
                    <div className="ml-2 flex flex-col justify-center">
                      <span className="block font-bold text-gray-600">
                        {reciverData
                          ? reciverData.first_name
                          : messages[0]?.to.first_name}
                      </span>
                      <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-green-600" />
                    </div>
                  </div>
                  <div className="relative h-screen w-full overflow-y-auto p-6 sm:h-[40rem]">
                    <ul className="space-y-2">
                      {privateSms.length ? (
                        <>
                          {' '}
                          {privateSms.map((item: any, idx: any) => (
                            <li
                              className={
                                item.to._id === userInfo?._id
                                  ? 'flex justify-start'
                                  : 'flex justify-end'
                              }
                            >
                              <div className="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                                <span className="block">
                                  {item.message_data}
                                </span>
                              </div>
                            </li>
                          ))}
                        </>
                      ) : (
                        <li className="flex justify-start">
                          <div className="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                            <span className="block">
                              {messages[0]?.message_data}
                            </span>
                          </div>
                        </li>
                      )}{' '}
                    </ul>
                  </div>
                  <div className="flex w-full flex-col items-center justify-between border-t border-gray-300 p-3 sm:flex-row">
                    <form onSubmit={(e) => handleSendMessage(e)}>
                      <div className="flex items-center border-t border-gray-300 p-3">
                        <input
                          type="text"
                          placeholder="Say Somethings"
                          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-2 outline-none focus:text-gray-700"
                          name="message"
                          value={inputMessage}
                          onChange={(e) => {
                            setInputMessage(e.target.value);
                          }}
                          required
                        />
                        <button
                          type="submit"
                          className="h-10 w-10 items-center rounded-full bg-blue-800 p-3"
                        >
                          <BiSend
                            size={25}
                            color="white"
                            className="mb-2 items-center"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Norecords />
          )}
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Chat;
