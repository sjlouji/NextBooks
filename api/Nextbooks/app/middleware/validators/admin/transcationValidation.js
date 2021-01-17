const Joi = require('@hapi/joi')

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

const transcationValidation = data => {
  const schema = {
    id: Joi.string().allow(''),
    debit: Joi.boolean().required(),
    description: Joi.string().required(),
    category: Joi.string().uppercase().required(),
    account: Joi.string().required(),
    amount: Joi.string().required(),
    transcation_type: Joi.string().uppercase().required(),
    user: Joi.string().regex(mongoIdRegex).required(),
  }
  return Joi.validate(data,schema)
}


module.exports.transcationValidation = transcationValidation