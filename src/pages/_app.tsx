import Amplify, { Auth } from 'aws-amplify'
import { CognitoUser } from "@aws-amplify/auth"
import awsconfig from "../aws-exports";
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import DelicioushareSnackbar from '../components/DelicioushareSnackbar';
import { useRouter } from 'next/router';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme from '../theme';
import DelicioushareAppbar from '../components/DelicioushareAppbar';
import AppbarBackButtonOrToRootLink from '../components/AppbarBackButtonOrToRootLink';
import DelicioushareMenu from '../components/DelicioushareMenu';
import ShareButton from '../components/ShareButton';

Amplify.configure(awsconfig)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const [user, setUser] = useState<CognitoUser>()
  const getCurrentUser = () => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        setUser(user)
      })
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err)
        }
      })
  }

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
          ) {
            return <Typography variant="h6">deliciouShare.app</Typography>
          }
          return <AppbarBackButtonOrToRootLink />
        })()}
        <Box sx={{ flexGrow: 1 }} />
        {router.pathname === "/[postId]" && (
          <ShareButton openFailureSnackbar={openFailureSnackbar} />
        )}
        <DelicioushareMenu
          user={user}
          getCurrentUser={getCurrentUser}
        />
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
