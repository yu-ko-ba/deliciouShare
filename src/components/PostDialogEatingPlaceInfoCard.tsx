import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type PostDialogEatingPlaceInfoCardProps = {
  eatingPlaceName: string
  setEatingPlaceName: Dispatch<SetStateAction<string>>
  eatingPlaceAddress: string
  setEatingPlaceAddress: Dispatch<SetStateAction<string>>
  eatingPlaceWebsiteUrl: string
  setEatingPlaceWebsiteUrl: Dispatch<SetStateAction<string>>
  eatingPlaceId: string
  setEatingPlaceId: Dispatch<SetStateAction<string>>
  clearEatingPlaceInfo: () => void
}

const PostDialogEatingPlaceInfoCard = ({
  eatingPlaceName,
  setEatingPlaceName,
  eatingPlaceAddress,
  setEatingPlaceAddress,
  eatingPlaceWebsiteUrl,
  setEatingPlaceWebsiteUrl,
  eatingPlaceId,
  setEatingPlaceId,
  clearEatingPlaceInfo
}: PostDialogEatingPlaceInfoCardProps) => {
  return (
    <Card>
      <CardHeader title="お店の情報" />
      <CardContent>
        <TextField
          label="名前"
          margin="dense"
          value={eatingPlaceName}
          onChange={(e) => {
            setEatingPlaceName(e.target.value)
          }}
          fullWidth
        />
        <TextField
          label="住所"
          margin="dense"
          value={eatingPlaceAddress}
          onChange={(e) => {
            setEatingPlaceAddress(e.target.value)
          }}
          fullWidth
        />
        <TextField
          label="ホームページ"
          margin="dense"
          value={eatingPlaceWebsiteUrl}
          onChange={(e) => {
            setEatingPlaceWebsiteUrl(e.target.value)
          }}
          fullWidth
        />
        <TextField
          label="Place ID"
          margin="dense"
          value={eatingPlaceId}
          onChange={(e) => {
            setEatingPlaceId(e.target.value)
          }}
          disabled
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          onClick={() => {
            setEatingPlaceId("")
          }}
          fullWidth
        >
          Place IDを消去
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            clearEatingPlaceInfo()
          }}
          fullWidth
        >
          入力内容を消去
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostDialogEatingPlaceInfoCard
