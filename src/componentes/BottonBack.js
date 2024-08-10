import React from "react";
import { useNavigate } from "react-router-dom";
import './BottonBack.css';  

const BottonBack = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); //Navega para a página anterior
    };
    return (
        <div className="button-container"> 
            <button onClick={handleGoBack}>
                Voltar
            </button>
        </div>
    );
};

export default BottonBack;