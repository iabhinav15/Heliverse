import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { GrMultiple } from 'react-icons/gr';
import { CustomButton, Loading, TextInput } from '../components';
import { handleFileUpload } from '../utils';


const UpdateUser = ({ user, onClose }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({mode:'onChange'});
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(user?.domain);


  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const avatarUrl = picture && (await handleFileUpload(picture))
      data.avatar = avatarUrl;

      data.domain = selectedDomain;

      const url = `${import.meta.env.VITE_API_URL}/api/users/update-user/${user._id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resData = await response.json();

      if(resData?.success === true){
        onClose();
        alert("User updated successfully");
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
    <div className='fixed inset-0 z-50  flex items-center justify-center'>
        <div className='w-[60%] bg-red-200 border-4 rounded-2xl p-4 sm:px-2 md:p-6 lg:px-4 2xl:px-8 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-4'>
            <div className='p-[6px] bg-red-500 rounded text-white'>
              <GrMultiple size={20}/>
            </div>
            <span className='text-2xl text-black font-semibold text-center'>Update User</span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>Fill to update user</p>
       
          <form className='flex justify-around' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-[40%] py-4 flex flex-col items-center gap-2'>
              <TextInput
                name='first_name' placeholder='First name' type='text'
                label='First Name' register={ register('first_name', {required: 'First Name is required!'})} 
                error={errors.first_name? errors.first_name.message : ""}
                styles='w-full'
                defaultValue={user?.first_name}
              />
              <TextInput
                name='last_name' placeholder='Last name' type='text'
                label='Last Name' register={ register('last_name', {required: 'Last Name is required!'})} 
                error={errors.last_name? errors.last_name.message : ""}
                styles='w-full '
                defaultValue={user?.last_name}
              />
              <div className='flex gap-4'>
                <TextInput
                  name='gender' placeholder='' type='radio' value="Male"
                  label='Male' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                  defaultChecked={user?.gender === 'Male' ? true : false}
                />
                <TextInput
                  name='gender' placeholder='' type='radio' value="Female"
                  label='Female' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                  defaultChecked={user?.gender === 'Female' ? true : false}
                />
                <TextInput
                  name='gender' placeholder='' type='radio' value="other"
                  label='Other' register={ register('gender', {required: 'gender is required!'})} 
                  error={errors.gender? errors.gender.message : ""}
                  styles='w-full '
                  defaultChecked={user?.gender === 'other' ? true : false}
                />
              </div>
              <TextInput
                name='email' placeholder='email@example.com' type='email'
                label='Email Address' register={ register('email', {required: 'Email is required!'})} 
                error={errors.email? errors.email.message : ""}
                styles='w-full'
                defaultValue={user?.email}
              />
              <h4 className=''>Available</h4>
              <div className='flex gap-2'>
                <TextInput
                  name='available' type='radio' value="true"
                  label='Yes' register={ register('available', {required: 'availablity is required!'})} 
                  error={errors.available? errors.available.message : ""}
                  styles='w-full'
                  defaultChecked={user?.available === true ? true : false}
                />
                <TextInput
                  name='available' type='radio' value="false"
                  label='No' register={ register('available', {required: 'availablity is required!'})} 
                  error={errors.available? errors.available.message : ""}
                  styles='w-full '
                  defaultChecked={user?.available === false ? true : false}
                />
              </div>
              
              {/* select option from which user can select domain */}
              <select required value={selectedDomain} 
                onChange={(e)=>setSelectedDomain(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md outline-none'
                >
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
                isSubmitting ? <Loading /> : <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-green-500 px-16 py-2.5 my-2 tracking-wide text-md font-medium text-white outline-none `} title='Update User'/>
              }
              {/* Button to  close the modal window */}
              <div>
                <CustomButton onClick={onClose} containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-16 py-2.5 my-2 tracking-wide text-md font-medium text-white outline-none `} title='Close'/>
              </div>
            </div>
            {/* Image upload */}
            <div className='flex flex-col items-center justify-center gap-2'>
              <img src={picture ? URL.createObjectURL(picture) : user?.avatar} alt="" className='sm:h-80 sm:w-80 h-14 w-14 rounded-full object-cover'/>
              <label htmlFor='profilePhoto' className='text-base font-semibold'>Avatar</label>
              <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2  hover:text-ascent-1 cursor-pointer'>
              <input type="file" id="imgUpload" onChange={(e)=>setPicture(e.target.files[0])} accept='.jpg, .png. .jpeg'/></label>
            </div>
          </form>
        </div>
    </div>
  )
}

export default UpdateUser;