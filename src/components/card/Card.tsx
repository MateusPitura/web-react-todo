import React from "react";

const Card = ({ id, title, description, createDate, status, onDelete, onCompleting, onEdit }) => {
    return (
        <div>
            <div>
                - {title}
                - {description}
                - {createDate}
                - {status ? 'Concluída' : 'Pendente'}
            </div>
            <button onClick={() => onDelete(id)}>Excluir</button>
            <button onClick={() => onCompleting(id)}>Concluir</button>
            <button onClick={() => onEdit(id)}>Editar</button>
        </div>
    )
}

export default Card