import Card from '../UI/Card'
import classes from './AddUser.module.css'
import Button from '../UI/Button'
import { useState } from 'react'
import ErrorModal from '../UI/ErrorModal'

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')
  const [error,setError]=useState();
  const addUserHandler = (event) => {
    event.preventDefault()
    if(enteredUsername.trim().length===0 ||enteredAge.trim().length===0){
        return setError({
            title:"Invalid Input", message:"Enter any input."
        })
    };
    if(+enteredAge<1){
        return setError({
            title:"Invalid Age", message:"Enter an appropriate age (age>1)."
        })
    };
    props.onAddUser(enteredUsername,enteredAge);
    setEnteredAge('');
    setEnteredUsername('');
  }
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value)
  }
  const errorHandler =()=>{
    setError(null);
  }
  return (
    <div>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">
          Username
        </label>
        <input id="username" value={enteredUsername} onChange={usernameChangeHandler} type="text"></input>
        <label htmlFor="age" >
          Age(Years)
        </label>
        <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  )
}

export default AddUser
