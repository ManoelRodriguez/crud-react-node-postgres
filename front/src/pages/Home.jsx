import { useEffect, useState } from 'react'
import { List } from '../components/List'
import { Form } from '../components/Form'
import './Home.css'

export function Home() {
    const [users, setUsers] = useState([])

    // Carrega os usuários uma vez ao montar
    useEffect(() => {
        fetch('http://localhost:3000/usuarios')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Erro ao buscar usuários:', err))
    }, [])

    return (
        <div className='container'>
            <div className='input-section'>
                <Form onNewUser={(user) => setUsers(prev => [...prev, user])} />
            </div>

            <div className='list-section'>
                <List users={users} setUsers={setUsers} />
            </div>
        </div>
    )
}
