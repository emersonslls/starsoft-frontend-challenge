import { motion, AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/hooks/useCart';  // Corrija o caminho conforme necessário

// Importando o ícone de Ethereum
import imageIcone from '../../../../public/assets/Icons/Ethereum.svg';
import '../../styles/components/_cards.scss';
import SuccessMessage from '../Messages/success';

interface CardNFTProps {
  name: string;
  description: string;
  price: number | string;
  image: string;
  setCartCount: Dispatch<SetStateAction<number>>;  // Adicionando setCartCount aqui
}

const formatarPreco = (preco: number | string) => {
  if (typeof preco === 'number') {
    return preco % 1 === 0 ? preco.toString() : preco.toFixed(2);
  }
  const valor = parseFloat(preco);
  return isNaN(valor)
    ? preco
    : valor % 1 === 0
    ? valor.toString()
    : valor.toFixed(2);
};

export default function CardNFT({
  name,
  description,
  price,
  image,
  setCartCount,  // Usando setCartCount aqui
}: CardNFTProps) {
  const { addToCart } = useCart();  // Usando o hook useCart
  const [estadoBotao, setEstadoBotao] = useState<'comprar' | 'adicionar'>('comprar');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  const handleClick = () => {
    if (estadoBotao === 'comprar') {
      setEstadoBotao('adicionar');
    } else if (estadoBotao === 'adicionar') {
      addToCart({
        id: name,  // Usando o 'name' como ID (ou você pode usar um ID único)
        nome: name,
        preco: typeof price === 'string' ? parseFloat(price) : price, // Garantindo que o preco seja sempre um número
        quantidade: 1,
      });
      
      setCartCount((prev) => prev + 1);  // Atualiza o contador de itens no carrinho
      setMostrarMensagem(true);

      // Oculta a mensagem após 2.5 segundos
      setTimeout(() => {
        setMostrarMensagem(false);
        setEstadoBotao('comprar');
      }, 2500);
    }
  };

  return (
    <div className="container-card">
      <div className="nft-image">
        <div className="nft-img">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className='nft'
            unoptimized
          />
        </div>
      </div>
      <div className="nft-info">
        <div className="nft-dados">
          <h1 className="nft-nome">{name}</h1>
          <p className="nft-descricao">{description}</p>
          <div className="nft-compra">
            <div className="nft-preco">
              <Image
                src={imageIcone}
                alt="Ícone Ethereum"
                width={30}
                height={30}
                className="Ethereum"
              />
              <h1>{formatarPreco(price)} ETH</h1>
            </div>

            {/* Botão */}
            <motion.button
              className={`btn-comprar-adicionarCarrinho ${estadoBotao === 'adicionar' ? 'adicionado' : ''}`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleClick}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={estadoBotao}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -1 }}
                  transition={{ duration: 0.3 }}
                >
                  {estadoBotao === 'comprar' ? 'Comprar' : 'Adicionar ao carrinho'}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mensagem de Sucesso */}
            <SuccessMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
