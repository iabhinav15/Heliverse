import React from 'react'

const TextInput = React.forwardRef((
    {type, placeholder, styles, label, labelStyles, register, name, error, value, externalStyles, defaultValue, defaultChecked }, ref  
) => {
  return (
    <div className={externalStyles ? `w-full mt-2 ${externalStyles}` : 'w-full flex flex-col mt-2'}>
        {label && <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>}
        <div>
            <input type={type} name={name} placeholder={placeholder} ref={ref} className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`} {...register} value={value} defaultValue={defaultValue} defaultChecked={defaultChecked} aria-invalid={error ? "true" : "false"}/>
        </div>
        {error && <span className='text-[#f64949f3] text-xs mt-0.5'>{error}</span>}
    </div>

  )
})

export default TextInput;