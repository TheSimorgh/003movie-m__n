import React from 'react'
import MovieListItem from './MovieListItem'


const items=[]
const LatestUploads = () => {
  return (
        <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
             <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>

        <div className="space-y-3">
            {items.map((e,i)=>(
                <MovieListItem key={i} movie={e} />
            ))}
        </div>
    </div>
  )
}

export default LatestUploads