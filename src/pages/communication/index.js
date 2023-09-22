import { useMemo, useState } from 'react';

import { Container, Paper, Box } from '../../../node_modules/@mui/material/index';
import TableInlineCRUD from 'components/tables/mrt/TableInlineCrud';
import { useGetEmails, useDeleteEmailMutation } from 'api/hooks/communication';

const emails = [
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
  },
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
  },
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
  },
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
  },
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
  },
  {
    id: 1,
    subject: 'Hello',
    sender: 'sender@example.com',
    date: '2023-09-22',
    body: 'This is the email body...',
  },
  {
    id: 2,
    subject: 'world',
    sender: 'hh@gs.com',
    date: '2023-09-22',
    body: 'This is the em..',
  },
  {
    id: 4,
    subject: 'Hello',
    sender: 'sd@sd.com',
    date: '2023-09-22',
    body: 'This is the y...',
  },
  {
    id: 3,
    subject: 'Hello',
    sender: 'sender@24.com',
    date: '2023-09-22',
    body: 'This is the sdgs...',
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

  const [emailClick, setEmailClicked] = useState()

  // const handleEmailClick = () => {
  //   setEmailClicked(!emailClick)
  // }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 50
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
      },

    ], [
      
    ]
  )

  const [selectedRow, setSelectedRow] = useState();
  console.log(selectedRow);
  return (
    
    <>
      <Box sx={{ width: '1000px'}}>
        <TableInlineCRUD 
          useGetItems={useGetEmails}
          setSelectdRow={setSelectedRow}
          dataName='communications'
          columns={columns}
          deleteMutate={useDeleteEmailMutation}
        />
      </Box>

      <EmailDetail email={selectedRow}/>
    </>
  );
};


const EmailDetail = ({email}) => {
  console.log(email);
  return (
    email ?
    <Container size="sm">
      <Paper  className="email-box-detail">
        <p size="xl" className='email-subject'>{email.subject}</p>
        <p size="sm" className='email-sender'>From: {email.from.email}</p>
        <p size="sm" className='email-date'>Date: {email.created_at}</p>
        <hr/>
        <p size="lg">{email.content}</p>
      </Paper>
    </Container>
    : <></>
  );
};
