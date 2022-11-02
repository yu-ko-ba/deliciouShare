import { MoreVert } from "@mui/icons-material"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { MouseEvent, useEffect, useState } from "react"

type Props = {
  canBack?: boolean
}

const DelicioushareMenu = ({ canBack }: Props) => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setSignedIn(true)
      })
      .catch(() => {
      })
  }, [])

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e: MouseEvent<HTMLElement>) => {
          setAnchorEl(e.currentTarget)
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null)
        }}
      >
        {signedIn && (
          <MenuItem
            onClick={() => {
              router.push(
                { pathname: "settings", query: { canBack: canBack } },
                "/settings",
              )
              setAnchorEl(null)
            }}
          >
            アカウント設定
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            router.push(
              { pathname: "/license", query: { canBack: canBack } },
              "/license"
            )
            setAnchorEl(null)
          }}
        >
          ライセンス
        </MenuItem>
      </Menu>
    </>
  )
}

export default DelicioushareMenu
