import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import './Crud.css';

function Component() {
    const [data, setData] = useState([]); // Estado para almacenar los datos

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://backend-9avm.onrender.com/api/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                setData(result); // Guardar los datos en el estado
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = async (usuario) => {
        console.log('editar', usuario);
        localStorage.setItem('edit_user', JSON.stringify(usuario));
        window.location = '/edit';
    }
    const handleDelete = async (username) => {
        try {
            const response = await fetch('https://backend-9avm.onrender.com/api/borrar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                alert(`Usuario ${username} eliminado con éxito`);
                // Actualizar la tabla eliminando el usuario del estado
                setData(data.filter((item) => item.username !== username));
            } else {
                alert('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="crud-container">
            <div className="crud-content">
                <h1>CRUD</h1>
                <p className="crud-description">Bienvenido! Aqui Puedes: Modificar, Eliminar y Gestionar Usuarios!!</p>
                
                <div className="crud-section">
                    <Formulario /> {/* Componente de formulario para crear nuevos usuarios */}
                </div>
                
                <div className="crud-section">
                    <h2>Lista de Usuarios</h2>
                    <div className="table-container">
                        <table className="crud-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        <td className="action-buttons">
                                            <button 
                                                className="delete-button"
                                                onClick={() => handleDelete(item.username)}
                                            >
                                                Eliminar
                                            </button>
                                            <button 
                                                className="edit-button"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;