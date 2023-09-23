import { useMemo, useState } from 'react';

import { Container, Paper, Box } from '../../../node_modules/@mui/material/index';
import TableInlineCRUD from 'components/tables/mrt/TableInlineCrud';
import { useGetEmails, useDeleteEmailMutation } from 'api/hooks/communication';


export default function Communication() {
  const [selectedEmail, setSelectedEmail] = useState(null);


  const handleItemClick = (email) => {
    setSelectedEmail(email);
  };


  return (
    <div style={{ display: 'flex' }}>
      <EmailList onItemClick={handleItemClick} />
      {selectedEmail && <EmailDetail email={selectedEmail} />}
    </div>
  );
}


const EmailList = ({onItemClick }) => {

  const [emailClick, setEmailClicked] = useState()

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
