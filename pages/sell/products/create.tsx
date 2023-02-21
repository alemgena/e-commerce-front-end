import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { SelectInput } from '@/components/select-input';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { Autocomplete, Chip, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { productAction } from '@/store/products-slice';
import Button from '@mui/material/Button';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import axios from 'axios';
import { Ur2 } from '@/utils/url';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const CreateProductPage = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<any>();
  const [optionValues, setOptionsValues] = useState([]);
  const [productOption, setProductOption] = useState();
  const [productOptions, setProductOptions] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCategory, setSubCategory] = useState();
  const [image, setImage] = useState<any>([]);
  const[imageError,setImageError]=useState<string>()
  const [loading, setLoading] = useState(false);
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const { name, description, price, subcategory } = useSelector(
    (state: RootStateOrAny) => state.products.inputValues
  );
  const { nameErr, descriptionErr, priceErr, subcategoryErr, optionsErr } =
    useSelector((state: RootStateOrAny) => state.products.inputErrors);
  const handlClick = (event: React.FormEvent<HTMLFormElement>) => {
    if (event.slice(-1)[0]) {
      setOptionsValues(event.slice(-1)[0].values);
    }
    let data: { [s: string]: any } = [];
    event.map((item: any) => {
      data.push({ ['id']: item.id });
    });
    setProductOption(Object.values(data));
  };
  const handlOptions = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    let values = [];
    event.map((item: any) => {
      productOption.map((data) => {
        if (item.option === data.id) {
          values.push(item._id);
        }
      });
    });
    event.map((item: any) => {
      productOption.map((data) => {
        if (item.option === data.id) {
          data.values = values;
        }
      });
    });
  };
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(productAction.setNameErr(''));
    dispatch(productAction.setPriceErr(''));
    dispatch(productAction.setDescriptionErr(''));
    dispatch(productAction.setSubcategoryErr(''));
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
      dispatch(productAction.setSubcategoryErr('Select category and subcategory!'));
      isValid = false;
    }
     if (!category) {
       dispatch(
         productAction.setSubcategoryErr('Select category and subcategory!')
       );
       isValid = false;
     }
        if (!price) {
          dispatch(
            productAction.setPriceErr('Price Is required!')
          );
          isValid = false;
        }
       if (!image.length) {
       setImageError("Pleas Select at leas on image")
         isValid = false;
       }
    if (isValid) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    let token = localStorage.getItem('token');
    setLoading(true);
    const productData = {
      name: name,
      description: description,
      price: price,
      subcategory: subCategory.id,
      options: productOption,
    };
    let formData = new FormData();
    Array.from(image).forEach((item) => {
      formData.append('images', item);
    });
    try {
      const { data } = await axios.post(`${Ur2}api/products/`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.data) {
        await axios
          .post(`${Ur2}api/products/uploadImages/${data.data.id}`, formData)
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

  return (
    <>
      <Head>
        <title>Sell Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2>Sell Product</h2>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <div className="mt-4 flex">
          <div className="w-1/3 px-16">
            <div className="flex flex-col items-center justify-center gap-4 rounded-sm bg-white py-28 shadow-sm">
              <div className="flex items-center justify-center rounded-full  p-6">
                <Button
                  style={{ marginLeft: '15px' }}
                  variant="contained"
                  component="label"
                  startIcon={
                    <AiOutlinePicture className="text-white" size={30} />
                  }
                >
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    name="images"
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                    multiple
                  />
                </Button>
              </div>
              <p className="font-roboto-light text-sm ">
                Browse or drop picture here
              </p>
              <div className="text-red-600">{imageError}</div>
            </div>
          </div>
          <div className="w-2/3 rounded-sm bg-white px-10 py-8 shadow-sm">
            <form
              onSubmit={(e) => validate(e)}
              onScroll={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  dispatch(productAction.setName(e.target.value));
                }}
                placeholder="Name"
                className="w-1/2 rounded-md bg-gray-100 p-3 font-roboto-regular text-gray-700 placeholder:font-roboto-regular placeholder:text-gray-700"
              />
              <div className="text-red-600">{nameErr}</div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <SelectInput
                    type={'category'}
                    setValue={setCategory}
                    value={category}
                    setSubCategoryData={setSubCategoryData}
                    options={categories.data}
                    placeholder="Category"
                  />
                  <div className="text-red-600">{subcategoryErr}</div>
                </div>
                {category && (
                  <div className="w-1/2">
                    <SelectInput
                      setValue={setSubCategory}
                      value={subCategory}
                      options={subCategoryData}
                      placeholder="Sub Category"
                      type="subcategory"
                      setProductOptions={setProductOptions}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {productOptions.length ? (
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={productOptions}
                      onChange={(event, value) => {
                        handlClick(value);
                      }}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            onChange={(e) => {
                              handlClick(option);
                            }}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product Options"
                          placeholder="Options"
                        />
                      )}
                    />
                  ) : null}
                </div>
              </div>
              <div className="w-1/2">
                {optionValues.length ? (
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={optionValues}
                    onChange={(event, value) => {
                      handlOptions(value);
                    }}
                    style={{ width: '450px' }}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.value}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          onChange={(e) => {
                            handlClick(option);
                          }}
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.value}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Option Values"
                        placeholder="Option Values"
                      />
                    )}
                  />
                ) : null}
              </div>

              <textarea
                value={description}
                onChange={(e) => {
                  dispatch(productAction.setDescription(e.target.value));
                }}
                rows={4}
                placeholder="Description"
                className="w-full resize-none rounded-md bg-gray-100 p-3 font-roboto-regular text-gray-700 placeholder:font-roboto-regular placeholder:text-gray-700"
              ></textarea>
              <div className="text-red-600">{descriptionErr}</div>
              <input
                value={price}
                onChange={(e) => {
                  dispatch(productAction.setPrice(e.target.value));
                }}
                type="number"
                pattern="[0-9]*"
                placeholder="Price"
                className="w-1/2 rounded-md bg-gray-100 p-3 font-roboto-regular text-gray-700 placeholder:font-roboto-regular placeholder:text-gray-700"
              />
              <div className="text-red-600">{priceErr}</div>
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
                    className="w-full rounded-md bg-blue-800 py-3 font-roboto-regular text-sm text-white"
                  >
                    Adding...
                  </button>
                ) : (
                  <button className="w-full rounded-md bg-blue-800 py-3 font-roboto-regular text-sm text-white">
                    Add
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
