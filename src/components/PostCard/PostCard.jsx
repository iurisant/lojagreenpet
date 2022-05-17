import './styles.css';

//my components
import { ButtonAddCart } from './ButtonAddCart';
import { toast } from 'react-toastify';

export const PostCard = ({id, title, url, price, ammount}) => {

  toast.configure()

  const Notify = () =>{
    toast.success('Teste de notificação')
  }

  const noMoreStock = ammount < 1;
  let text;

  if(noMoreStock){
    text = "Produto indisponível"
  }else{
    text = "Adicionar ao carrinho"
  }

  return(
    <div className='post' id={id}>
      <img src={url} alt={title} className='img-post'/>
      <div className='post-content'>
        <h1>{title}</h1>
        <b>R${price.replaceAll('.',',')}</b>
        <p>ou 3x R${((price/3).toFixed(2)).replaceAll('.',',')} s/ juros</p>
        <p>Produtos disponíveis: {ammount}</p>
        <ButtonAddCart
            onClick={Notify}
            disabled={noMoreStock}
            text={text}
        />
      </div>
    </div>
  )
};  
