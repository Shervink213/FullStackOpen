import React from 'react'

const Find = ({find, handleFind}) => {
    return(
        <form>
            <div>
                <label>Find country</label>
                <input value = {find} onChange={handleFind} />
            </div>
        </form>
    )
}

export default Find