import React, { useEffect,useState } from "react";
import {useRef} from 'react'; //import

function EditarUser() {
    const [user, setUser] = useState({});
    const nombreRef = useRef();
    const contraRef = useRef();
    
    useEffect(() => {
    const localStorageUser = localStorage.getItem("edit_user");
    setUser(JSON.parse(localStorageUser));
    console.log(user);
    }, []) ;

    const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue
  const nombre_mod = nombreRef.current.value; //esto va en la funcion de actualizar
  const contra_mod = contraRef.current.value;
  const data = {
    "query": user.username,
    "data": {
        "username": nombre_mod,
        "password": contra_mod,
    }
  
}
try {
    const response = await fetch('https://backend-9avm.onrender.com/api/editar', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result); // Manejar la respuesta del servidor
} catch (error) {
    console.error('Error fetching data:', error);
}
}
  return (
    <div>
      <h1>Editar Usuario</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder={"username: " + user.username} ref={nombreRef}/> 
        <input type="text" placeholder={"password: " + user.password} ref={contraRef}/> 
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
    
  );
}
export default EditarUser;