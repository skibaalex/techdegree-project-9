
/**
 * Function to handle async errors as a middleware
 * @param {Function} cb 
 * @returns null
 * the function will execute the callback passed if theres no errors 
 * or will pass the error to next() nad express will handle the error
 */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        console.log('Error: ', error);
        next(error)
      }
    }
  } 


/**
 * Checks if the error is related to squelize and formats it accordingly
 * @param {object} error error object from accessing the database
 * @returns Array<Error> || false
 */
const handleValidationError = (error) => {
  if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
    const errors = error.errors.map(error => error.message);
    return errors
  }
  else
    return false
}


  module.exports = {
    asyncHandler,
    handleValidationError
  }