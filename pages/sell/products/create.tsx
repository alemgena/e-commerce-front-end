import Head from 'next/head';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SelectInput } from '@/components/select-input';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { productAction } from '@/store/products-slice';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import axios from 'axios';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import Protected from '@/components/protected/protected';
import { useAppDispatch } from '@/store';
import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
const CreateProductPage = () => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState<any>([]);
  const router = useRouter();
  const [cat, setCat] = useState<any>([]);
  const { id } = router.query;
  React.useEffect(() => {
    async function fetcRegions() {
      try {
        const { data } = await axios.get(`${baseURL}api/regions/`);
        if (data) {
          setRegions(data.data);
        }
      } catch (error: any) {}
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/categories`
        );
        if (data) {
          setCat(data.data);
        }
      } catch (error: any) {}
    }
    fetcRegions();
  }, []);
  const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<any>();
  const [optionValues, setOptionsValues] = useState();
  const [valuesData, setValuesData] = useState<any>([]);
  const [productOption, setProductOption] = useState<any>([]);
  const [productOptions, setProductOptions] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState<any>([]);
  const [subCategory, setSubCategory] = useState();
  const [imageError, setImageError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const { productName, description, price, city, region } = useSelector(
    (state: RootStateOrAny) => state.products.inputValues
  );
  const {
    nameErr,
    descriptionErr,
    priceErr,
    cityErr,
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
    dispatch(productAction.setCityErr(''));
    let isValid = true;

    if (productName?.length < 4) {
      dispatch(
        productAction.setNameErr('Product name must be at least 4 characters!')
      );
      isValid = false;
    }
    if (description?.length < 4) {
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
    if (!city) {
      dispatch(productAction.setCityErr('Subcity Is required!'));
      isValid = false;
    }
    if (!region) {
      dispatch(productAction.setRegionErr('Region Is required!'));
      isValid = false;
    }
    if (!selectedFiles.length) {
      setImageError('Pleas Select at leas one image');
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
    let formData = new FormData();
    Array.from(selectedFiles).forEach((item: any) => {
      formData.append('images', item);
    });
    try {
      const { data } = await axios.post(
        `${baseURL}api/upload/types/products`,
        formData
      );
      if (data.data) {
        const productData = {
          name: productName,
          description: description,
          price: price,
          otherOptions:textFieldsValues,
          subcategory: subCategory.id,
          imagesURL: data.data,
          options: uniqueOption,
          region: region,
          location: city,
        };
        try {
          const response = await axios.post(
            `${baseURL}api/products`,
            productData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.data) {
            setLoading(false);
            NotifyMessage({
              message: 'product is added',
              type: 'success',
            });
          }
        } catch (error: any) {
          NotifyMessage({
            message: error.response.data.error.message,
            type: 'error',
          });
          setLoading(false);
        }
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
  const [regionValue, setRegionValue] = useState<any>(null);
  const [subCity, setSubCity] = useState<any>(null);
  const handlRegion = (event: any) => {
    dispatch(productAction.setRegion(event?.name));
    setRegionValue(event);
    setSubCity(regions.find((region: any) => region.name === event?.name));
  };
  const optionAscending = [...productOptions].sort((a: any, b: any) =>
    a?.name < b?.name ? -1 : 1
  );
  const handlCity = (event: any) => {
    dispatch(productAction.setCity(event));
  };
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const invalidImages: File[] = [];
    const validImagesFormats: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        invalidImages.push(file);
      } else {
        validImagesFormats.push(file);
      }
    }
    if (validImagesFormats.length > 0) {
      setSelectedFiles([...selectedFiles, ...validImagesFormats]);
    }
    if (invalidImages.length > 0) {
      setImageError('Only images are allowed');
    } else {
      setImageError('');
    }
  };
  const removeImage = (fileIndexToRemove: any) => {
    const updatedFiles = selectedFiles.filter(
      (file: any, index: any) => index !== fileIndexToRemove
    );
    setSelectedFiles(updatedFiles);
  };
  /*  */
  const currentLanguage = i18next.language;

  /*
     {cat.map((item: any) => (
              <div>{item.language[currentLanguage].label}</div>
            ))}
  */
  const placeholders = (placeholder: string) => {
    return t(placeholder);
  };
   const [textFieldsValues, setTextFieldsValues] = useState<any>({});

   // Define the onChange event handler
   const handleTextFieldChange = (event:any) => {
    const label = event.target.parentElement.previousSibling.textContent;
     console.log("lable is",label)
     const value = event.target.value;

     // Update the state with the new value using the label as the key
     setTextFieldsValues((prevValues:any) => ({
       ...prevValues,
       [label]: value,
     }));
   };

  return (
    <Protected>
      <Head>
        <title>Sell Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" m-auto max-w-5xl px-6 md:px-8">
        <div className="flex cursor-pointer items-center  gap-2  py-4 text-xl">
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <h2>Home</h2>
          {id?.toString()}
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <div className="mt-4 grid grid-flow-row-dense gap-2 md:grid-cols-3">
          <div>
            <label
              className="text-blue border-blue flex w-64 cursor-pointer
             flex-col items-center rounded-lg border bg-white px-4 py-6 
             uppercase tracking-wide shadow-lg hover:bg-blue-800 hover:text-white"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                {t('select file')}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                name="images"
                multiple
              />
            </label>
            {imageError && <div>{imageError}</div>}
            <div
              className={`flex ${
                selectedFiles.length > 1 ? 'flex-col' : 'flex-row'
              }`}
            >
              {selectedFiles.map(
                (
                  image: Blob | MediaSource,
                  index: React.Key | null | undefined
                ) => (
                  <div key={index} className="mt-2 w-1/2">
                    <div className="relative w-64">
                      <button
                        className="absolute right-0 top-0 m-1 rounded-full bg-red-500 p-1
                       transition duration-200 hover:bg-red-300 focus:bg-red-300"
                        onClick={() => removeImage(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-span-3 rounded-sm bg-white shadow-sm md:col-span-2">
            <form
              onSubmit={(e) => validate(e)}
              className="grid gap-2 px-2 py-4 md:grid-cols-2 md:gap-4 md:px-4"
            >
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                  htmlFor="name"
                >
                  {t('name')}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="text"
                  value={productName}
                  id="name"
                  placeholder="Enter product name"
                  onChange={(e) => {
                    dispatch(productAction.setName(e.target.value));
                  }}
                />
                <p className="text-xs italic text-red-500">{nameErr}</p>
              </div>
              <div className="relative z-0 col-span-2 block grid gap-4 md:grid-cols-2">
                <div>
                  <SelectInput
                    type={'category'}
                    setValue={setCategory}
                    value={category}
                    setSubCategoryData={setSubCategoryData}
                    options={categories.data}
                    placeholder={placeholders('category')}
                    setProductOptions={undefined}
                  />
                  <div className="text-red-600">{subcategoryErr}</div>
                </div>
                {category && (
                  <div className="relative z-10">
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
                <div className=" relative z-0 col-span-2">
                  <Grid container spacing={2} columns={16}>
                    {optionAscending.map((item: any, index) => (
                      <Grid item xs={8} key={index}>
                        {item.values.length > 0 ? (
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
                              <TextField {...params} label={item?.name} />
                            )}
                          />
                        ) : (
                            <><InputLabel className='hidden' htmlFor={`text-field-${index}`} shrink>
                              {item?.name}
                            </InputLabel><TextField
                                fullWidth
                                id="outlined-basic"
                                label={item?.name}
                                variant="outlined"
                                onChange={handleTextFieldChange}
                                // Set the value of the TextField based on the state
                                value={textFieldsValues[item?.name] || ''} /></>
                        )}
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
                  {t('description')}
                </label>
                <textarea
                  className=" w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  value={description}
                  onChange={(e) => {
                    dispatch(productAction.setDescription(e.target.value));
                  }}
                  id="description"
                  rows={4}
                  placeholder={placeholders('description')}
                ></textarea>
                <p className="text-xs italic text-red-500">{descriptionErr}</p>
              </div>
              <div>
                <Autocomplete
                  className="relative z-0"
                  value={regionValue}
                  id="combo-box-demo"
                  options={regions}
                  getOptionLabel={(option) => option?.name}
                  renderInput={(params) => (
                    <TextField {...params} label={t('regions')} />
                  )}
                  onChange={(event, newValue: any) => {
                    handlRegion(newValue);
                  }}
                />
                <p className="text-xs italic text-red-500">{regionErr}</p>
              </div>

              <div>
                {subCity && (
                  <>
                    <Autocomplete
                      className="relative z-0"
                      value={city}
                      id="combo-box-demo"
                      options={subCity.subCitys}
                      renderInput={(params) => (
                        <TextField {...params} label="Subcity" />
                      )}
                      onChange={(event, newValue: any) => {
                        handlCity(newValue);
                      }}
                    />
                  </>
                )}
                <p className="text-xs italic text-red-500">{cityErr}</p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  {t('price')}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                  type="number"
                  id="price"
                  pattern="[0-9]*"
                  placeholder={placeholders('price')}
                  value={price}
                  onChange={(e) => {
                    dispatch(productAction.setPrice(e.target.value));
                  }}
                />
                <p className="text-xs italic text-red-500">{priceErr}</p>
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
                  {t('Negotiatable')}
                </label>
              </div>
              <div className="w-1/2">
                {loading ? (
                  <button
                    disabled
                    className="font-roboto-regular w-full rounded-md bg-blue-800 py-3 text-sm text-white"
                  >
                    {t('adding')}...
                  </button>
                ) : (
                  <button className="font-roboto-regular w-full rounded-md bg-blue-800 py-3 text-sm text-white">
                    {t('add')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default CreateProductPage;
