import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function GuessingGameForm(props) {
  const [answer, setAnswer] = useState(0);
  const [guess, setGuess] = useState(null);

  useEffect(() => {

    if (guess === null) {
      setGuess(
       JSON.parse(localStorage.getItem("amountGuessed") || 0)
      )
    }
  }, [])


  function headings() {
    return "I am thinking of a number between 1 and 100. Guess the Lucky Number!"
  }

  function deleteNumber() {

    localStorage.removeItem ("randomNum");
    localStorage.removeItem ("amountGuessed")
    setGuess(null);
    props.onDelete(null)
  }


  function handleSubmit(event) {
    event.preventDefault()
    props.onLuckyNumber(answer)
    localStorage.setItem("amountGuessed", JSON.stringify(guess+1))
    setGuess(guess + 1)
  }

  return (
    <Stack gap={3} className="col-md-10 mx-auto">
      <h2>{headings()}</h2>
      <p>Number of Guesses: {guess}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Control type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} name="luckyNumber" />
          <Button type="submit" size='lg'>Guess</Button>
          <br />
          <br />
        </Form.Group>
      </Form>
      <Form onSubmit={deleteNumber}>
        <Form.Group className="mb-3" >
          <Button type="submit" variant='danger' size="lg">Reset</Button>
        </Form.Group>
      </Form>
    </Stack>
  )
}

export default GuessingGameForm