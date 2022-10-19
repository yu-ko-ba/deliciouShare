import { Box, LinearProgress } from "@mui/material"

type LoadingBarProps = {
  nowLoading: boolean,
}

const LoadingBar = ({ nowLoading }: LoadingBarProps) => {
  return (
      <Box
        hidden={!nowLoading}
        sx={{
          width: "100%",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <LinearProgress />
      </Box>
  )
}

export default LoadingBar
