const environments = {
  development: 'http://localhost:3000/api/v1',
  test: 'http://localhost:3333/api/v1',
  production: 'http://realfinancy.herokuapp.com',
  integration: '',
  deployment: '',
  build: ''
}

const env = 'production'

export const baseApiUrl = environments[env]
