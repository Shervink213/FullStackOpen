import React from 'react'

const Person = ({ person, deleteFromBook }) => {
	return (
        <li>
            {person.name} {person.number}
            <button onClick={deleteFromBook}> delete </button>
        </li>
		
	)
}

export default Person