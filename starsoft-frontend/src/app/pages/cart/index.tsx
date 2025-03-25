import React from 'react';
import { ArrowLeft } from "lucide-react";
import '../../styles/pages/_cart.scss';

interface CartProps {
    closeCart: () => void;
}

export default function Cart({ closeCart }: CartProps) {
    return (
        <div className="cart">
            <div className="container-cart">
                <div className='header-cart'>
                    <button onClick={closeCart} className='btn-close'>
                        <ArrowLeft size={28} strokeWidth={2} className='icon' />
                    </button>
                    <h1>Mochila de Compras</h1>
                </div>
            </div>
        </div>
    )
}
