import './styles.css';

import React from 'react';
import { PostCard } from '../PostCard/PostCard';

export const Posts = ({posts}) => {
  return(
    <section className='grid-post'>
      <div className='posts'>
        {posts.map((post) => (
          <PostCard 
            key = {post.id}
            id = {post.id}
            title = {post.title}
            url = {post.url}
            price = {post.price}
            ammount= {post.ammount}
            product = {post}
          />
        ))}    
      </div>
    </section>
  )
};