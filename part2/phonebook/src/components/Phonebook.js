import Person from './Person'

const Phonebook = ({ persons, deleteFromBook }) => {
    return (
        <ul>
            {persons.map(person => 
                <Person person = {person} key = {person.id} deleteFromBook={() => deleteFromBook(person.id)} />
            )}
        </ul>
    )
}

export default Phonebook