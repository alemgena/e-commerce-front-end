import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { SelectInput } from '@/components/select-input';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { productAction } from '@/store/products-slice';
import Button from '@mui/material/Button';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import axios from 'axios';
import { baseURL } from '@/config';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useRouter } from 'next/router';
import Protected from '@/components/protected/protected';
import { useAppDispatch } from '@/store';
const regions = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  '	Harari',
  'Harari',
  '	Somali',
  'Oromia',
  'Tigray',
  'SNNPR',
  'Sidama',
  'SWEPR',
];
const CreateProductPage = () => {
  const router = useRouter();
  const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<any>();
  const [optionValues, setOptionsValues] = useState();
  const [valuesData, setValuesData] = useState<any>([]);
  const [productOption, setProductOption] = useState<any>([]);
  const [productOptions, setProductOptions] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState<any>([]);
  const [subCategory, setSubCategory] = useState();
  const [image, setImage] = useState<any>([]);
  const [imageError, setImageError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const { name, description, price, region, latitude, longitude } = useSelector(
    (state: RootStateOrAny) => state.products.inputValues
  );
  const {
    nameErr,
    descriptionErr,
    priceErr,
    latitudeErr,
    longitudeErr,
    subcategoryErr,
    regionErr,
    optionsErr,
  } = useSelector((state: RootStateOrAny) => state.products.inputErrors);
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(productAction.setNameErr(''));
    dispatch(productAction.setPriceErr(''));
    dispatch(productAction.setDescriptionErr(''));
    dispatch(productAction.setSubcategoryErr(''));
    dispatch(productAction.setOptionErr(''));
    dispatch(productAction.setRegionErr(''));
    dispatch(productAction.setLatitudeErr(''));
    dispatch(productAction.setLongitudeErr(''));
    let isValid = true;

    if (name.length < 4) {
      dispatch(
        productAction.setNameErr('Product name must be atleast 4 characters!')
      );
      isValid = false;
    }
    if (description.length < 4) {
      dispatch(
        productAction.setDescriptionErr(
          'description must be longer than 4 characters!'
        )
      );
      isValid = false;
    }
    if (!subCategory) {
      dispatch(
        productAction.setSubcategoryErr('Select category and subcategory!')
      );
      isValid = false;
    }
    if (!category) {
      dispatch(
        productAction.setSubcategoryErr('Select category and subcategory!')
      );
      isValid = false;
    }
    if (!price) {
      dispatch(productAction.setPriceErr('Price Is required!'));
      isValid = false;
    }
    if (!longitude) {
      dispatch(productAction.setLongitudeErr('Logitude Is required!'));
      isValid = false;
    }
    if (!latitude) {
      dispatch(productAction.setLatitudeErr('Latitude Is required!'));
      isValid = false;
    }
    if (!region) {
      dispatch(productAction.setRegionErr('Region Is required!'));
      isValid = false;
    }
    if (!image.length) {
      setImageError('Pleas Select at leas one image');
      isValid = false;
    }
    if (!productOption.length || !valuesData) {
      dispatch(
        productAction.setOptionErr('Pleas Select at one option and values')
      );
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    const uniqueOptionData = productOption.filter(
      (value: { id: any }, index: any, self: any[]) =>
        index === self.findIndex((t) => t.id === value.id)
    );
    let uniqueOption = uniqueOptionData.map((item: any) => item);
    uniqueOption.forEach((e: any) => {
      let values: any[] = [];
      valuesData.forEach((f: any) => {
        if (f.option == e.id) {
          values.push(f._id);
        }
      });
      e.values = values;
    });
    let token = localStorage.getItem('token');
    setLoading(true);
    const productData = {
      name: name,
      description: description,
      price: price,
      subcategory: subCategory.id,
      options: uniqueOption,
      region: region,
      latitude: latitude,
      longitude: longitude,
    };
    let formData = new FormData();
    Array.from(image).forEach((item: any) => {
      formData.append('images', item);
    });
    try {
      const { data } = await axios.post(
        `${baseURL}api/products/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.data) {
        await axios
          .post(`${baseURL}api/products/uploadImages/${data.data.id}`, formData)
          .then((response) => {
            if (response.data) {
              setLoading(false);
              NotifyMessage({
                message: 'product is added',
                type: 'success',
              });
            }
          });
      }
    } catch (error: any) {
      NotifyMessage({
        message: error.response.data.error.message,
        type: 'error',
      });
      setLoading(false);
    }
  };
  const handlClick = (event: any) => {
    if (event) {
      setOptionsValues(event.value);

      setProductOption([...productOption, { id: event.option }]);
      setValuesData((values: any) => [...values, event]);
    }
  };
  const handlRegion = (event: any) => {
    dispatch(productAction.setRegion(event));
  };

  const optionAscending = [...productOptions].sort((a: any, b: any) =>
    a.name < b.name ? -1 : 1
  );
  return (
    <Protected>
      <Head>
        <title>Sell Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-auto max-w-5xl px-6 md:px-8">
        <div className="flex cursor-pointer items-center  gap-2  py-4 text-xl">
          <FiArrowLeft
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <h2>Sell Product</h2>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <div className="mt-4 grid grid-flow-row-dense gap-2 md:grid-cols-3">
          <div>
            <label className="text-blue border-blue flex w-64 cursor-pointer flex-col items-center rounded-lg border bg-white px-4 py-6 uppercase tracking-wide shadow-lg hover:bg-blue-800 hover:text-white">
              <svg
                className="h-8 w-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                name="images"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                multiple
              />
            </label>
            <div className="text-red-600">{imageError}</div>
          </div>
          <div className="col-span-3 rounded-sm bg-white shadow-sm md:col-span-2">
            <form
              onSubmit={(e) => validate(e)}
              className="grid gap-2 px-2 py-4 md:grid-cols-2 md:gap-4 md:px-4"
            >
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="text"
                  value={name}
                  id="name"
                  placeholder="Enter product name"
                  onChange={(e) => {
                    dispatch(productAction.setName(e.target.value));
                  }}
                />
                <p className="text-xs italic text-red-500">{nameErr}</p>
              </div>
              <div className="col-span-2 grid gap-4  md:grid-cols-2">
                <div>
                  <SelectInput
                    type={'category'}
                    setValue={setCategory}
                    value={category}
                    setSubCategoryData={setSubCategoryData}
                    options={categories.data}
                    placeholder="Category"
                    setProductOptions={undefined}
                  />
                  <div className="text-red-600">{subcategoryErr}</div>
                </div>
                {category && (
                  <div>
                    <SelectInput
                      setValue={setSubCategory}
                      value={subCategory}
                      options={subCategoryData}
                      placeholder="Sub Category"
                      type="subcategory"
                      setProductOptions={setProductOptions}
                      setSubCategoryData={undefined}
                    />
                  </div>
                )}
              </div>

              {productOptions.length ? (
                <div className="col-span-2">
                  <Grid container spacing={2} columns={16}>
                    {optionAscending.map((item: any) => (
                      <Grid item xs={8}>
                        <Autocomplete
                          disablePortal
                          value={optionValues}
                          id="combo-box-demo"
                          options={item.values}
                          onChange={(event, newValue: any) => {
                            handlClick(newValue);
                          }}
                          getOptionLabel={(option) => option.value}
                          renderInput={(params) => (
                            <TextField {...params} label={item.name} />
                          )}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : null}

              {optionsErr && <div className="text-red-600">{optionsErr}</div>}

              <div className="col-span-2">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className=" w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  value={description}
                  onChange={(e) => {
                    dispatch(productAction.setDescription(e.target.value));
                  }}
                  id="description"
                  rows={4}
                  placeholder="Description"
                ></textarea>
                <p className="text-xs italic text-red-500">{descriptionErr}</p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="number"
                  id="price"
                  pattern="[0-9]*"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    dispatch(productAction.setPrice(e.target.value));
                  }}
                />
                <p className="text-xs italic text-red-500">{priceErr}</p>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <Autocomplete
                  // className="w-1/2 rounded-md bg-gray-100 p-3 font-roboto-regular text-gray-700 placeholder:font-roboto-regular placeholder:text-gray-700"
                  disablePortal
                  className="relative z-0"
                  value={region}
                  id="combo-box-demo"
                  options={regions}
                  onChange={(event, newValue: any) => {
                    handlRegion(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Regions" />
                  )}
                />
                <p className="text-xs italic text-red-500">{regionErr}</p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="longitude"
                >
                  Longitude
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => {
                    dispatch(productAction.setLongitude(e.target.value));
                  }}
                  pattern="[0-9]*"
                />
                <p className="text-xs italic text-red-500">{longitudeErr}</p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="Latitude"
                >
                  Latitude
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="number"
                  id="Latitude"
                  value={latitude}
                  onChange={(e) => {
                    dispatch(productAction.setLatitude(e.target.value));
                  }}
                  pattern="[0-9]*"
                />
                <p className="text-xs italic text-red-500">{latitudeErr}</p>
              </div>

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
                {loading ? (
                  <button
                    disabled
                    className="font-roboto-regular w-full rounded-md bg-blue-800 py-3 text-sm text-white"
                  >
                    Adding...
                  </button>
                ) : (
                  <button className="font-roboto-regular w-full rounded-md bg-blue-800 py-3 text-sm text-white">
                    Add
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} onClick={handleClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <Marker position={position}>
            <Popup>
              You clicked here! <button>Save</button>
            </Popup>
          </Marker>
        )}
      </MapContainer> */}
    </Protected>
  );
};

export default CreateProductPage;
