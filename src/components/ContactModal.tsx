import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, FormControl, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Oval } from 'react-loader-spinner';



export default function ContactModal() { 
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [fullName, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Validation schema 
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required().label('Nom et prénom'),
    email: Yup.string().required().email().label('Email'),
    phoneNumber: Yup.string().required().min(10).max(10).label('Numéro de téléphone'),
    message: Yup.string().required().label('Message'),
  });

  // HandleSubmit
  const handleSumbit = async (e: any) => {
    e.preventDefault();

    const form: any = document.getElementById('contact-form')
    
    // update loading state 
    setLoading(true);

    // Validating input
    const body = {
      fullName,
      email,
      phoneNumber,
      message,
    }

    const valid = await validationSchema.isValid(body);


    if(valid){
      try {
        const response: any = await fetch('http://localhost:3001/api/contact/contact-form', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        });
  
       const data = await response.json();

       console.log(data.data.message)

       if(data.success){
        setAlert(data.data.message);
        form.reset();
       }

       setError(data.data.message)
  
        setLoading(false)
        
      } catch (error: any) {
        console.log(error.message)
      }
    }

    setLoading(false)
  }

  return (
    <div>
      <Button onClick={handleOpen}
             variant='contained'
             size='large'
             sx={{
                 fontWeight: 700,
               }}
        >
            Contactez nous
        </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        <Container maxWidth='sm'>            
          <Box sx={( theme) => {
            return {
                position: 'absolute' as 'absolute',
                borderRadius: 2,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                [theme.breakpoints.down('sm')]: {
                    width: 300
                }
            }
          }}
          >
                <Typography
                    variant='h6'
                    textAlign='center'
                    paddingTop={3}
                    paddingLeft={3}
                    fontStyle='italic'
                >
                    “Un voyage de mille lieues commence toujours par un premier pas.” 
                </Typography>
                <Typography
                    variant='h6'
                    fontWeight={700}
                    textAlign='center'
                    fontStyle='italic'
                    paddingBottom={2}
                >
                    Lao tsu
                </Typography>
                <FormControl
                    fullWidth
                >
                    <TextField 
                        variant='outlined'
                        label='Nom et Prénom'
                        name='fullName'
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField 
                        variant='outlined'
                        label='Adresse Email'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField 
                        variant='outlined'
                        label='Numero de téléphone'
                        name='phoneNumber'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField 
                        variant='outlined'
                        multiline
                        rows={6}
                        label='Message'
                        name='message'
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                </FormControl>
                <Button
                    variant='contained'
                    sx={{
                        fontWeight: 700,
                    }}
                    onClick={handleSumbit}
                >   
                    {
                        loading ?

                        <Oval 
                            height={22}
                            width={22}
                            color='#fff'
                            secondaryColor='#fff'
                        />

                        :

                        "Envoyer"
                    }
                </Button>
          </Box>
        </Container>
        </Fade>
      </Modal>
    </div>
  );
}