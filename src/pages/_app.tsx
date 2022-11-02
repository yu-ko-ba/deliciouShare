import Amplify from 'aws-amplify'
import awsconfig from "../aws-exports";
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import DelicioushareSnackbar from '../components/DelicioushareSnackbar';
import { useRouter } from 'next/router';
import { Box, IconButton, ThemeProvider, Typography } from '@mui/material';
import theme from '../theme';
import DelicioushareAppbar from '../components/DelicioushareAppbar';
import AppbarBackButtonOrToRootLink from '../components/AppbarBackButtonOrToRootLink';
import { Share } from '@mui/icons-material';
import DelicioushareMenu from '../components/DelicioushareMenu';

Amplify.configure(awsconfig)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("")
  const [successSnackbarOpenFlag, setSuccessSnackbarOpenFlag] = useState(false)
  const [failureSnackbarMessage, setFailureSnackbarMessage] = useState("")
  const [failureSnackbarOpenFlag, setFailureSnackbarOpenFlag] = useState(false)

  const openSuccessSnackbar = (message: string) => {
    setSuccessSnackbarMessage(message)
    setSuccessSnackbarOpenFlag(true)
  }
  const openFailureSnackbar = (message: string) => {
    setFailureSnackbarMessage(message)
    setFailureSnackbarOpenFlag(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <DelicioushareAppbar>
        {(() => {
          if (
            router.pathname === "/sign-in"
            || router.pathname === "/sign-up"
            || router.pathname === "/forgot-password"
          ) {
            return <Typography variant="h6">deliciouShare.app</Typography>
          }
          return <AppbarBackButtonOrToRootLink />
        })()}
        <Box sx={{ flexGrow: 1 }} />
        {router.pathname === "/[postId]" && (
          <IconButton color="inherit">
            <Share />
          </IconButton>
        )}
        <DelicioushareMenu />
      </DelicioushareAppbar>
      <Component
        openSuccessSnackbar={openSuccessSnackbar}
        openFailureSnackbar={openFailureSnackbar}
        {...pageProps}
      />
      <DelicioushareSnackbar
        message={successSnackbarMessage}
        openFlag={successSnackbarOpenFlag}
        setOpenFlag={setSuccessSnackbarOpenFlag}
      />
      <DelicioushareSnackbar
        message={failureSnackbarMessage}
        openFlag={failureSnackbarOpenFlag}
        setOpenFlag={setFailureSnackbarOpenFlag}
        severity="error"
      />
    </ThemeProvider>
  )
}

export default MyApp
