import { useState } from 'react';
import Link from 'next/link';
import { baseURL } from '@/config';
type CategoryProps = {
  id: string;
  parent_id: number | null;
  slug: string;
  name: string;
  image: string | null;
  image_v2: string | null;
  position: number;
  imageURL: any;
};
interface MenuProps {
  isOpen: boolean;
  modalRef: any;
  setIsOpen: any;
  subcategory: CategoryProps[] | [];
}
export const DialogMenu: React.FC<MenuProps> = (props) => {
  const { isOpen, modalRef, subcategory } = props;

  return (
    <div>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div ref={modalRef} className="modal-container mb-20 w-full ">
          <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
            <div
              className="bg-white px-4 py-5 "
              style={{
                maxHeight: '100vh',
                minHeight: '60vh',
                overflowY: 'auto',
              }}
            >
              {subcategory.map((item) => (
                <Link
                  href={{
                    pathname: '/category',
                    query: { name: item.name },
                  }}
                >
                  <div
                    key={item.id}
                    className="mb-4  mt-10 flex w-full items-center"
                  >
                    <img
                      src={`${baseURL}/${item.imageURL[0]}`}
                      alt={item.name}
                      className="mr-4 ml-4 h-16 w-16"
                    />
                    <div className="text-lg font-bold">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
