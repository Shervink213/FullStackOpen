import Person from './Person'

const Phonebook = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => 
                <Person person = {person} key = {person.id} />
            )}
        </ul>
    )
}

export default Phonebook