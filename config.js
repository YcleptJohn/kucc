const ENV = (process.env.NODE_ENV || 'development')

let configs = {}

configs['default'] = {
  SERVER_PORT: 80 
}

configs['development'] = {
  SERVER_PORT: 9000 
}

configs['staging'] = {}

configs['production'] = {}

module.exports = Object.assign({}, configs.default, configs[ENV])
