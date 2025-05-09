import { List } from '../components/List'
import { Form } from '../components/Form'
import './Home.css'

export function Home() {
    return (
        <div className='container'>

            <div className='input-section'>
                <Form />
            </div>

            <div className='list-section'>
                <List />
            </div>
        </div>
    )
}