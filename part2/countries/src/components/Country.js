import React from 'react';

const Country = ({country}) => {
    console.log('printing country');
    return(
        <li>
            {country.name}
        </li>
    )
}

export default Country;