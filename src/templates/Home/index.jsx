import './styles.css';

import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

//my components
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { ButtonMore } from '../../components/Button/ButtonMore';
import { TextInput } from '../../components/NavBar/TextInput';
import { Categoria } from '../../components/NavBar/Categoria';
import { ButtonCart } from '../../components/NavBar/ButtonCart';
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import SloganGreenPet from '../../assets/slogan_greenpet.svg';
import Instagram from '../../assets/instagram.svg';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  
  /* Renderizar posts filtrados */
  const filteredPosts = searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase(
          searchValue
        )
      );
    })
  : posts;

  const filteredCategoryPosts = categoryValue ? 
    allPosts.filter(post => {
      return post.category.includes(
        categoryValue
      );
    })
  : posts;

  /* Renderiza os posts */
  const handleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);

  /* Carregar mais produtos */
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) =>{
    const { value } = e.target;
    setSearchValue(value);
  }
  
  const handleCategoryChange = (e) =>{
    const { value } = e.target;
    setCategoryValue(value);
  }

  return (
    <>
    <Helmet>
      <title>Loja GreenPet</title>
    </Helmet>
    <section className='container'>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
        <div className='search-container'>
          <TextInput searchValue={searchValue} handleChange={handleChange}/>
        </div>
        <div className='login-cart'>
          <Link to='/login' className='button-login' >
            <ButtonUser 
              text="Crie sua conta"
            />
          </Link>
          <Link to='/cart' className='button-cart'>
            <ButtonCart/>
          </Link>
        </div>
      </div>  
        
      <div className='nav-bar'>
        <Categoria
          text="Cachorros"
          categoryValue="Cachorros"
          handleChange={handleCategoryChange}
        />
        <Categoria
          text="Gatos"
          categoryValue="Gato"
          handleChange={handleCategoryChange}
        />
        <Categoria
          text="Pássaros"
          categoryValue="Pássaros"
          handleChange={handleCategoryChange}
        />
        <Categoria
          text="Peixes"
          categoryValue="Peixes"
          handleChange={handleCategoryChange}
        />
        <Categoria
          text="Répteis"
          categoryValue="Répteis"
          handleChange={handleCategoryChange}
        />
        <Categoria
          text="Roedores"
          categoryValue="Roedores"
          handleChange={handleCategoryChange}
        />
      </div>   
        {!filteredCategoryPosts.length && (
          <Posts posts={ filteredCategoryPosts }/>
        )}

        {filteredPosts.length > 0 && (
          <Posts posts={ filteredPosts }/>
        )}
          
        {filteredPosts.length === 0 && ( 
          <div className='status-search'>
            <b>
              Lamentamos, nenhum produto encontrado com esse critério de pesquisa.
            </b>
            <p>
              Tente novamente com outro termo para sua busca...
            </p>
          </div>
        )}

      <div className='button-container'>
        <ButtonMore 
          text="Mostrar mais"
          onClick={loadMorePosts}
          disabled={noMorePosts}
        />
      </div>    
      <footer>
        <div className="footer-top">
          <div className="infos">
            <Link to='/'>
              <img src={SloganGreenPet} alt="greenpet" className='slogan'/>
            </Link>

            <div className='footer-contato'>
              <p>Contato: lojagreenpet@gmail.com</p>
            </div>
          </div>
          <div className='footer-fornecedor'>
            <Link to='/Login'>
              <button className='button-fornecedor'>
                TORNE-SE FORNECEDOR
              </button> 
            </Link>  
          </div>
        </div>

        <div className="footer-botton">
          <p>© 2022 Copyright: GreenPet</p>

          <div className="footer-social">
            <p>REDES SOCIAIS:</p>
            <a href="https://www.instagram.com/lojagreenpet_/">
              <img src={Instagram} alt="greenpet"/>
            </a>
          </div>
        </div>
      </footer>
    </section>
    </>
  );
}