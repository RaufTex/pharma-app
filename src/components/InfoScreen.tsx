import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useUsersContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { RiUserShared2Line } from 'react-icons/ri';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import formattedDate from '../services/formattedDate';

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const avatarStyle = {
  width: '150px',
  height: '150px',
  marginTop: '-80px',
  left: '30%',
};

interface UseParamsProps {
  id: string;
}

export default function InfoScreen() {
  const { openModal, handleModal, results } = useUsersContext();

  let params = useParams<UseParamsProps>();

  const userToShow = results.filter(user => user.login.uuid === params.id);

  useEffect(() => {
    params.id && handleModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLink(link: string) {
    navigator.clipboard.writeText(`http://localhost:3000/${link}`);
    alert('Compartilhado com sucesso!');
  }

  return (
    <div>
      <Modal open={openModal} onClose={() => handleModal(false)}>
        <>
          {userToShow.map(user => {
            return (
              <Box sx={boxStyle}>
                <IconButton
                  aria-label='close'
                  onClick={() => handleModal(false)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'black',
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Avatar sx={avatarStyle} src={user.picture.large} alt='img' />
                <Typography
                  align='center'
                  id='modal-modal-title'
                  variant='h6'
                  component='h2'
                  sx={{ fontSize: '34px' }}
                >
                  {`${user.name.first} ${user.name.last}`}
                </Typography>
                <Typography align='center' sx={{ fontSize: 12 }}>
                  {user.email}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Gênero:</strong>{' '}
                  {user.gender === 'male' ? 'Masculino' : 'Feminino'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Data de Nascimento:</strong>{' '}
                  {formattedDate(user.dob.date)}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Telefone:</strong> {user.phone}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Nacionalidade:</strong> {user.nat}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Endereço:</strong>
                  {`${user.location.street.name},${user.location.street.number} - ${user.location.city}-${user.location.state}`}
                </Typography>
                <Button sx={{ mt: 2 }} onClick={() => getLink(user.login.uuid)}>
                  <RiUserShared2Line size={18} />
                  Compartilhar
                </Button>
              </Box>
            );
          })}
        </>
      </Modal>
    </div>
  );
}
