
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import Chip from '@mui/joy/Chip';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useSWR from 'swr';

import { getOrganizations } from '@app/pages/api/organizations';

import accountConfig from '@chatvolt/lib/account-config';
import { fetcher } from '@chatvolt/lib/swr-fetcher';
import { Prisma, SubscriptionPlan } from '@chatvolt/prisma';


type Organization = {
  id: string;
  name: string;
  iconUrl: string;
  subscriptions: Subscription[];
}

type Subscription = {
  plan: SubscriptionPlan;
}


// Estilo para a modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #814dde',  // Cor da borda atualizada
  borderRadius: '10px',  // Cantos arredondados
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
  width: {
    xs: '80%', // Em telas pequenas (celulares), ocupa 80% da largura
    sm: '500px' // Em telas maiores, fixa em 500px
  }
};

const SelectOrganizationInput = () => {
  const [open, setOpen] = useState(false);
  const [isUpdatingSession, setIsUpdatingSession] = useState(false);
  const [manualOrgId, setManualOrgId] = useState('');  // Estado para o ID da organização manual
  const { data: organizations, error } = useSWR('/api/organizations', fetcher);
  const session = useSession();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectOrg = async (orgId: string) => {
    if (session?.data?.organization?.id === orgId) {
      handleClose(); // Fecha a modal e não faz nada se a organização já é a atual
      return;
    }
  
    try {
      setIsUpdatingSession(true);
  
      await session.update({ orgId });
  
      if (session?.data?.organization?.id !== orgId) {
        window.location.reload(); // Recarrega a página somente se a organização na sessão mudar
      }
    } catch (err) {
      console.error("Error updating organization in session:", err);
    } finally {
      setIsUpdatingSession(false);
      handleClose();
    }
  };

  const handleManualOrgIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualOrgId(event.target.value);
  };

  if (error) return <div>Failed to load organizations</div>;
  if (!organizations) return <CircularProgress />;

  return (
    <>
      <Button 
        onClick={handleOpen} 
        variant="outlined" 
        color="primary" 
        startIcon={<CorporateFareRoundedIcon />}
        sx={{
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          width: '100%',
          justifyContent: 'flex-start' // Alinha o conteúdo à esquerda
        }}
      >
        {session?.data?.organization?.name || 'Select Organization'}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="select-organization-modal"
        aria-describedby="select-organization-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            Choose the organization
          </Typography>

          <List>
            {organizations.map((org: Organization) => {
              const planKey = org?.subscriptions?.[0]?.plan;
              let planLabel = undefined;

              if (planKey && accountConfig?.hasOwnProperty(planKey)) {
                planLabel = accountConfig[planKey].label;
              }

              return (
                <ListItem button onClick={() => handleSelectOrg(org.id)} key={org.id}>
                  <Avatar src={`${org.iconUrl}?timestamp=${Date.now()}`} sx={{ mr: 2 }} />
                  <ListItemText primary={org.name} secondary="" />
                  {planLabel && (
                    <Chip size="sm" variant="outlined" color="primary" sx={{ ml: 'auto' }}>
                      {planLabel}
                    </Chip>
                  )}
                  {isUpdatingSession && <CircularProgress size="small" />}
                </ListItem>
              );
            })}
          </List>


        </Box>
      </Modal>
    </>
  );
};

export default SelectOrganizationInput;
