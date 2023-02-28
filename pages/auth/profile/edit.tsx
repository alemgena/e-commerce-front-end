import { FaRegUser } from 'react-icons/fa';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { MdPhone } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { profileActions } from '@/store/profile';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { UPDATE_PROFILE } from '@/types';
import { PhotoCamera } from '@mui/icons-material';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import { Ur2 } from '@/utils/url';
function EditProfilePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.login.loggedUser
  );
   const User = useSelector((state: RootStateOrAny) => state.user.user);
  const { firstName, lastName, phone } = useSelector(
    (state: RootStateOrAny) => state.profile.inputValues
  );
  const { isLoading } = useSelector((state: RootStateOrAny) => state.profile);
  const profile = useSelector((state: RootStateOrAny) => state.profile);
  const roomImagePicker = useRef<any>();
  const [image, setImage] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    setDefaultValues();
  }, [User.data]);
  const handleSetFileName = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };
  const setDefaultValues = () => {
    if(User.data){
    dispatch(profileActions.setFirstName(User.data.first_name));
    dispatch(profileActions.setLastName(User.data.last_name));
    dispatch(profileActions.setPhone(User.data.phone));
    }
  };
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };
  const saveChanges = () => {
    dispatch(profileActions.setProfileUpdated(false));
    let formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone', phone);
    formData.append('image', image);
    dispatch({ type: UPDATE_PROFILE, data: formData });
    setSubmit(true);
  };
  const [submit, setSubmit] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();
  useEffect(() => {
    if (profile.error && submit) {
      NotifyMessage({
        message: profile.error.message,
        type: 'error',
      });
    }
  }, [profile.error]);
  useEffect(() => {
    if (profile.profileUpdated && submit) {
     NotifyMessage({
       message: 'Your profile updated successfully',
       type: 'success',
     });
    }
  }, [profile.profileUpdated]);
    useEffect(() => {
     
    }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center justify-between py-4  text-xl">
          <div className="flex items-center gap-2 text-xl">
            <FiArrowLeft />
            <h2>Edit Profile</h2>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <div className="mt-4">
          <form onSubmit={(e) => validate(e)}>
            <div className="mx-36 flex flex-col items-center gap-10 bg-white px-36 py-14">
              <div>
                {image ? (
                  <img src={previewImage} width="100px" height="100px" alt="" />
                ) : (
                  <>
                  {User.data&&
                  <>
                    {User.data.imageURL ? (
                      <img
                        src={`${Ur2}/${User.data.imageURL}`}
                        width="100px"
                        height="100px"
                        alt=""
                      />
                    ) : (
                      <RxAvatar size={100} className="text-gray-400" />
                    )}
                  </>
                    }
                    </>
                )}

                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={8} md={2}>
                    {' '}
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Button
                      onClick={() => {
                        roomImagePicker.current.click();
                      }}
                      className=" bg-blue-800"
                      style={{
                        //  width: '70px',
                        textDecoration: 'none',
                        color: 'white',
                      }}
                      variant="contained"
                      endIcon={<PhotoCamera />}
                    >
                      Image
                    </Button>
                    <input
                      name="image"
                      type="file"
                      hidden
                      accept="image/*"
                      ref={roomImagePicker}
                      onChange={(e) => {
                        handleSetFileName(e);
                      }}
                      autoFocus={true}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="flex w-full gap-16">
                <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                  <FaRegUser />
                  <input
                    type="text"
                    placeholder="First name"
                    className="flex-grow py-1 focus:outline-none"
                    value={firstName}
                    onChange={(e) => {
                      dispatch(profileActions.setFirstName(e.target.value));
                    }}
                  />
                </div>
                <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                  <FaRegUser />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="flex-grow py-1 focus:outline-none"
                    value={lastName}
                    onChange={(e) => {
                      dispatch(profileActions.setLastName(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full gap-16">
                <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                  <MdPhone />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="flex-grow py-1 focus:outline-none"
                    value={phone}
                    onChange={(e) => {
                      dispatch(profileActions.setPhone(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full gap-16">
                <button
                  onClick={() => router.push('/changePassword')}
                  className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white"
                >
                  Change Password
                </button>
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white"
                >
                  Updateing....
                </button>
              ) : (
                <button className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white">
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
