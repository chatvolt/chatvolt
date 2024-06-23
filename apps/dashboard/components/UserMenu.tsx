import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

function UserMenu() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const email = session?.user?.email;
    const confirmMessage = email ? `Do you want to log out of the account ${email}?` : "Do you want to log out?";
    
    if (window.confirm(confirmMessage)) {
      setLoading(true);
      try {
        await signOut({ redirect: false });
        window.location.href = '/signin';
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >

      <Button
        variant="outlined"
        size="sm"
        sx={{
          width: '100%',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis', // Adiciona "..." se o texto exceder o tamanho do botão
          fontSize: '0.75rem',
          textAlign: 'left',
          justifyContent: 'flex-start'
        }}
        onClick={handleLogout}
        startDecorator={
          <Avatar
            size="sm"
            src={session?.user?.image || ''}
            sx={{ ':hover': { cursor: 'pointer' } }}
          />
        }
      >
        {session?.user?.email}
      </Button>

      </Stack>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default UserMenu;
