import React from 'react';
import { Box, Button, Container, Grid, Typography, styled } from '@mui/material';
import ContactModal from './ContactModal';

type Props = {
    backgroundImage?: string;
}


const Header = ({ backgroundImage }: Props) => {
   
  const HeaderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
  }));

  return (
    <HeaderContainer>
        <Container maxWidth='lg' sx={{ paddingTop: 20 }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ backgroundColor: 'rgba(0, 0, 0, .5)', padding: 3, borderRadius: 2}}>
                    <Typography
                        variant='body1'
                        fontWeight={700}
                        gutterBottom
                        color='#fff'
                        
                    >
                        Site en construction
                    </Typography>
                    <Typography
                        component='span'
                        variant='h3'
                        letterSpacing={3}
                        fontWeight={700}
                        color='#fff'
                    >
                        Climber
                    </Typography>
                    <Typography
                        component='span'
                        variant='h3'
                        color='primary'
                    >
                        Travel
                    </Typography>
                    <Typography
                        variant='body1'
                        lineHeight={1.3}
                        paddingY={3}
                        color='#fff'

                    >
                        Préparez-vous à embarquer pour des aventures inoubliables avec nous ! 
                        Notre équipe d'experts en voyage, remplis de passion pour l'exploration, 
                        travaille dur pour sélectionner des destinations de rêve, 
                        élaborer des itinéraires sur mesure et concevoir des expériences inoubliables
                        qui vous laisseront sans voix. Que vous recherchiez une escapade relaxante à
                        la plage, une aventure en plein air palpitante ou un 
                        voyage culturellement enrichissant, nous avons tout prévu. 
                        Restez à l'écoute pour notre lancement officiel et soyez parmi les
                        premiers à explorer le monde avec nous. Bon voyage !            
                    </Typography>
                    <ContactModal />
                </Grid>
            </Grid>
        </Container>
           
    </HeaderContainer>
  )
}

export default Header