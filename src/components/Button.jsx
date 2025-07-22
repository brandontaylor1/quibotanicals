import React from 'react'

const Button = ({ children, style }) => {
  return (
    <button className='w-[271px] h-[74px] bg-black text-white font-bold text-[1.2rem] tracking- tighter rounded-[5px] flex items-center justify-center hover:bg-[var(--color-dark-red)] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-red)] focus:ring-offset-2 focus:ring-offset-white'
      style={style}
    >
        {children}
    </button>
  )
}

export default Button