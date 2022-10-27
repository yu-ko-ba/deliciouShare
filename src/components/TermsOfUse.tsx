import { Link, Typography } from "@mui/material"
import NextLink from "next/link"

const TermsOfUse = () => {
  return (
    <>
      <Typography gutterBottom>
        ・deliciouShare(以下、当Webサービス)の利用は全て、利用者の責任で行うものとします。
      </Typography>
      <br />
      <Typography>
        ・当Webサービスの内容は予告なく変更する場合があります。
      </Typography>
      <Typography gutterBottom>
        (例：機能のアップデートや悪質なユーザーへの対策など)
      </Typography>
      <br />
      <Typography>
        ・また、上記に係り当Webサービスの利用規約には変更が入る場合があります。
      </Typography>
      <Typography>
        その場合、当Webサービスの利用継続をもって同意したとみなします。
      </Typography>
      <Typography gutterBottom>
        (変更予告などは
        <NextLink href="#" passHref>
          <Link>
            公式のTwitterアカウント
          </Link>
        </NextLink>
        で行いますのでご確認ください。)
      </Typography>
      <br />
      <Typography gutterBottom>
        ・当Webサービスは非営利で運営しているため、突然閉鎖する可能性があります。
      </Typography>
    </>
  )
}

export default TermsOfUse
