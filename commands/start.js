// response to "start", takes args for mode and duration, sets the user's shame state with a timeout and varying conditions
const { ifStart } = require('../utils/setupWizard');

function msgCallback(message, client){
  ifStart(message, client);

}

module.exports = {
  msgCallback,
};
