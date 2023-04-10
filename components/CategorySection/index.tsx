/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { baseURL } from '@/config';
import { RootStateOrAny, useSelector } from 'react-redux';
import { DialogMenu } from './menu';
import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
 type CategoryProps = {
   id: string;
   parent_id: number | null;
   slug: string;
   name: string;
   image: string | null;
   image_v2: string | null;
   position: number;
   imageURL: any;
   subcategory: CategoryProps[] | [];
 };

const index = () => {
  const router=useRouter()
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const [subcategory, setSubCategory] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = (name: string) => {
    if (categories.data && name) {
      const hoveredCategoryIn = categories.data.find(
        (category: CategoryProps) => category.name === name
      );
      if (hoveredCategoryIn) {
        setSubCategory(hoveredCategoryIn?.subcategory);
      }
    }
    setIsOpen(!isOpen);
  };
  const modalRef =React.useRef<any>(null);
  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleModal('');
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div className="mt-2 grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5 lg:hidden">
        <div
          onClick={() => router.push('/notification')}
          className="ml-6 mt-6 flex h-full flex-col"
        >
          <FaCartPlus size={48} />
          <div className=" mt-7 font-bold text-gray-700">Post Product</div>
        </div>
        {categories.data && (
          <>
            {categories.data.map((data: any) => (
              <>
                {data.subcategory.length ? (
                  <div
                    onClick={() => toggleModal(data.name)}
                    className="flex w-full cursor-pointer flex-col items-center  justify-center gap-4 rounded bg-white text-gray-700"
                  >
                    <img
                      alt="name"
                      src={`${baseURL}/${data.imageURL}`}
                      // className="rounded-full object-none object-[59%_-4px] py-5"
                    />
                    <h1 className="font-bold">{data.name}</h1>
                  </div>
                ) : null}
              </>
            ))}
          </>
        )}
      </div>
      <div className="w-full">
        <DialogMenu
          modalRef={modalRef}
          subcategory={subcategory}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};

export default index;
