const Joi = require('@hapi/joi')

const accountValidation = data => {
  const schema = {
    account_id: Joi.string().required(),
    account_name: Joi.string().required(),
    account_type: Joi.string().valid('cash_account', 'bank_account', 'wallet_account').required(),
    initialBalance: Joi.string().required(),
    account_provider: Joi.string().required(),
  }
  return Joi.validate(data,schema)
}

const updateAccount = data => {
  const schema = {
    id: Joi.string().required(),
    account_name: Joi.string(),
    account_type: Joi.string().valid('cash_account', 'bank_account', 'wallet_account'),
    account_provider: Joi.string(),
  }
  return Joi.validate(data,schema)
}

module.exports.accountValidation = accountValidation
module.exports.updateAccount = updateAccount