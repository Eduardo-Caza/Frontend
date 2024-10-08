import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Dashboard.css';
import Clientes from '../pages/Clientes';
import Reservas from '../pages/Reservas'; // Importamos el formulario de matriculas
import Vehiculos from '../pages/Vehiculos';

const Dashboard = () => {
    const [idUsuario, setIdUsuario] = useState(null);
    const [email, setEmail] = useState(null);
    const [nombre, setNombre] = useState('');
    const [mostrarFormularioMaterias, setMostrarFormularioMaterias] = useState(false);
    const [mostrarFormularioEstudiantes, setMostrarFormularioEstudiantes] = useState(false);
    const [mostrarFormularioMatriculas, setMostrarFormularioMatriculas] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const idUsuarioLocalStorage = localStorage.getItem('id_usuario');
        const emailLocalStorage = localStorage.getItem('email');
        const nombreLocalStorage = localStorage.getItem('nombre');

        if (!idUsuarioLocalStorage || !emailLocalStorage) {
            navigate('/ingresar');
        } else {
            setIdUsuario(idUsuarioLocalStorage);
            setEmail(emailLocalStorage);
            setNombre(nombreLocalStorage);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/ingresar');
    };

    const mostrarFormularioMateriasHandler = () => {
        setMostrarFormularioMaterias(true);
        setMostrarFormularioEstudiantes(false); // Ocultar el formulario de estudiantes
        setMostrarFormularioMatriculas(false); // Ocultar el formulario de matriculas
    };

    const mostrarFormularioEstudiantesHandler = () => {
        setMostrarFormularioMaterias(false); // Ocultar el formulario de materias
        setMostrarFormularioEstudiantes(true);
        setMostrarFormularioMatriculas(false); // Ocultar el formulario de matriculas
    };

    const mostrarFormularioMatriculasHandler = () => {
        setMostrarFormularioMaterias(false); // Ocultar el formulario de materias
        setMostrarFormularioEstudiantes(false); // Ocultar el formulario de estudiantes
        setMostrarFormularioMatriculas(true);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="header-title">SISTEMA GESTOR DE MATRICULAS</h1>
                <nav className="header-nav">
                    <button onClick={mostrarFormularioMateriasHandler} className="nav-link">CLIENTES</button>
                    <button onClick={mostrarFormularioEstudiantesHandler} className="nav-link">VEHÍCULOS</button>
                    <button onClick={mostrarFormularioMatriculasHandler} className="nav-link">RESERVAS</button>
                </nav>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-content">
                    <h2 className="welcome-message">Bienvenido, {nombre}</h2>
                    {mostrarFormularioMaterias && <Clientes />}
                    {mostrarFormularioEstudiantes && <Vehiculos />}
                    {mostrarFormularioMatriculas && <Reservas />} {/* Mostrar el formulario de matriculas */}
                </section>
            </main>
            <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" />
            </button>
        </div>
    );
};

export default Dashboard;
