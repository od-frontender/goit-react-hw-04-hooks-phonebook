import { useState, useEffect } from 'react';
import Form from './components/Form';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Container from 'components/Container';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts' ?? [])),
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    if (contacts.some(contact => contact.name.includes(data.name))) {
      return alert(`${data.name} is already in contacts!`);
    }

    setContacts([...contacts, data]);
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value.toLocaleLowerCase());
  };

  const onFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter),
    );
  };
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      {contacts.length !== 0 && (
        <Filter filter={filter} onChangeFilter={changeFilter} />
      )}
      {filter === '' ? (
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      ) : (
        <ContactList contacts={onFilter()} deleteContact={deleteContact} />
      )}
    </Container>
  );
}

export default App;
