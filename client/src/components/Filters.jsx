// merge conflicts amit
import React from 'react'
import TextInput from './TextInput'
import { useForm } from 'react-hook-form';
import CustomButton from './CustomButton';

const Filters = ({ filterData }) => {

  const { register, handleSubmit, formState: { errors } } = useForm ({mode:'onChange'});

  const domainArray = [ 'Sales', 'Finance', 'Marketing', 'IT', 'Management', 'Design', 'Business Development'];

  const onSubmit = (data) => {
    filterData(data);
  }

  return (
    <div className='hidden md:block w-48 h-[calc(100vh-70px)] bg-red-300 sticky top-[70px] left-0'>
      <h1 className='text-center text-xl font-semibold p-2'>Apply Filters</h1>
      <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
            {/* filter on the basis of gender */}
            <div>
              <h1 className='mt-4 font-medium '>Gender</h1>
                <TextInput
                  name='gender' type='checkbox' value="Male"
                  label='Male' register={ register('Male')} 
                  styles='w-full' externalStyles='flex items-center justify-center gap-4'
                />
                <TextInput
                  name='gender' type='checkbox' value="Female"
                  label='Female' register={ register('Female')} 
                  styles='w-full' externalStyles='flex items-center justify-center gap-4'
                />
                <TextInput
                  name='gender' type='checkbox' value="other"
                  label='Other' register={ register('other')} 
                  styles='w-full' externalStyles='flex items-center justify-center gap-4'
                />
              </div>
              {/* filter on the basis of availability */}
              <div>
                <h1 className='mt-4 font-medium'>Availability</h1>
                <div className='flex flex-col items-center'>
                  <TextInput
                    name='availability' type='checkbox' value="true"
                    label='Available' register={ register('available')} 
                    styles='w-full' externalStyles='flex items-center justify-center gap-4'
                  />
                </div>
              </div>
              {/* filter on the basis of domain */}
              <div className='flex flex-col items-center'>
                <h1 className=' mt-4 font-medium'>Domain</h1>
                <div className='flex flex-col items-center'>
                  {
                    domainArray.map((domain, key) => (
                      <TextInput key={key}
                        name={domain} type='checkbox' value={domain}
                        label={domain} register={register(`${domain}`)} 
                        styles='w-full' externalStyles='flex items-center justify-center gap-4'
                      />
                    ))
                  }
                </div>
              </div>
              <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-red-500 px-4 py-2.5 my-2 tracking-wide text-sm font-medium text-white outline-none `} title='Apply filter'/>
          </form>
      </div>
      
    </div>
  )
}

export default Filters