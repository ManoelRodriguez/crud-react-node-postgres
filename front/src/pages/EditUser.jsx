import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../components/Form.css';
import './EditUser.css'

export function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ nome: '', email: '', idade: '' });

    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error('Erro ao buscar usuário:', err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }

            const data = await response.json();
            console.log('Usuário atualizado:', data);

            navigate('/');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    return (
        <div className='edit-user'>
            <h2 className='edit-title'>Atualizar Usuário</h2>
            <form onSubmit={handleSubmit} className='edit-form'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    value={user.nome}
                    onChange={(e) => setUser({ ...user, nome: e.target.value })}
                />
                <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Idade"
                    value={user.idade}
                    onChange={(e) => setUser({ ...user, idade: e.target.value })}
                />

                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
}
