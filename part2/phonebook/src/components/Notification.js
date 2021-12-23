const Notification = ({ message, state }) => {
    if (message === null){
        return null
    }

    if (state){
        return(
            <div className="success">
                {message}
            </div>
        )
    }
    return(
        <div className="error">
            {message}
        </div>
    )
}

export default Notification