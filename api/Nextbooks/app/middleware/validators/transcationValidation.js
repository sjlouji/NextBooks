const Joi = require('@hapi/joi')

const transcationValidation = data => {
  const schema = {
    id: Joi.string().allow(''),
    debit: Joi.boolean().required(),
    description: Joi.string().required(),
    category: Joi.string().uppercase().required(),
    account: Joi.string().required(),
    amount: Joi.string().required(),
    transcation_type: Joi.string().uppercase().required(),
  }
  return Joi.validate(data,schema)
}


module.exports.transcationValidation = transcationValidation