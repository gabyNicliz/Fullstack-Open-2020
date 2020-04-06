import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

  // props.good == 1
  // props.neutral == 0
  // props.bad == -1
const Average = (props) =>
  ((props.good + (props.neutral * 0) - props.bad) / props.amountOfReviews).toFixed(1)
  

// Percentage of good reviews
const Positive = (props) => ((100 / props.amountOfReviews) * props.good).toFixed(1)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [amountOfReviews, setAmount] = useState(0)

  const giveGoodFeedback = () => {
    setGood(good + 1)
    setAmount(amountOfReviews + 1)
  }
  const giveNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAmount(amountOfReviews + 1)
  }
  const giveBadFeedback = () => {
    setBad(bad + 1)
    setAmount(amountOfReviews + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        handleClick={giveGoodFeedback}
        text='good' 
      />
      <Button
        handleClick={giveNeutralFeedback}
        text='neutral'
      />
      <Button
        handleClick={giveBadFeedback}
        text='bad'
      />
      <h1>statistics</h1>
      <table>
        <tr>good {good}</tr>
        <tr>neutral {neutral}</tr>
        <tr>bad {bad}</tr>
        <tr>all {amountOfReviews}</tr>
        <tr>average {
          <Average 
              good={good} 
              neutral={neutral} 
              bad={bad} 
              amountOfReviews={amountOfReviews} 
            />
          }
        </tr>
        <tr>positive {
          <Positive
            good={good}
            amountOfReviews={amountOfReviews}/>
          } %
        </tr>
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

