import React from 'react'
import Blogs from './blogs'

function page() {
  return (
    <div>
        <h2 className='text-center bg-black text-white font-semi-bold  p-4'>All Blogs</h2>

        <Blogs />
    </div>
  )
}

export default page