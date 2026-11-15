import { useState, useEffect } from "react";
import PuntoCard from "./components/PuntoCard";
import "./App.css";

const API_URL = "http://localhost:8080/api/puntos";

function App() {

    const [puntos, setPuntos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("");
    const [material, setMaterial] = useState("");
    const [capacidad, setCapacidad] = useState("");

    function cargarPuntos() {
        fetch(API_URL, { method: "GET" })
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                setPuntos(datos);
            });
    }

    useEffect(function () {
        cargarPuntos();
    }, []);

    async function guardar(evento) {
        evento.preventDefault();

        let datos = {
            nombre: nombre,
            sector: sector,
            material: material,
            capacidad: parseInt(capacidad)
        };

        try {
            let respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (respuesta.ok) {
                let nuevo = await respuesta.json();
                setPuntos([...puntos, nuevo]);
                setNombre("");
                setSector("");
                setMaterial("");
                setCapacidad("");
            }
        } catch (err) {
            console.log("Error al guardar:", err.message);
        }
    }

    return (
        <div className="contenedor">
            <h1>Sistema de Puntos de Reciclaje Urbano</h1>

            <section className="formulario">
                <h2>Registrar Punto</h2>
                <form onSubmit={guardar}>
                    <div className="campo">
                        <label>Nombre</label>
                        <input type="text" value={nombre}
                            onChange={function (e) { setNombre(e.target.value); }} required />
                    </div>
                    <div className="campo">
                        <label>Sector</label>
                        <input type="text" value={sector} placeholder="Barrio o ubicación..."
                            onChange={function (e) { setSector(e.target.value); }} required />
                    </div>
                    <div className="campo">
                        <label>Material</label>
                        <input type="text" value={material} placeholder="Plástico, Vidrio, Papel..."
                            onChange={function (e) { setMaterial(e.target.value); }} required />
                    </div>
                    <div className="campo">
                        <label>Capacidad (unidades)</label>
                        <input type="number" min="1" value={capacidad}
                            onChange={function (e) { setCapacidad(e.target.value); }} required />
                    </div>
                    <button type="submit">Registrar Punto</button>
                </form>
            </section>

            <section className="inventario">
                <h2>Puntos Registrados</h2>
                <div className="cuadricula">
                    {puntos.map(function (punto) {
                        return <PuntoCard key={punto.id} punto={punto} />;
                    })}
                </div>
            </section>
        </div>
    );
}

export default App;
