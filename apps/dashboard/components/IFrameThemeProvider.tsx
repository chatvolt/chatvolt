import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/joy/CssBaseline';
import {
  CssVarsProvider,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/joy/styles';
import React from 'react';

import { theme, themeKeys } from '@app/utils/themes/iframe-widget';

const cache = createCache({
  key: 'chatvolt-chat-iframe',
  prepend: true,
  speedy: true,
});

function IFrameThemeProvider(props: any) {
  const { emotionCache = cache } = props as any;

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={emotionCache}>
        <CssVarsProvider theme={theme} defaultMode="light" {...themeKeys}>
          <CssBaseline enableColorScheme />
          {props.children}
        </CssVarsProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default IFrameThemeProvider;
