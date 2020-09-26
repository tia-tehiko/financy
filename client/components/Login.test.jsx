import React from 'react'
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Login from './Login'
import store from '../store'

jest.spyOn(console, 'log').mockImplementation(() => { })

jest.mock('authenticare/client', () => ({
  signIn: () => Promise.resolve(),
  isAuthenticated: () => true
}))

test('Log in completes successfully', async () => {
  expect.assertions(1)
  render(<Provider store={store}><Login /></Provider>)
  const email = screen.getByPlaceholderText('Email Address')
  const password = screen.getByPlaceholderText('Password')
  fireEvent.change(email, { target: { value: 'test@test.com' } })
  fireEvent.change(password, { target: { value: 'test' } })
  const button = screen.getByRole('button')
  fireEvent.click(button)
  await waitFor(() => console.log.mock.calls.length > 0)
  expect(console.log).toHaveBeenCalledWith('Logged in')
})
