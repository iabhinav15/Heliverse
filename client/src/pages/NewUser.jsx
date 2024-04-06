
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { GrMultiple } from 'react-icons/gr';
import { CustomButton, Loading, TextInput } from '../components';
import { useNavigate } from "react-router-dom";
import { NoProfile } from '../assets';
import { handleFileUpload } from '../utils';


const NewUser = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({mode:'onChange'});
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data)

    try {
      const avatarUrl = picture && (await handleFileUpload(picture))
      data.avatar = avatarUrl;

      data.domain = selectedDomain;

      const url = `${import.meta.env.VITE_API_URL}/api/users/create-user`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resData = await res.json();

      if(resData?.success === true){
        navigate("/");
      }
      else{
        setErrMsg("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setErrMsg("Something went wrong!");
    }
    finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-[#f3f5f1] flex items-center justify-center '>
        <div className='w-full p-4 sm:px-12 md:p-6 lg:px-12 2xl:px-40 flex flex-col justify-center h-full'>
          <div className='w-full flex gap-2 items-center mb-4'>
            <div className='p-[6px] bg-red-500 rounded text-white'>
              <GrMultiple size={20}/>
            </div>
            <span className='text-2xl text-black font-semibold text-center'>Create User</span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>Fill to create new user</p>
       
          <form className='flex' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-[40%] py-4 flex flex-col items-center gap-2'>
              <TextInput
                name='first_name' placeholder='First name' type='text'
                label='First Name' register={ register('first_name', {required: 'First Name is required!'})} 
                error={errors.first_name? errors.first_name.message : ""}
                styles='w-full '
              />
              <TextInput
                name='last_name' placeholder='Last name' type='text'
                label='Last Name' register={ register('last_name', {required: 'Last Name is required!'})} 
                error={errors.last_name? errors.last_name.message : ""}
                styles='w-full '
              />
              <div className='flex gap-4'>
                <TextInput
                  name='gender' placeholder='' type='radio' value="Male"
                  label='Male' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                />
                <TextInput
                  name='gender' placeholder='' type='radio' value="Female"
                  label='Female' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                />
                <TextInput
                  name='gender' placeholder='' type='radio' value="other"
                  label='Other' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                />
              </div>
              <TextInput
                name='email' placeholder='email@example.com' type='email'
                label='Email Address' register={ register('email', {required: 'Email is required!'})} 
                error={errors.email? errors.email.message : ""}
                styles='w-full'
              />
              <h4 className=''>Available</h4>
              <div className='flex gap-2'>
                <TextInput
                  name='available' type='radio' value="true"
                  label='Yes' register={ register('available', {required: 'availablity is required!'})} 
                  error={errors.available? errors.available.message : ""}
                  styles='w-full '
                />
                <TextInput
                  name='available' type='radio' value="false"
                  label='No' register={ register('available', {required: 'availablity is required!'})} 
                  error={errors.available? errors.available.message : ""}
                  styles='w-full '
                />
              </div>
              
              {/* select option from which user can select domain */}
              <select required value={selectedDomain}
                onChange={(e)=>setSelectedDomain(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md outline-none'>
                <option value="">Select Domain</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
                <option value="Design">Design</option>
                <option value="Business Development">Business Development</option>
              </select>

              {
                errMsg && (<span className="text-sm text-[#f64949fe]">{errMsg}</span>)
              }
              {
                isSubmitting ? <Loading /> : <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-16 py-2.5 my-2 tracking-wide text-md font-medium text-white outline-none `} title='Create User'/>
              }
            </div>
            <div className='w-full flex flex-col items-center justify-center gap-2'>
              <img src={picture ? URL.createObjectURL(picture) : NoProfile} alt="" className='h-[40%] w-[40%] rounded-full object-cover'/>
              <label htmlFor='profilePhoto' className='text-base font-semibold'>Avatar</label>
              <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2  hover:text-ascent-1 cursor-pointer'>
              <input type="file" required id="imgUpload" onChange={(e)=>setPicture(e.target.files[0])} accept='.jpg, .png. .jpeg'/></label>
            </div>
          </form>
          
        </div>
          
    </div>
  )
}

export default NewUser;