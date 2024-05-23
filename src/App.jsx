import { useState } from 'react'
import './App.css'
import initialContacts from './components/contacts.json';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import SearchBox from './components/SearchBox/SearchBox.jsx';


function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contact');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }

    return initialContacts;
  });
  const [searchQuery, setSearchQuery] = useState('');

  const addContact = (newContact) => {
    setContacts((prevConacts) => {
      return [...prevConacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevConacts) => {
      return prevConacts.filter((contact) => contact.id !== contactId);
    });
  };

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox handleSearch={handleSearch} />

      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}


export default App
