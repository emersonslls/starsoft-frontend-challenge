import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { clearCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { CartItem } from '../../redux/cartSlice';  // Importe o tipo CartItem
import SuccessBuyMessage from '@/app/components/Messages/sucessebuy';
import ErrorBuyMessage from '@/app/components/Messages/errorbuy';
import '../../styles/pages/_cart.scss';

import imageIcone from '../../../../public/assets/Icons/Ethereum.svg';
import imageIconeDelete from '../../../../public/assets/Icons/Delete.svg';
import Image from 'next/image';

interface CartProps {
    closeCart: () => void;
    finalizePurchase: () => void;
}

export default function Cart({ closeCart, finalizePurchase }: CartProps) {
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mostrarErro, setMostrarErro] = useState(false); // Estado para mensagem de erro
    const dispatch = useDispatch();

    // Acessando os itens do carrinho no Redux
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Contador de itens no carrinho
    const [addToCartCount, setAddToCartCount] = useState<number>(0);

    // Estado do botão (finalizar ou finalizado)
    const [estadoBotao, setEstadoBotao] = useState<'finalizar' | 'finalizado'>('finalizar');

    // Calcular o total de itens
    const calculateAddToCartCount = () => {
        const count = cartItems.reduce((total: number, item: CartItem) => total + item.quantidade, 0);
        setAddToCartCount(count);
    };

    useEffect(() => {
        calculateAddToCartCount();
    }, [cartItems]);

    const handleClick = () => {
        if (cartItems.length === 0) {
            // Exibir mensagem de erro se o carrinho estiver vazio
            setMostrarErro(true);
            return; // Não prosseguir com a compra
        }

        // Alterar o estado do botão para 'finalizado' após a compra ser concluída
        setEstadoBotao('finalizado');
        // Limpar o carrinho
        dispatch(clearCart());

        // Exibir mensagem de sucesso por um tempo
        setMostrarMensagem(true);
        setTimeout(() => {
            setMostrarMensagem(false);
            closeCart(); // Fechar o carrinho após 2,5 segundos
        }, 2500);
    };

    const handleClearCart = () => {
        // Disparar ação para limpar o carrinho
        dispatch(clearCart());
        finalizePurchase(); // Chama a função para zera o contador
    };

    const total: number = cartItems.reduce((total: number, item: CartItem) => total + item.preco * item.quantidade, 0);

    return (
        <>
            <AnimatePresence>
                {mostrarMensagem && (
                    <SuccessBuyMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />
                )}
                {mostrarErro && (
                    <ErrorBuyMessage show={mostrarErro} onClose={() => setMostrarErro(false)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                <motion.div
                    className="cart"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    aria-live="assertive"
                    role="dialog"
                    aria-labelledby="cart-header"
                >
                    <div className="container-cart">
                        <div className="header-cart">
                            <button
                                onClick={closeCart}
                                className="btn-close"
                                aria-label="Fechar carrinho"
                            >
                                <ArrowLeft size={28} className="icon" />
                            </button>
                            <h1 id="cart-header">Mochila de Compras</h1>
                        </div>

                        <section className="container-infoCompra">
                            <div className="container-itens" aria-labelledby="cart-items">
                                <div className="cart-item" id="cart-items">
                                    {cartItems.map((item: CartItem) => (
                                        <div className="item" key={item.id}>
                                            <Image
                                                src={item.image}
                                                alt={item.nome}
                                                className="item-image"
                                                width={100}
                                                height={100}
                                            />
                                            <div className="item-info">
                                                <div className="item-dados">
                                                    <h3>{item.nome}</h3>
                                                    <p>{item.descricao}</p>
                                                </div>
                                                <div className="price-row">
                                                    <Image
                                                        src={imageIcone}
                                                        alt="Ícone Ethereum"
                                                        width={30}
                                                        height={30}
                                                        className="Ethereum"
                                                    />
                                                    <strong>{item.preco} ETH</strong>
                                                </div>
                                                <div className='quantity-btn'>
                                                    <div className="quantity-control">
                                                        <button
                                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                                            aria-label={`Diminuir quantidade de ${item.nome}`}
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.quantidade}</span>
                                                        <button
                                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                                            aria-label={`Aumentar quantidade de ${item.nome}`}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="btn-remove"
                                                        onClick={() => dispatch(removeFromCart(item.id))}
                                                        aria-label={`Remover ${item.nome} do carrinho`}
                                                    >
                                                        <Image
                                                            src={imageIconeDelete}
                                                            alt="Ícone Lixeira"
                                                            width={30}
                                                            height={30}
                                                            className="Delete"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="total" aria-live="polite">
                                <h1>TOTAL</h1>
                                <div className="preco-total">
                                    <Image
                                        src={imageIcone}
                                        alt="Ícone Ethereum"
                                        width={30}
                                        height={30}
                                        className="Ethereum"
                                    />
                                    <h2>{total} ETH</h2>
                                </div>
                            </div>

                            <motion.button
                                className={`btn-finalizar ${estadoBotao === 'finalizado' ? 'finalizado' : ''}`}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={handleClick}
                                aria-label="Finalizar compra"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={estadoBotao}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {estadoBotao === 'finalizar' ? 'FINALIZAR COMPRA' : 'COMPRA FINALIZADA!'}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            <div className="contador-itens">
                                <p>Itens no carrinho: {addToCartCount}</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
