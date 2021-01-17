const Joi = require('@hapi/joi')

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

const accountValidation = data => {
  const schema = {
    account_id: Joi.string().required(),
    account_name: Joi.string().required(),
    account_type: Joi.string().valid('cash_account', 'bank_account', 'wallet_account').required(),
    initialBalance: Joi.string().required(),
    account_provider: Joi.string().required(),
    user: Joi.string().regex(mongoIdRegex).required(),
  }
  return Joi.validate(data,schema)
}

const updateAccount = data => {
  const schema = {
    id: Joi.string().required(),
    account_name: Joi.string(),
    account_type: Joi.string().valid('cash_account', 'bank_account', 'wallet_account'),
    account_provider: Joi.string(),
    user: Joi.string().regex(mongoIdRegex).required(),
  }
  return Joi.validate(data,schema)
}

module.exports.accountValidation = accountValidation
module.exports.updateAccount = updateAccount