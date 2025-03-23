'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* <---- IMAGE ----> */
import Image from 'next/image'

/* <---- SCSS ----> */
import '../../styles/components/_cards.scss'

interface CardNFTProps {
    nome: string
    descricao: string
    preco: number | string 
    imagem: string
    imagemIcone: string
}

// 2. Tipando o componente com a interface
export default function CardNFT({ nome, descricao, preco, imagem, imagemIcone }: CardNFTProps) {
    const [adicionado, setAdicionado] = useState(false)

    const handleClick = () => {
        setAdicionado((prev) => !prev)
    }

    return (
        <div className='container-card'>
            <div className='nft-image'>
                <div className='nft-img'>
                    <Image
                        src={imagem}
                        alt="Produto"
                        width={200}
                        height={200}
                        className="nft"
                    />
                </div>
            </div>
            <div className='nft-inforrmacao'>
                <div className='nft-dados'>
                    <h1 className='nft-nome'>{nome}</h1>
                    <p className='nft-descricao'>{descricao}</p>
                    <div className='nft-compra'>
                        <div className='nft-preco'>
                            <Image
                                src={imagemIcone}
                                alt="Ícone"
                                width={30}
                                height={30}
                                className="Ethereum"
                            />
                            <h1>{preco}</h1>
                        </div>
                        <motion.button
                            className={`btn-comprar-adicionarCarrinho ${adicionado ? 'adicionado' : ''}`}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={handleClick}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={adicionado ? 'adicionado' : 'comprar'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {adicionado ? 'Adicionado ao carrinho' : 'Comprar'}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
