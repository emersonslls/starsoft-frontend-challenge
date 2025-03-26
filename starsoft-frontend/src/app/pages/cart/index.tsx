import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { clearCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { CartItem } from '../../redux/cartSlice';  // Importe o tipo CartItem
import SuccessBuyMessage from '@/app/components/Messages/sucessebuy';
import '../../styles/pages/_cart.scss';

interface CartProps {
    closeCart: () => void;
}

export default function Cart({ closeCart }: CartProps) {
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const dispatch = useDispatch();

    // Acessando os itens do carrinho no Redux
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleClick = () => {
        setMostrarMensagem(true);
        dispatch(clearCart()); // Chamando a ação para limpar o carrinho

        setTimeout(() => {
            setMostrarMensagem(false);
            closeCart();
        }, 2500);
    };

    const total: number = cartItems.reduce((total: number, item: CartItem) => total + item.preco * item.quantidade, 0);

    return (
        <>
            <SuccessBuyMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />

            <div className="cart">
                <div className="container-cart">
                    <div className="header-cart">
                        <button onClick={closeCart} className="btn-close">
                            <ArrowLeft size={28} className="icon" />
                        </button>
                        <h1>Mochila de Compras</h1>
                    </div>

                    <section className="container-infoCompra">
                        <div className="container-itens">
                            {cartItems.map((item: CartItem) => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.nome} className="item-image" />
                                    <div className="item-info">
                                        <h3>{item.nome}</h3>
                                        <p>{item.descricao}</p>
                                        <div className="price-row">
                                            <span className="eth-icon">Ξ</span>
                                            <strong>{item.preco} ETH</strong>
                                        </div>
                                        <div className="quantity-control">
                                            <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                                            <span>{item.quantidade}</span>
                                            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                        </div>
                                    </div>
                                    <button className="btn-remove" onClick={() => dispatch(removeFromCart(item.id))}>
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="total">
                            <h1>TOTAL</h1>
                            <div className="preco-total">
                                <img src="/eth-icon.svg" alt="ETH" className="eth-icon" />
                                <h2>{total} ETH</h2>
                            </div>
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
