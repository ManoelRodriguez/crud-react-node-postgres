import { Trash2, PencilLine } from 'lucide-react'
import './List.css'

export function List({ users, setUsers }) {

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erro ao deletar usuário')
            }

            await response.json()
            console.log('Usuário deletado:', id)

            setUsers(users.filter(user => user.id !== id))
        } catch (error) {
            console.error('Erro ao deletar usuário:', error)
        }
    }

    const openEditUser = (id) => {
        navigate(`/edit/${id}`)
    }

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
