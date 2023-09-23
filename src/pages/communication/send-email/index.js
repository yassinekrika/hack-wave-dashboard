import React from 'react'
import { Dialog, Group, TextInput, Textarea, Autocomplete } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks' 

import { useSendEmail } from 'api/hooks/communication';

import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Flex,
    Menu,
    Text,
    Title,
    Tooltip,
  } from "@mantine/core";

  import { useFormik } from "formik";
  


const SendEmail = () => {

    const sendEmail = useSendEmail()
    
    const formik = useFormik({
        initialValues: {
            to_Id: '', 
            subject: '',
            content: ''
        },
        onSubmit: async (values) => {
          await sendEmail.mutateAsync(values);
        },
      });
    
  
    return (
    <>
    <Text style={{ display: 'flex', justifyContent: 'center'}} size="xl" mb="xs" fw={500}>
      Send Email
    </Text>

    <Group style={{ display: 'flex', flexDirection: 'column' }}>
      <Autocomplete
        sx={{ width: '400px'}}
        label="Reciever Email"
        name='to_id'
        onChange={formik.handleChange}
        placeholder="Pick value or enter anything"
        data={['React@email.com', 'Angular@email.com', 'Vue@email.com', 'Svelte@email.com']}
      />
      <TextInput 
        sx={{ width: '400px'}} 
        placeholder="subject" 
        name='subject'
        onChange={formik.handleChange}
        label="Subject" />
      <Textarea
        sx={{ width: '400px'}}
        label="Body"
        placeholder="Input your body"
        name='content'
        onChange={formik.handleChange}
      />
      <Button onClick={formik.submitForm} loading={formik.isSubmitting} sx={{width: '400px'}}>Send</Button>
    </Group>
  </>
  )
}

export default SendEmail