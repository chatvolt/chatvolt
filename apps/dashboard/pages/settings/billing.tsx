import AddIcon from '@mui/icons-material/Add';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Tab,Tabs } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import * as React from 'react';

import Admin from '@app/components/Admin';
import { AnalyticsContext } from '@app/components/Analytics';
import SettingsLayout from '@app/components/SettingsLayout';
import StripePricingTable from '@app/components/StripePricingTable';
import UserFree from '@app/components/UserFree';
import UserPremium from '@app/components/UserPremium';

import accountConfig from '@chatvolt/lib/account-config';
import { withAuth } from '@chatvolt/lib/withAuth';
import { Prisma, SubscriptionPlan } from '@chatvolt/prisma';


export default function BillingSettingsPage() {
  const router = useRouter();
  const { partner } = router.query;
  const [currentPartner, setCurrentPartner] = useState<string | undefined>(undefined);
  // Garante que 'partner' seja uma string ou undefined

  useEffect(() => {
    const partnerString = Array.isArray(partner) ? partner[0] : partner;
    if (partnerString) {
      // Salva o valor de partner no cookie
      Cookies.set('chatvolt-partner', partnerString);
      setCurrentPartner(partnerString);
    } else {
      // Recupera o valor do cookie se o parâmetro partner não estiver presente na URL
      const savedPartner = Cookies.get('chatvolt-partner');
      if (savedPartner) {
        setCurrentPartner(savedPartner);
      }
    }
  }, [partner]);

  const { data: session, status } = useSession();

  const handleClickManageSubscription = async () => {
    try {
      const { data } = await axios.post('/api/stripe/customer-portal');

      if (data) {
        router.push(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const currentPlan = accountConfig[session?.organization?.currentPlan!];

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!session?.organization) {
    return null;
  }

  return (
    <Stack>

      <UserFree>
        <Box mb={4}>
          <Card variant="outlined" sx={{ bgcolor: 'black' }}>
          <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="Pricing tables tabs"
              sx={{ 
                '.MuiTab-root': { color: 'grey' },
                '.Mui-selected': { color: 'white' }
              }}
            >
              <Tab label="USD" />
              <Tab label="BRL" />
            </Tabs>
            {value === 0 && <StripePricingTable currency="USD" pricetable={currentPartner} />}
            {value === 1 && <StripePricingTable currency="BRL" pricetable={currentPartner} />}
          </Card>
        </Box>
      </UserFree>

      <Stack
        gap={4}
        sx={(theme) => ({
          maxWidth: '100%',
          width: theme.breakpoints.values.md,
          mx: 'auto',
        })}
      >
        <FormControl id="plan" sx={{ gap: 1 }}>
          <FormLabel>Current Plan</FormLabel>
          {/* <Typography level="body-xs">
            Use the api key to access the Chatvolt API
          </Typography> */}

          <Card variant="outlined">
            <Typography
              level="h4"
              fontWeight={'bold'}
              color={
                currentPlan?.type === SubscriptionPlan?.level_0
                  ? 'warning'
                  : 'success'
              }
            >{`${currentPlan?.label}`}</Typography>

            <Stack width="100%" spacing={2} my={2}>
              <Divider></Divider>
              <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${currentPlan?.limits?.maxAgents} Agents`}</Typography>
              </Typography>
              <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${currentPlan?.limits?.maxDatastores} Datastores`}</Typography>
              </Typography>

              <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${
                  currentPlan?.limits?.maxAgentsQueries
                } message credits/month`}</Typography>
              </Typography>

              <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${
                  currentPlan?.limits?.maxStoredTokens / 1000000
                } Million words storage`}</Typography>
              </Typography>
              <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${
                  currentPlan?.limits?.maxFileSize / 1000000
                }MB File upload limit`}</Typography>
              </Typography>
              {/* <Typography
                level="title-md"
                startDecorator={<CheckRoundedIcon color="success" />}
              >
                <Typography>{`${currentPlan?.limits?.maxDataProcessing /
                  1000000}MB Data processing (embeddings) / month`}</Typography>
              </Typography> */}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <UserPremium>
              <Admin>
                <Button
                  onClick={handleClickManageSubscription}
                  endDecorator={<ArrowForwardRoundedIcon />}
                  variant="solid"
                  sx={{ ml: 'auto' }}
                  color="warning"
                >
                  Upgrade / Manage Subscription
                </Button>
              </Admin>
            </UserPremium>
          </Card>
        </FormControl>
      </Stack>
    </Stack>
  );
}

BillingSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

// export const getServerSideProps = withAuth(
//   async (ctx: GetServerSidePropsContext) => {
//     return {
//       props: {},
//     };
//   }
// );
