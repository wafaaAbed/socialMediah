import LottieHandler from '@Components/feedback/LottieHandler/LottieHandler'

import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <Container>
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "5%" }}
    >
<LottieHandler type='notFound' message='This Page Not Founded'/>
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </div>
  </Container>
  )
}

export default Error
