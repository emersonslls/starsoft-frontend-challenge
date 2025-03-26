'use client';

import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/_cart.scss';

import SuccessBuyMessage from '@/app/components/Messages/sucessebuy';
import { useCart } from '../../hooks/useCart'; // Ajuste o caminho conforme necessário

interface CartProps {
    closeCart: () => void;
}

export default function Cart({ closeCart }: CartProps) {
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const { cartItems, removeFromCart, clearCart } = useCart();  // Desestruturando o hook useCart

    const handleClick = () => {
        setMostrarMensagem(true);

        // Esvaziar o carrinho
        clearCart();  // Usando o método clearCart do hook para esvaziar o carrinho

        setTimeout(() => {
            setMostrarMensagem(false);
            closeCart(); // Fecha o carrinho automaticamente
        }, 2500);
    };

    return (
        <>
            {/* Mensagem de Sucesso - fora do carrinho */}
            <SuccessBuyMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />

            <div className="cart">
                <div className="container-cart">
                    <div className="header-cart">
                        <button onClick={closeCart} className="btn-close">
                            <ArrowLeft size={28} strokeWidth={2} className="icon" />
                        </button>
                        <h1>Mochila de Compras</h1>
                    </div>

                    <section className="container-infoCompra">
                        <div className="container-itens">
                            {/* Exibindo os itens do carrinho */}
                            {cartItems.map(item => (
                                <div key={item.id}>
                                    <h3>{item.nome}</h3>
                                    <p>{item.quantidade} x {item.preco} ETH</p>
                                    <button onClick={() => removeFromCart(item.id)}>Remover</button>
                                </div>
                            ))}
                        </div>

                        <div className="total">
                            <h1>TOTAL</h1>
                            <h2>{cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0)} ETH</h2>
                        </div>

                        <motion.button
                            className="btn-finalizar"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={handleClick}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mostrarMensagem.toString()}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    FINALIZAR COMPRA
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </section>
                </div>
            </div>
        </>
    );
}
