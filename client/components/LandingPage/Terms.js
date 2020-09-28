import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Markdown from './modules/components/Markdown'
import Typography from './modules/components/Typography'
import Navbar from './modules/views/Navbar'
import AppFooter from './modules/views/AppFooter'
import withRoot from './modules/withRoot'
import terms from './modules/views/terms.md'

function Terms () {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(Terms)
