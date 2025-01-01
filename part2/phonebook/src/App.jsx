import {useEffect, useState} from 'react'
import personService from "./services/personService.js";
import './index.css'


const App = () => {

    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [normalMessage, setNormalMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        console.log('effect')
        personService
            .getAll()
            .then(data => {
                console.log('promise fulfilled')
                setPersons(data)
                setFilteredPersons(data)
            })
    }
    console.log(persons)
    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject={
            name: newName,
            phone: newPhone,
            id: (persons.length+1).toString()
        }

        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            const oldId = existingPerson.id
            if(window.confirm(newName + ' is already added to the phonebook, replace the old number with a new one?') === false){
                return null
            }else {
                personService.update(oldId, personObject)
                    .then(data => {
                        setNormalMessage('Updated ' + newName)
                        setTimeout(() => {
                            setNormalMessage(null)
                        }, 5000)
                        setPersons(persons.map(person => person.id !== oldId ? person : data))
                        setFilteredPersons(filteredPersons.map(person => person.id !== oldId ? person : data))
                        setNewName('')
                        setNewPhone('')
                    })
                    .catch(error => {
                        setErrorMessage('Information of ' + persons.find(person => person.id === oldId).name + ' has already been removed from the server')
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(response => {
                    setNormalMessage('Added ' + newName)
                    setTimeout(() => {
                        setNormalMessage(null)
                    }, 5000)
                    setPersons(persons.concat(response))
                    setFilteredPersons(persons.concat(response))
                    setNewName('')
                    setNewPhone('')
                })
        }



    }

    const handleNameChange = (event) => {

        setNewName(event.target.value)

    }

    const HandleDelete = (id) => {
        if(window.confirm('Delete ' + persons.find(person => person.id === id).name + '?') === false){
            return null
        }else {
            try {
                personService
                    .erase(id)
                    .then(response => {
                        console.log(response)
                        // Fetch the updated list of persons
                        personService
                            .getAll()
                            .then(data => {
                                setPersons(data)
                                setFilteredPersons(data)
                            })
                    })
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setNormalMessage('Information of ' + persons.find(person => person.id === id).name + ' has already been removed from the server')
            }
        }
    }

    const handlePhoneChange= (event)=>{
        setNewPhone(event.target.value)
    }

    const [searchName, setSearchName] = useState('')

    const handleSearchChange = (event) => {
        const searchValue = event.target.value
        setSearchName(searchValue)
        setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())))
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification  message={normalMessage} />
            <ErrorNotification message={errorMessage} />
            <Filter searchName={searchName} handleSearchChange={handleSearchChange}></Filter>
            <h3>Add a new</h3>
            <Form addPerson={addPerson} handleNameChange={handleNameChange} newPhone={newPhone} newName={newName}
                  handlePhoneChange={handlePhoneChange}></Form>
            <h2>Numbers</h2>
            <Numbers filteredPersons={filteredPersons} HandleDelete = {HandleDelete}></Numbers>
        </div>
    )

}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="errornotification">
            {message}
        </div>
    )
}

const Form = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => {
    return(
        <div>
            <form onSubmit={addPerson}>
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
                <input
                    value={newPhone}
                    onChange={handlePhoneChange}
                />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

const Filter = ({ searchName, handleSearchChange }) => {
    return (
        <div>
            <input
                value={searchName}
                onChange={handleSearchChange}
            />
        </div>
    )
}

const Numbers = ({ filteredPersons, HandleDelete }) => {
    return (
        <div>
            <ul>
                {filteredPersons.map(person => (
                    <div key={person.id}>
                        {person.name} {person.phone}
                        <button onClick={() => HandleDelete(person.id)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default App