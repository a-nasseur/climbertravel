import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Container, FormControl, Stack, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Oval } from 'react-loader-spinner';
import { useFormik } from 'formik';
import ErrorMessage from './Form/ErrorMessage';
import { fr } from 'yup-locales';



export default function ContactModal() { 
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  Yup.setLocale(fr);

  // Validation schema 
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required().label('Nom et prénom'),
    email: Yup.string().required().email().label('Email'),
    phoneNumber: Yup.string().required().min(10).max(10).label('Numéro de téléphone'),
    message: Yup.string().required().label('Message'),
  });

  // Formik 
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
        const response: any = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contact/contact-form`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const data = await response.json();
      
      if(!data.success){
        console.log(data);
        setLoading(false);
        resetForm();
      }
      
      if(data.success){
        setLoading(false);
        setMessage(data.data.message);
        setAlert(true);
      }
    }
  });

  // HandleSubmit
  // const handleSumbit = async (e: any) => {
  //   e.preventDefault();

  //   const form: any = document.getElementById('contact-form')
    
  //   // update loading state 
  //   setLoading(true);

  //   // Validating input
  //   const body = {
  //     fullName,
  //     email,
  //     phoneNumber,
  //     message,
  //   }

  //   const valid = await validationSchema.isValid(body);


  //   if(valid){
  //     try {
  //       const response: any = await fetch('https://climbertravel/api/contact/contact-form', {
  //         method: 'POST',
  //         headers: {
  //           'content-type': 'application/json'
  //         },
  //         body: JSON.stringify(body)
  //       });
  
  //      const data = await response.json();

  //      console.log(data.data.message)

  //      if(data.success){
  //       // setAlert(data.data.message);
  //       form.reset();
  //      }

  //      setError(data.data.message)
  
  //       setLoading(false)
        
  //     } catch (error: any) {
  //       console.log(error.message)
  //     }
  //   }

  //   setLoading(false)
  // }

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
        sx={{ overflow: 'auto'}}
      >
        <Fade in={open}>
        <Container maxWidth='md'>            
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
                    variant='body1'
                    textAlign='center'
                    paddingTop={3}
                    paddingLeft={3}
                    fontStyle='italic'
                >
                    “Un voyage de mille lieues commence toujours par un premier pas.” 
                </Typography>
                <Typography
                    variant='subtitle2'
                    fontWeight={700}
                    textAlign='center'
                    fontStyle='italic'
                    paddingBottom={2}
                >
                    Lao tsu
                </Typography>
                  <FormControl fullWidth >
                    <TextField 
                      label='Nom et Prénom'
                      id="fullName"
                      type="text"
                      {...formik.getFieldProps('fullName')}
                      sx={{ marginBottom: 2 }}
                    />
                    {
                      formik.touched.fullName && 
                      (
                        <ErrorMessage error={formik.errors.fullName} />    
                      ) 
                    }
                    <TextField 
                      label='Email'
                      id="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                      sx={{ marginBottom: 2 }}
                    />
                    {
                      formik.touched.email  ? 
                      (
                        <ErrorMessage error={formik.errors.email} />    
                      ) 
                        : 
                      null
                    }
                    <TextField 
                      label='Numero de téléphone'
                      id="phoneNumber"
                      type="text"
                      {...formik.getFieldProps('phoneNumber')}
                      sx={{ marginBottom: 2 }}
                    />
                    {
                      formik.touched.phoneNumber  ? 
                      (
                        <ErrorMessage error={formik.errors.phoneNumber} />
                      ) 
                        : 
                      null
                    }
                    <TextField 
                      label='Message'
                      id="message"
                      type="text"
                      multiline
                      rows={6}
                      {...formik.getFieldProps('message')}
                      sx={{ marginBottom: 2 }}
                      
                    />
                    {
                      formik.touched.message  ? 
                      (
                      <ErrorMessage error={formik.errors.message} />        
                      ) 
                        : 
                      null
                    }
                  </FormControl>
                  <Button
                      component='button'
                      variant='contained'
                      type='submit'
                      sx={{
                          fontWeight: 700,
                      }}
                      onClick={formik.handleSubmit}
                  >   
                    {
                      loading ?

                      <Oval 
                          height={22}
                          width={22}
                          color='#000'
                          secondaryColor='#000'
                      />

                      :

                      "Envoyer"
                    }
                  </Button>
                  {
                    alert && 
                    <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                      <Alert onClose={() => setAlert(false)}>Message envoye avec success</Alert>
                    </Stack>
                  }
            </Box>
        </Container>
        </Fade>
      </Modal>
    </div>
  );
}