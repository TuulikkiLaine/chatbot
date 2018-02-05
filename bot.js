const bot = new BotUI('bot-wrapper');
const options = [
  {
    text: 'Recommend a movie',
    value: 0
  },
  {
    text: 'Recommend a song',
    value: 1,
  },
  {
    text: 'Random Cat Facts',
    value: 2
  }
]

function recommendMovie() {
    bot.message.add('What are you in the mood for?')
    .then(function() {
      return bot.action.button({
        action: [
          {
            text:'Something Sci-fi',
            value:'https://www.youtube.com/embed/Q0CbN8sfihY'
          },
          {
            text:'Something Scary',
            value:'https://www.youtube.com/embed/W2ot6ogGZNc'
          },
          {
            text:'Something with music',
            value:'https://www.youtube.com/embed/0pdqf4P9MB8'
          },
        ]
      })
    })
    .then(function(res) {
      bot.message.add('You might like this:')
      bot.message.add({
        type:'embed',
        content:res.value
      })
    })
    .then(function(){
      return bot.message.add('What would you like to do next?')
    })
}

bot.message.add({
  content: 'Hello. Nice to meet you. What\'s your name'
}).then(function() {
    return bot.action.text({
    action: {
      placeholder: 'Your name'
    }
  });
}).then(function(res) {
  return bot.message.add('Hi ' + res.value + '! Nice to meet you. What would you like to talk about?');
}).then(function() {
  return bot.action.button({
    action: options
  });
}).then(function(res) {
  if (res.value == 0) {
      delete options[0];
      return recommendMovie();
  }
  else if (res.value == 1) {
      delete options[1];
      return recommendSong();
  }
  else {
      delete options[2];
      return catFacts();
  }
}).then(function() {
  return bot.action.button({
    action: options
  });
})
