import React, { useEffect, useState } from "react";
import '../../styles/components/loading.scss';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Define um tempo de 3 segundos para o carregamento
        const timer = setTimeout(() => {
            setIsLoading(false); // Após 3 segundos, o carregamento é finalizado
        }, 3000);

        // Limpeza do timer ao desmontar o componente
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='loadingContainer'>
            {isLoading && (
                <>
                    <div className='spinner'></div>
                    <h1>Carregando as NFTs...</h1>
                </>
            )}
        </div>
    );
};

export default LoadingScreen;
