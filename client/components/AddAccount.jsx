import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAccount } from '../actions/accounts.action'
import { postAccount } from '../api/api'
import { localStringToNumber } from '../utils/currency'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

function AddAccount (props) {
  const { dispatch, userInfo } = props
  const [account, setAccount] = useState({
    name: '',
    balance: ''
  })

  function handleChange (event) {
    event.preventDefault()
    const { name, value } = event.target
    setAccount({ ...account, [name]: value })
  }

  function handleSubmit (event) {
    event.preventDefault()
    const id = userInfo.id
    postAccount(id, account)
      .then((account) => dispatch(addAccount(account)))
      .catch(err => console.log(err))
  }

  function handleBlur ({ target }) {
    const { name, value } = target
    setAccount({
      ...account,
      [name]: value
    })
  }

  function handleFocus ({ target }) {
    const { name, value } = target
    setAccount({
      ...account,
      [name]: localStringToNumber(value)
    })
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 200,
      paddingBottom: 200,
      padding: 100
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#17E9E0'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      borderColor: '#A64AC9'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#17E9E0'
    }
  }))

  const classes = useStyles()

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add a New Account
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="accountName"
              label="Account Name"
              name="name"
              autoFocus
              value={account.name}
              onChange={handleChange}>
            </TextField>
            <FormControl fullWidth className={classes.form}>
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="accountBalance"
                name="balance"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                value={account.balance}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Add New Account</Button>
          </form>
        </div>
      </Container>
    </>

  )
}
const mapStateToProps = (state) => ({
  userInfo: state.addUserInfo
})

export default connect(mapStateToProps)(AddAccount)
