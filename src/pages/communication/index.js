import { useState } from 'react';

import { Container, Paper } from '../../../node_modules/@mui/material/index';


const emails = [
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
];

export default function Communication() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleItemClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div style={{ display: 'flex' }}>
      <EmailList emails={emails} onItemClick={handleItemClick} />
      {selectedEmail && <EmailDetail email={selectedEmail} />}
    </div>
  );
}


const EmailList = ({ emails, onItemClick }) => {
  return (
    <Container size="sm">
      {emails.map((email) => (
        <Paper
          key={email.id}
          onClick={() => onItemClick(email)}
          style={{ cursor: 'pointer', marginBottom: 16 }}
        >
          <p size="sm">{email.subject}</p>
        </Paper>
      ))}
    </Container>
  );
};


const EmailDetail = ({ email }) => {
  return (
    <Container size="sm">
      <Paper>
        <p size="xl">{email.subject}</p>
        <p size="sm">From: {email.sender}</p>
        <p size="sm">Date: {email.date}</p>
        <p size="lg">{email.body}</p>
      </Paper>
    </Container>
  );
};
