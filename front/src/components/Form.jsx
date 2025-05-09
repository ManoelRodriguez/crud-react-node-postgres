import { useState } from 'react'
import './Form.css'

export function Form({ onNewUser }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [idade, setIdade] = useState('')

    const handleSubmit = async (formData) => {
        const payload = {
            nome: formData.nome,
            email: formData.email,
            idade: Number(formData.idade),
        }

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error('Erro na requisição')

            const data = await response.json()
            console.log('Usuário criado:', data)

            onNewUser(data) // 👈 atualiza a lista no componente pai

            setNome('')
            setEmail('')
            setIdade('')
        } catch (error) {
            console.error('Erro ao enviar os dados:', error)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit({ nome, email, idade })
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                className="form-control"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
            />

            <button type='submit' className='btn btn-primary'>Enviar</button>
        </form>
    )
}
