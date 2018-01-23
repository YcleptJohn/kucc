const ENV = (process.env.NODE_ENV || 'development')
console.log('>>>>ENVINCONF', ENV)

let configs = {}

configs['default'] = {
  SERVER_PORT: 9000,
  HIDE_SITE: false
}

configs['development'] = {}

configs['staging'] = {}

configs['production'] = {
  HIDE_SITE: true
}

module.exports = Object.assign({}, configs.default, configs[ENV])
