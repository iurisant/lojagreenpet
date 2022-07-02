import './styles.css';

import React from 'react';
import { PostCard } from '../PostCard/PostCard';

export const Posts = ({ posts }) => {
  return(
    <section className='grid-post'>
      <div className='posts'>
        {posts.map((post) => (
          <PostCard 
            key = {post.idProduto}
            id = {post.idProduto}
            title = {post.nome}
            url = {post.imagem}
            price = {post.valor_Uni}
            ammount= {post.quantidade}
            category={post.categoria}
            product = {post}
          />
        ))}    
      </div>
    </section>
  )
};