import React, { useState } from 'react';
import './App.css';

function TextField({label, value, setValue}: {label: string, value: string, setValue: (value: string) => void}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <label>{label}: </label>
      <input type="text" name="firstName" value={value} onChange={onChange}/>
      <br/><br/>
    </>
  )
}

function App() {
  const [firstName, setFirstName] = useState(''); // takes the initial value of the state variable as an argument
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // const [firstName, setFirstName] = useState(() => setDefaultFirstName()); 
  
  // const [prevFirstName, setPrevFirstName] = useState('');
  // const [prevLastName, setPrevLastName] = useState('');
  // const [prevEmail, setPrevEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // no refresh
    console.log('test');
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>  
        <TextField
          label='firstName'
          value={firstName}
          setValue={setFirstName}
        />
        <TextField
          label='lastName'
          value={lastName}
          setValue={setLastName}
        />
        <TextField
          label='email'
          value={email}
          setValue={setEmail}
        />
        <input type="submit" value="Submit" />      
      </form>

      <br/>
      <br/>

      <div className="result">
        <p> First name: {firstName}  </p>
        <p> Last name: {lastName} </p>
        <p> Email: {email}</p>
      </div>
    </div>
  );
}

export default App;
