import './List.css'
import { useEffect, useState } from 'react'
import { Trash2, PencilLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function List() {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erro ao deletar usuário')
            }

            const data = await response.json()
            console.log('Usuário deletado:', data)

            setUsers(users.filter(user => user.id !== id))
        } catch (error) {
            console.error('Erro ao deletar usuário:', error)
        }
    }

    const openEditUser = (id) => {
        navigate(`/edit/${id}`)
    }

    useEffect(() => {
        fetch('http://localhost:3000/usuarios')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erro ao buscar usuários:', error))
    }, [])

    return (
        <table className='table table-hover border rounded-3'>
            <thead>
                <tr className='table-dark'>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Idade</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>{user.idade}</td>
                        <td className='icons'>
                            <Trash2 className='delete-icon' onClick={() => handleDeleteUser(user.id)} />
                            <PencilLine className='update-icon' onClick={() => openEditUser(user.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
