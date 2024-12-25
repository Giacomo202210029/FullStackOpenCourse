import { useState } from 'react'

const StatisticLine = ({text, value}) =>{
    return(
        <div>
            <h5>{text}: {value}</h5>
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {


    if ((good + neutral + bad) === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>

            <table>

                <tr>
                    <td><StatisticLine text="Good" value={good}/></td>
                </tr>
                <tr>
                    <td><StatisticLine text="Neutral" value={neutral}/></td>
                </tr>
                <tr>
                    <td><StatisticLine text="Bad" value={bad}/></td>
                </tr>
                <tr>
                    <td><StatisticLine text="All" value={good + neutral + bad}/></td>
                </tr>
                <tr>
                    <td><StatisticLine text="Average" value={(good - bad) / (good + neutral + bad)}/></td>
                </tr>
                <tr>
                    <td><StatisticLine text="Positive" value={(good / (good + neutral + bad)) * 100}/></td>
                </tr>

            </table>
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
            <Button handleClick={() => setNeutral(good + 1)} text="Neutral"></Button>
            <Button handleClick={() => setBad(good + 1)} text="Bad"></Button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App