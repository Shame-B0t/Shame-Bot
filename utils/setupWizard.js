// the bot configuration functionality

function ifStart(message){
  if(message.content.startsWith('!start')){

    const [mode, timeoutLength] = message.content.split(' ').slice(1);
    // const sender = message.author.username;
    // const isActive = true;
    // const shameLevel = 0;  
      
    switch(mode){
      case 'easy':
        break;
      case 'medium':
        break;
      case 'sadistic':
        break;
      default: message.reply('not valid option, please type easy medium or sadistic'); 
        return;
    }
    message.reply(` your level of ${mode} has been set.`);
  }
}

module.exports = {
  ifStart,
};
