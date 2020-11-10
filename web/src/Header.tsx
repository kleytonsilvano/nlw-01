import React from 'react';

interface HeaderProps {
    title: string; // title? = string; Ponto de Interrogação diz que não é obrigatório
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;