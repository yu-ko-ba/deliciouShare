import { MoreVert } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { MouseEvent, useState } from "react"

const MeshiteroMenu = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
        <MenuItem
          onClick={() => {
            router.push(
              { pathname: "settings", query: { beforePath: router.asPath } },
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

export default MeshiteroMenu
