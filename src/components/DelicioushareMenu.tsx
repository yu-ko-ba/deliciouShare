import { MoreVert } from "@mui/icons-material"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { MouseEvent, useState } from "react"

type Props = {
  canBack?: boolean
}

const DelicioushareMenu = ({ canBack }: Props) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
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
        <MenuItem
          onClick={() => {
            router.push(
              { pathname: "settings", query: { canBack: canBack } },
              "settings",
            )
          }}
        >
          アカウント設定
        </MenuItem>
      </Menu>
    </>
  )
}

export default DelicioushareMenu
