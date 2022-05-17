import './styles.css';

import React from 'react';
import { PostCard } from '../PostCard/PostCard';

export const Posts = ({posts}) => ( 
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
        />
      ))}    
    </div>
  </section>
);