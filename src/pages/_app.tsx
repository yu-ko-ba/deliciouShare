import Amplify from 'aws-amplify'
import awsconfig from "../aws-exports";
import type { AppProps } from 'next/app'

Amplify.configure(awsconfig)

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
