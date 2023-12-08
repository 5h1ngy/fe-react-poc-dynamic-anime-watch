import React from 'react';
import './NeonText.css'; // Importa il file di stile CSS per l'effetto neon

const NeonText = ({ text }) => {
    return (
        <div className="neon-container">
            <span className="neon-text">{text}</span>
        </div>
    );
};

export default NeonText;
