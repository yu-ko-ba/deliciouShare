import { Typography } from "@mui/material"
import DelicioushareLink from "./DelicioushareLink"

const TermsOfUse = () => {
  return (
    <>
      <Typography>
        ・deliciouShare.appは現在ベータ版です。
      </Typography>
      <Typography gutterBottom>
        完成版へはアカウントや投稿を引き継げません、ご了承ください。
      </Typography>
      <br />
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
        <DelicioushareLink href="#" target="_blank" rel="noopener noreferrer">
            公式のTwitterアカウント
        </DelicioushareLink>
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
