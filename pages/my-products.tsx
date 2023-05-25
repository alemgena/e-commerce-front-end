/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import { BsEye } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/protected/protected';
import Norecords from '@/components/Ui/Norecords';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import Notify from '@/components/Ui/Notify';
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import timeSince from '@/lib/types/time-since';
import NumberWithCommas from '@/lib/types/number-commas';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import ConfirmDialog from '../components/Ui/ConfirmDialog';
import { MdDelete } from 'react-icons/md';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    width: 400,
    // height:200,
    padding: '0px',
bottom:50
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  closeButton: {
    position: 'absolute',
    right: useTheme().spacing(1),
    top: useTheme().spacing(1),
    color: useTheme().palette.grey[500],
  },
}));
function MyProducts() {
  const classes=useStyles()
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductDta] = useState<any>([]);
  const { NotifyMessage, notify, setNotify } = Notify();
  const { user, token } = useAppSelector(selectCurrentUser);
  const [open, setOpen] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = useState<any>({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const handleDelete = (pId: string) => {
      setProductDta(productData.filter((item: any) => item.id !== pId));
     setConfirmDialog({
       ...confirmDialog,
       isOpen: false,
     });
    const token = localStorage.getItem('token');
    axios
      .delete(`${baseURL}api/products/${pId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          setProductDta(productData.filter((item: any) => item.id !== pId));
          NotifyMessage({
            message: 'Product is deleted',
            type: 'success',
          });
        }
      })
      .catch((error) => {
        NotifyMessage({
          message: error.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
   

    fetchData();
  }, [user]);
   const fetchData=async()=> {
     try {
       const { data } = await axios.get(
         `${baseURL}api/products?filters=[{"seller":${JSON.stringify(
           user.user ? user?.user?._id : user._id
         )}}]`
       );
       if (data) {
         setLoading(false);
         setProductDta(data.data);
       }
       if (data) {
         setLoading(false);
         setProductDta(data.data);
       }
     } catch (error: any) {
       setLoading(false);
       NotifyMessage({
         message: error.message,
         type: 'error',
       });
     }
   }
  const[productId,setProductId]=useState<string>()
  const handleOpenDialog=(id:string)=>{
    setOpen(true)
    setProductId(id)
  }
   const [selectedFiles, setSelectedFiles] = useState<any>([]);
     const [imageError, setImageError] = useState<string>();
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
   const handleSubmit=async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
     if (!selectedFiles.length) {
       setImageError('Pleas Select at leas one image');
     }
     else{
 let formData = new FormData();
    Array.from(selectedFiles).forEach((item: any) => {
      formData.append('images', item);
    });
    //uploadImages
    //formData
    try {
      const { data } = await axios.post(
        `${baseURL}api/products/updateImages/${productId}`,
        formData
      );
         if (data.data) {
           setLoading(false);
           NotifyMessage({
             message: 'Successfully updated product images',
             type: 'success',
           });
           fetchData()
           setLoading(false)
           setOpen(false)
         }
   } catch (error: any) {
          NotifyMessage({
            message: error.response.data.error.message,
            type: 'error',
          });
          setLoading(false);
        }
      }
      }
     const removeImage = (fileIndexToRemove: any) => {
        setSelectedFiles((prevSelectedFiles:any) => {
          const updatedFiles = [...prevSelectedFiles];
          updatedFiles.splice(fileIndexToRemove, 1);
          return updatedFiles;
        });

     };
  return (
    <ProtectedRoute>
      <Head>
        <title>My Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 px-4 pb-32 md:px-12">
        <div
          onClick={() => router.push('/')}
          className="mb-4 flex items-center gap-2 py-4 text-xl hover:cursor-pointer"
        >
          <IoIosArrowBack />
          <h2 className="font-roboto-medium">My Products</h2>
        </div>
        {productData ? (
          <div className="mt-4 flex flex-col gap-8 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productData?.length ? (
                <>
                  {productData.map((data: any) => (
                    <>
                      <div
                        key={data._id}
                        className="bg-palette-card/80 flex  w-full flex-shrink-0 flex-col 
                          rounded-md p-2 shadow-lg backdrop-blur-[10px]
                           backdrop-filter"
                      >
                      
                          <div className="flex cursor-pointer flex-row">
                              <Link key={data?._id} href={`/products/${data?.id}`}>
                            <img
                              src={`${baseURL}/${data?.imagesURL[0]}`}
                              className="h-52 w-full object-cover"
                            />
                            </Link>
                            <div className="-ml-10 mt-4 h-7 w-8 rounded-full bg-white ">
                              <MdDelete
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      'Are you sure to remove this product ?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {
                                      handleDelete(data?.id);
                                    },
                                  });
                                }}
                                className="mx-1 my-1"
                                size={23}
                              />
                            </div>
                          </div>
                        <div className="bg-gray-400 bg-white">
                          <div className="flex flex-col gap-3 p-2">
                            <h6 className="text-sm text-gray-500">
                              {data?.name}
                            </h6>
                            <div className="flex items-center justify-between">
                              <h6 className="font-roboto-bold ">
                                {NumberWithCommas(data?.price)} ETB
                              </h6>
                              <h6 className="flex rounded-full bg-gray-100 px-3 py-1">
                                {data?.viewCount}{' '}
                                <BsEye className="ml-1 mt-1" />
                              </h6>
                              <h1>{timeSince(data?.createdAt)}</h1>
                            </div>
                          </div>
                          <div className="h-0.5 w-full bg-gray-200" />
                          <div className="font-roboto-light flex gap-6 rounded-md p-2">
                            <button
                              onClick={() =>
                                router.push(`/sell/products/edit/${data.id}`)
                              }
                              className="flex text-xl font-bold text-blue-600"
                            >
                              <AiFillEdit size={24} className="" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleOpenDialog(data.id)}
                              className="flex text-xl font-bold text-blue-600"
                            >
                              <AiFillEdit size={24} className="" />
                              <span className="mr-4">Upload_Images</span>
                            </button>
                        
                          </div>
                        </div>
                      </div>
                      <></>
                    </>
                  ))}
                </>
              ) : (
                <Norecords />
              )}
            </div>
          </div>
        ) : (
          <Norecords />
        )}
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Update Products Images
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              type="file"
              onChange={handleFileSelect}
              inputProps={{ multiple: true }} // Specify the allowed file types
            />
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
                    <div className="relative w-72">
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
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-72"
                        alt=""
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className=" relative mt-8 bg-blue-800"
              variant="contained"
              style={{ color: 'white' }}
            >
              <span>{isLoading ? 'Uploading' : 'Upload'}</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}

export default MyProducts;
