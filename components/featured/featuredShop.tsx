/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch, RootStateOrAny } from 'react-redux';
import { GET_SHOPS } from '@/types';
import { baseURL } from '@/config';
const featuredShop = () => {
  const dispatch=useDispatch()
  const[shops,setShops]=useState<any>([])
   const shopsData = useSelector(
     (state: RootStateOrAny) => state.shops.shop
   );
    useEffect(() => {
     dispatch({type:GET_SHOPS})
    }, []);
       useEffect(() => {
        if(shopsData.data){
          setShops(shopsData.data)
        }
       }, [shopsData]);
  return(
  <div className=" bg-white px-12 pb-12">
    <h2 className="mb-5 rounded-md bg-white pl-2 font-bold shadow-sm">
      FEATURED SHOP
    </h2>
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-4 overflow-x-auto scrollbar-hide">
        {shops.map((data:any) => (
          <div key={data.toString()} className="w-52 flex-shrink-0">
            <img
              src={`${baseURL}/${data.logo}`}
              className="h-52 w-full rounded-full object-cover"
            />
            <div className="bg-white">
              <div className="flex flex-col gap-0 p-1 ">
                <h6 className="text-center text-lg font-bold">{data.name}</h6>
                <p className="my-0  text-center text-sm">390 Products</p>
                <button className="  mx-7 rounded-full bg-blue-800 px-1 py-1 text-sm text-white">
                  <p className="">View products</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
        }

export default featuredShop;
