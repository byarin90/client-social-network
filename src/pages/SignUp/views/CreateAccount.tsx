import { Box } from "@mui/material"
import Loader from "../../../shared/components/Loader"

const CreateAccount = () => {
  // after created successfully, we will redirect to the login page
  return (
    <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Loader label={'Creating Account...'} />
    </Box>
  )
}

export default CreateAccount