import React, { useState } from 'react'



const Button = ({ onClick, text }) => ( 
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <>
  <p>{anecdote}</p>
  <p>has {votes} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [maxVotedQuote, setMaxVotedQuote] = useState(0)

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    let newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1 
    setVotes(newVotes)
    setMaxVotedQuote(newVotes.indexOf(Math.max(...newVotes)));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxVotedQuote]} votes={votes[maxVotedQuote]} />
    </div>
  )
}

export default App;
