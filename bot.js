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
  },
  {
    text: 'Nah, I\'m good',
    value: 3
  }
];
const delay = 500;
var name = '';

function showOptions(res) {
  if (res.value == 0) {
      delete options[0];
      return recommendMovie();
  }
  else if (res.value == 1) {
      delete options[1];
      return recommendSong();
  }
  else if (res.value == 2) {
      delete options[2];
      return catFacts();
  }
  else {
      bot.message.add({
        delay:delay,
        content:'Ok! Nice chatting with you, ' +name+'. If you wanna know how I was made, just visit me [here](https://github.com/TuulikkiLaine/chatbot)'
      })
  }
}

function goForward() {
  return bot.message.add({
    content:'What would you like to do next?',
    delay:delay,
    })
    .then(function() {
      let show_options = options.filter(obj => true);
      return bot.action.button({
        action: show_options
      });
    }).then(function(res) {
      showOptions(res)
    })
}

function recommendMovie() {
    bot.message.add(
      {content:'What are you in the mood for?',
      delay:delay})
    .then(function() {
      return bot.action.button({
        delay:delay,
        action: [
          {
            text:'Something sci-fi',
            value:'https://www.youtube.com/embed/Q0CbN8sfihY'
          },
          {
            text:'Something scary',
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
      bot.message.add(
        {content:'You might like this:',
        delay:delay})
      bot.message.add({
        type:'embed',
        content:res.value,
        delay:delay,
      })
    })
    .then(function(){
      goForward();
    });

}

function recommendSong() {
    bot.message.add(
    {content:'What are you in the mood for?',
    delay:delay})
    .then(function() {
      return bot.action.button({
        action: [
          {
            text:'Something from the 80s',
            value:'https://www.youtube.com/embed/j2F4INQFjEI'
          },
          {
            text:'Something instrumental and beautiful',
            value:'https://www.youtube.com/embed/NQXVzg2PiZw'
          },
          {
            text:'Something energetic and rock',
            value:'https://www.youtube.com/embed/HgzGwKwLmgM'
          },
        ]
      })
    })
    .then(function(res) {
      bot.message.add(
        {content:'You might like this:',
        delay:delay})
      bot.message.add({
        type:'embed',
        content:res.value,
        delay:delay,
      })
    })
    .then(function(){
      goForward();
    });
}

function catFacts() {
    bot.message.add({
      content: 'Cats make about 100 different sounds. Dogs make only about 10.',
      delay:delay*2
    }).then(function(){
      return bot.message.add({
        content:'The oldest known pet cat was recently found in a 9,500-year-old grave on the Mediterranean island of Cyprus',
        delay:delay*2
      })
    }).then(function(){
      return bot.message.add({
        content:'Approximately 1/3 of cat owners think their pets are able to read their minds.',
        delay:delay*2
      })
    }).then(function(){
      goForward();
    })
}

bot.message.add({
  content: 'Hello. Nice to meet you. What\'s your name?'
}).then(function() {
    return bot.action.text({
    action: {
      placeholder: 'Your name'
    },
    delay:delay
  });
}).then(function(res) {
  name = res.value
  return bot.message.add({
    content:'Hi ' + name + '! Nice to meet you. What would you like to talk about?',
  });
}).then(function() {
  return bot.action.button({
    action: options,
  });
}).then(function(res) {
  showOptions(res)
})
