import Head from 'next/head';
import { AiOutlinePicture } from 'react-icons/ai';
import { SelectInput } from '@/components/select-input';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';

const EditProductPage = () => {
  const router=useRouter()
  return (
    <>
      <Head>
        <title>Edit Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div onClick={()=>router.push("/")} className="flex items-center gap-2 py-4 text-xl  hover:cursor-pointer">
          <IoIosArrowBack />
          <h2>Edit Product</h2>
        </div>
        <div className="mt-4 flex">
          <div className="w-1/3 px-16">
            <div className="flex flex-col items-center justify-center gap-4 rounded-sm bg-white py-28 shadow-sm">
              <div className="flex items-center justify-center rounded-full bg-blue-800 p-6">
                <AiOutlinePicture className="text-white" size={30} />
              </div>
              <p className="font-roboto-light text-sm ">
                Browse or drop picture here
              </p>
            </div>
          </div>
          <div className="w-2/3 rounded-sm bg-white px-10 py-8 shadow-sm">
            <form
              onScroll={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={""}
                  className="font-roboto-regular placeholder:font-roboto-regular w-1/2 rounded-md bg-gray-100 p-3 text-gray-700 placeholder:text-gray-700"
                />
                <div className="w-1/2">
                  <SelectInput
                    options={[
                      {
                        label: 'Clothing',
                        value: '1',
                      },
                      {
                        label: 'Electronics',
                        value: '2',
                      },
                    ]}
                    placeholder="Category"
                  />
                </div>
              </div>
              <textarea
                rows={4}
                placeholder="Description"
                className="font-roboto-regular placeholder:font-roboto-regular w-full resize-none rounded-md bg-gray-100 p-3 text-gray-700 placeholder:text-gray-700"
              ></textarea>
              <div className="w-1/2">
                <SelectInput
                  options={[
                    {
                      label: 'Addis Ababa',
                      value: '11',
                    },
                    {
                      label: 'Hawassa',
                      value: '12',
                    },
                  ]}
                  placeholder="Location"
                />
              </div>
              <input
                type="text"
                placeholder="Price"
                className="font-roboto-regular placeholder:font-roboto-regular w-1/2 rounded-md bg-gray-100 p-3 text-gray-700 placeholder:text-gray-700"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="negotiable"
                  id="negotiable"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="negotiable"
                  className="font-roboto-regular text-sm text-gray-700"
                >
                  Negotiable
                </label>
              </div>
              <div className="w-1/2">
                <button className="font-roboto-regular w-full rounded-md bg-blue-800 py-3 text-sm text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
