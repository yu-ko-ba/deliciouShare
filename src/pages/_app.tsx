import Amplify from 'aws-amplify'
import awsconfig from "../aws-exports";
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import DelicioushareSnackbar from '../components/DelicioushareSnackbar';

Amplify.configure(awsconfig)

const MyApp = ({ Component, pageProps }: AppProps) => {
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
    <>
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
    </>
  )
}

export default MyApp
