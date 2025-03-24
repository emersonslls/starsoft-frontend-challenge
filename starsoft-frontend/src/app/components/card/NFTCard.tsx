'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import '../../styles/components/_cards.scss';

import SuccessMessage from '../Messages/success';

interface CardNFTProps {
    nome: string;
    descricao: string;
    preco: number | string;
    imagem: string;
    imagemIcone: string;
    setCartCount: Dispatch<SetStateAction<number>>;
}

export default function CardNFT({
    nome,
    descricao,
    preco,
    imagem,
    imagemIcone,
    setCartCount,
}: CardNFTProps) {
    const [estadoBotao, setEstadoBotao] = useState<'comprar' | 'adicionar'>('comprar');
    const [mensagemSucesso, setMensagemSucesso] = useState(false);

    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    const handleClick = () => {
        if (estadoBotao === 'comprar') {
            setEstadoBotao('adicionar');
        } else if (estadoBotao === 'adicionar') {
            setCartCount((prevCount) => prevCount + 1);
            setMostrarMensagem(true);

            // Oculta a mensagem após 2.5 segundos
            setTimeout(() => {
                setMostrarMensagem(false);
                setEstadoBotao('comprar');
            }, 2500);
        }
    };

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

    return (
        <div className="container-card">
            <div className="nft-image">
                <div className="nft-img">
                    <Image src={imagem} alt="Produto" width={200} height={200} className="nft" />
                </div>
            </div>
            <div className="nft-inforrmacao">
                <div className="nft-dados">
                    <h1 className="nft-nome">{nome}</h1>
                    <p className="nft-descricao">{descricao}</p>
                    <div className="nft-compra">
                        <div className="nft-preco">
                            <Image
                                src={imagemIcone}
                                alt="Ícone"
                                width={30}
                                height={30}
                                className="Ethereum"
                            />
                            <h1>{formatarPreco(preco)} ETH</h1>
                        </div>

                        {/* BOTÃO */}
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

                        {/* MENSAGEM DE SUCESSO */}
                        <SuccessMessage show={mostrarMensagem} onClose={() => setMostrarMensagem(false)} />

                    </div>
                </div>
            </div>
        </div>
    );
}
