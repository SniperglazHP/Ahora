import React, { useState } from "react";

function Formulario() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que la página se recargue
        try {
            const response = await fetch("http://localhost:3000/api/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

           
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Formulario;