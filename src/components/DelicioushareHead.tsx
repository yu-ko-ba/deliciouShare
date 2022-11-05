import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  title: string
  description?: string
  imageUrl?: string
  ogType?: "website" | "article"
  twitterCardType?: "app" | "summary_large_image" | "summary" | "player"
}

const DelicioushareHead = ({
  title,
  description = "おいしい！をシェアしよう",
  imageUrl = "https://raw.githubusercontent.com/tacg0909/deliciouShare/develop/images/icon_transparent.png",
  ogType = "article",
  twitterCardType,
}: Props) => {

  const router = useRouter()

  return (
    <Head>
      <meta name="theme-color" content="#bbdefb" />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`https://delicioushare.app${router.asPath}`} />
      {twitterCardType && (
        <>
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:card" content={twitterCardType} />
          <meta name="twitter:creator" content="@deliciouShare" />
        </>
      )}
    </Head>
  )
}

export default DelicioushareHead
