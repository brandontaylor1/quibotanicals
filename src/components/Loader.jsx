import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ onFinish }) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if(percent < 100) {
            const timer = setTimeout(() => setPercent(prev => prev + 1), 25)
            return () => clearTimeout(timer)
        } else {
            const delay = setTimeout(() => {
                onFinish();
            }, 2000);
            return () => clearTimeout(delay)
        }
    }, [percent, onFinish])

  return (
    <AnimatePresence>
        <motion.div
            className='loader-container fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center z-50 flex-col'
            initial={{ y: 0}}
            animate={{ y: percent === 100 ? '-100%' : 0 }}
            exit={{ opacity: 0}}
            transition={{ duration: 2, ease: 'easeInOut' }}>
            <div 
            className="loader-content absolute top-0 left-0 w-[100%] h-[100%] bg-[#E1B2A0] flex items=left justify-end flex-col">
                <motion.p
                    initial={{ opacity: 1}}
                    animate={{ opacity: percent === 100 ? 0 : 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    exit={{ opacity: 0 }} 
                
                className='text-[200px] tracking-tighter font-light text-[#B5395E]'>{percent}%
                </motion.p>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default Loader