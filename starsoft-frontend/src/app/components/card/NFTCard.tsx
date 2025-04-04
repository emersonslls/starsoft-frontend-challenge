'use client';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CartItem } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';

import '../../styles/components/_cards.scss';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from "lucide-react";

import imageIcone from '../../../../public/assets/Icons/Ethereum.svg';

import SuccessMessage from '../Messages/success';

// Definir o tipo das props do CardNFT
interface CardNFTProps {
  name: string;
  description: string;
  price: string | number;
  image: string;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const formatarPreco = (preco: string | number) => {
  const precoNumerico = typeof preco === 'string' ? parseFloat(preco) : preco;
  return precoNumerico % 1 === 0 ? precoNumerico.toFixed(0) : precoNumerico.toFixed(2); // Verifica se é inteiro
};

const CardNFT = ({ name, description, price, image, setCartCount }: CardNFTProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const [estadoBotao, setEstadoBotao] = useState<'comprar' | 'adicionar'>('comprar');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleClick = () => {
    if (estadoBotao === 'comprar') {
      setEstadoBotao('adicionar');
    } else if (estadoBotao === 'adicionar') {
      const item: CartItem = {
        id: `${name}-${Math.random()}`,  // Garante um ID único
        nome: name,
        preco: typeof price === 'string' ? parseFloat(price) : price,
        quantidade: 1,
        descricao: description,
        image: image,
      };
      dispatch(addToCart(item));
      setCartCount((prev) => prev + 1);
      setMostrarMensagem(true);

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
            loading="lazy" 
            onClick={() => setMostrarModal(true)} // Ao clicar na imagem, abre o modal
            style={{ cursor: 'pointer' }}
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

            <motion.button
              className={`btn-comprar-adicionarCarrinho ${estadoBotao === 'adicionar' ? 'adicionado' : ''}`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleClick}
              aria-label="Adicionar ao carrinho"
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

            {/* Exibição da mensagem de sucesso */}
            <SuccessMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMostrarModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="close-button" onClick={() => setMostrarModal(false)}>
                <ArrowLeft size={28} className="icon" />
              </button>
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                unoptimized 
                loading="lazy" 
                className='nft-card'/>
              <div className='dados'>
                <h2>{name}</h2>
                <p>{description}</p>
              </div>
              <div className='preco'>
                <Image
                  src={imageIcone}
                  alt="Ícone Ethereum"
                  width={30}
                  height={30}
                  className="Ethereum"
                />
                <p>{formatarPreco(price)} ETH</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CardNFT;
