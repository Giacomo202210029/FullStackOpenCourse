import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0]);



    const [selected, setSelected] = useState(0)

    const [best, setBest] = useState(0)

    function RandomNumber(){
        setSelected(Math.floor(Math.random()* (8)));
    }

    function AddScore(position){
        const newScore = [...score];
        newScore[position]++;
        setScore(newScore);
    }

    function MoreVotesThan(){
        for(let i= 0; i<=7; i++){
            if (score[i]> score[best]){
                setBest(i)
            }
        }
    }

    MoreVotesThan();

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <h3>{anecdotes[selected]}</h3>
            <button onClick={() => AddScore(selected)}>Vote</button>
            <button onClick={RandomNumber}>click</button>
            <h5>{score[selected]}</h5>
            <h1>Anecdote with Most Votes</h1>
            <h3>{anecdotes[best]}</h3>
            <h3>Score {score[best]}</h3>
        </div>
    )
}

export default App