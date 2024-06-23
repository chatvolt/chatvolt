import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Button,
  Chip,
  ColorPaletteProp,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/joy';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ProductType } from '@app/hooks/useProduct';

import { appUrl } from '@chatvolt/lib/config';
import { AppStatus, RouteNames } from '@chatvolt/lib/types';
import DarkModeToggle from '@chatvolt/ui/DarkModeToggle';

import AccountCard from '../AccountCard';
import UserMenu from '../UserMenu';

export type AppLink =
  | {
      label: string;
      route: RouteNames;
      icon: JSX.Element;
      active: boolean;
      isNew: boolean;
      isExperimental?: undefined;
    }
  | {
      label: string;
      route: RouteNames;
      icon: JSX.Element;
      active: boolean;
      isExperimental: boolean;
      isNew: boolean;
    };

function NavigationLink(props: {
  href: string;
  target?: string;
  active?: boolean;
  icon?: React.ReactNode;
  label?: string | React.ReactElement;
  isExperimental?: boolean;
  isNew?: boolean;
}) {
  return (
    <Link key={props.href} href={props.href} target={props?.target}>
      <ListItem>
        <ListItemButton
          variant={props.active ? 'soft' : 'plain'}
          color={props.active ? 'primary' : 'neutral'}
        >
          <ListItemDecorator
            sx={{ color: props.active ? 'inherit' : 'neutral.500' }}
          >
            {props.icon}
          </ListItemDecorator>
          <ListItemContent>{props.label}</ListItemContent>

          <Stack direction="row" alignItems={'center'} sx={{ ml: 'auto' }}>
            {props.isNew && (
              <Chip
                className="text-white bg-gradient-to-r from-orange-500 via-red-500 to-red-500"
                size="sm"
              >
                new
              </Chip>
            )}

            {props.isExperimental && (
              <Chip
                className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                size="sm"
              >
                beta
              </Chip>
            )}
          </Stack>
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default function ExpandedNavigation({
  product,
  appLinks,
  settingLinks,
  docLinks,
  publicRuntimeConfig,
  status,
}: {
  product: ProductType;
  appLinks: AppLink[];
  settingLinks: AppLink[];
  docLinks: AppLink[];
  status: AppStatus | undefined;
  publicRuntimeConfig: Record<string, unknown> & { version?: string };
}) {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <>
      <Stack
        className="h-full px-4 overflow-y-auto"
        bgcolor="background.surface"
      >
        <List size="sm" sx={{ '--ListItem-radius': '8px' }}>
          <Stack
            direction="row"
            width="100%"
            gap={1}
            justifyContent="space-between"
            justifyItems="center"
            paddingTop={1}
            paddingBottom={1}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <div className="relative w-5 h-5 mt-[0.5px] flex justify-center ">
                <Image layout="fill" src="/logo.png" alt="Chatvolt" />
              </div>
              <Typography level="title-md">Chatvolt</Typography>
            </Stack>
            <DarkModeToggle variant="plain" color="neutral" />
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <ListItem nested>
            {!!session?.user?.id && (
                <Head>
                <script
                  id="chatbox"
                  type="module"
                  dangerouslySetInnerHTML={{
                    __html: `
                    import Chatbox from 'https://cdn.jsdelivr.net/npm/@chatvolt/embeds@latest/dist/chatbox/index.js';
                    try {
                    
                      const widget = await Chatbox.initBubble({
                        agentId: 'clw0wuhp6000hpbgjnpivm3ni',
                        
                        contact: {
                          userId: '${session?.user?.id}',
                          firstName: '${session?.user?.name || ''}',
                          email: '${session?.user?.email}',
                        },
                        
                        isInitMessagePopupDisabled: true,
                        initialMessages: [
                          'Hello, <strong>${
                            session?.user?.name || session?.user?.email || ''
                          }</strong> 👋',
                          'Frank here, how can I help you today?',
                        ],
  
                      });
  
                    } catch (error) {
                      console.log(error)
                    }
                    `,
                  }}
                />
              </Head>
            )}

            <List
              aria-labelledby="nav-list-browse"
              sx={{
                '& .JoyListItemButton-root': { p: '8px' },
              }}
            >
              {appLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={each.active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}

              {docLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={(each as any).active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}

              {settingLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={each.active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}
              



              {/* {(['chatvolt', 'cs', 'chat'] as ProductType[]).includes(
                product
              ) && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, mb: 1, ml: 1, fontStyle: 'italic' }}
                  >
                    Other Products
                  </Typography>

                  {(['chatvolt', 'cs'] as ProductType[]).includes(product) && (
                    <Stack spacing={1}>
                      <Link
                        href={
                          process.env.NODE_ENV === 'production'
                            ? 'https://chat.chatvolt.ai/chat'
                            : 'http://chat.localhost:3000/chat'
                        }
                      >
                        <Button
                          sx={{ width: '100%' }}
                          className="font-title"
                          color="neutral"
                          variant="soft"
                          startDecorator={<ChatRoundedIcon fontSize="sm" />}
                        >
                          Search Assistant
                        </Button>
                      </Link>
                    </Stack>
                  )}
                  {(['chat'] as ProductType[]).includes(product) && (
                    <Link
                      href={
                        process.env.NODE_ENV === 'production'
                          ? `${appUrl}/agents`
                          : 'http://localhost:3000/agents'
                      }
                    >
                      <Button
                        sx={{ width: '100%' }}
                        color="neutral"
                        variant="soft"
                        endDecorator={
                          <Chip
                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            size="sm"
                            sx={{
                              color: 'white',
                            }}
                          >
                            new
                          </Chip>
                        }
                      >
                        Chatvolt Agents
                      </Button>
                    </Link>
                  )}

                  <Divider sx={{ my: 2 }} />
                </>
              )} */}


            </List>
          </ListItem>
        </List>

        <AccountCard />

        <Divider sx={{ my: 1 }} />
        
        <UserMenu />

        <Divider sx={{ my: 1 }} />

        <Stack gap={1}>
          <Stack direction="row" justifyContent={'center'} gap={1}>
            <Link href="https://twitter.com/chatvolt" target="_blank">
              <IconButton variant="plain" size="sm" color="neutral">
                <TwitterIcon />
              </IconButton>
            </Link>
            <Link
              href="https://www.linkedin.com/company/chatvolt"
              target="_blank"
            >
              <IconButton variant="plain" size="sm" color="neutral">
                <LinkedInIcon />
              </IconButton>
            </Link>
            <Link
              href="http://www.youtube.com/channel/UCcykx3LviF5onaiM7_hKZNA?sub_confirmation=1"
              target="_blank"
            >
              <IconButton variant="plain" size="sm" color="neutral">
                <YoutubeIcon />
              </IconButton>
            </Link>

          </Stack>
          <Link href="mailto:support@chatvolt.ai" className="mx-auto">
            <Typography level="body-sm" mx={'auto'}>
              support@chatvolt.ai
            </Typography>
          </Link>

          <Stack direction="row" sx={{ justifyContent: 'center', gap: 1 }}>
            <Chip color="neutral" variant="soft">
              {publicRuntimeConfig?.version}
            </Chip>

            {status && (
              <Link
                href={'https://status.chatvolt.ai/'}
                target={'_blank'}
                className={!open ? 'fixed bottom-2' : ''}
              >
                <Chip
                  color={
                    (
                      {
                        [AppStatus.OK]: 'success',
                        [AppStatus.WARNING]: 'warning',
                        [AppStatus.KO]: 'danger',
                      } as Record<AppStatus, ColorPaletteProp>
                    )[status]
                  }
                  variant="soft"
                  sx={{ cursor: 'pointer' }}
                  endDecorator={<ArrowForwardRoundedIcon />}
                >
                  <Stack direction="row" alignItems={'center'} gap={1}>
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '99px',
                        // bgcolor: isStatusOK ? 'success.300' : 'danger.500',
                        ...(status === AppStatus.OK && {
                          bgcolor: 'success.300',
                        }),
                        ...(status === AppStatus.KO && {
                          bgcolor: 'danger.500',
                        }),
                        ...(status === AppStatus.WARNING && {
                          bgcolor: 'warning.500',
                        }),
                      }}
                    />

                    <Typography level="body-sm">system status</Typography>
                  </Stack>
                </Chip>
              </Link>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

      </Stack>
      {<Divider orientation="vertical" />}
    </>
  );
}
