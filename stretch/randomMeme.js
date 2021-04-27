// const Discord = require('discord.js');

const images = ['https://i.pinimg.com/originals/3c/fe/69/3cfe69a086c4574c607dfaaa988e26fa.jpg', 'https://memegenerator.net/img/instances/54937116/i-will-find-you-and-i-will-shame-you.jpg', 'http://images7.memedroid.com/images/UPLOADED878/5d7e0d5b30217.jpeg', 'https://www.memesmonkey.com/images/memesmonkey/a3/a36a7554db9b71965c15d5f4b45a9484.jpeg', 'https://i.pinimg.com/originals/f0/58/f4/f058f4eb991df02b51ff2e7fc0a43913.png', 'https://www.memesmonkey.com/images/memesmonkey/c6/c62688ed1adcff19bfd07ab2bc871d73.jpeg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSncgBRq5Lz5k6seGScxho99nDs-u6QSSpHA&usqp=CAU', 'https://www.mememaker.net/static/images/memes/4783463.jpg', 'https://www.memecreator.org/static/images/memes/5232747.jpg', 'https://www.memecreator.org/static/images/memes/5155538.jpg'];

function randomMemeIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomMeme(message) {

  if(message.author.bot || !message.content.toLowerCase() === '--meme') return;

  //   const memeEmbed = new Discord.MessageEmbed()
  //     .setTitle('Here is your secret meme')
  //     .setAuthor('Shame-b0t')
  //     .setImage(String(images[index]));

  const i = randomMemeIndex(images);

  if(message.content.toLowerCase().includes('--meme')) message.channel.send(images[i]);

}

module.exports = { randomMeme }; 
