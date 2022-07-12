/* Cats API */

const URL = 'https://api.thecatapi.com/v1/images/search';

fetch(URL)
		.then(res => res.json())
		.then(data => {
    	//let img = document.querySelector('img');
      let img = document.getElementById('user-one');
    	img.src = data[0].url;
});

fetch(URL)
		.then(res => res.json())
		.then(data => {
    	//let img = document.querySelector('img');
      let img = document.getElementById('user-two');
    	img.src = data[0].url;
});

class Result {
  static whoWin(yourChoice, PCchoice) {
    if (yourChoice === "emerald" && PCchoice === "shapphire" || yourChoice === "shapphire" && PCchoice === "ruby" || yourChoice === "ruby" && PCchoice === "emerald") return "win";
    else if (yourChoice === "shapphire" && PCchoice === "emerald" || yourChoice === "ruby" && PCchoice === "shapphire" || yourChoice === "emerald" && PCchoice === "ruby") return "lose";
    else return "draw";
  }
}

class Choice {
  constructor(yourChoice) {
    this.yourChoice = yourChoice;
    this.PCchoice = this.drawPcChoice();
  }

  getYourChoice = () => this.yourChoice;
  getPcChoice = () => this.PCchoice;

  drawPcChoice() {
    const options = ["emerald", "ruby", "shapphire"];

    return options[Math.floor(Math.random() * options.length)];
  }
}

class Stats {
  constructor(wins, draws, loses) {
    this.status = {
      wins: wins,
      draws: draws,
      loses: loses,
    }
  }
  getStats = () => this.status;

  refreshStats(result) {
    switch (result) {
      case "win":
        this.status.wins++;
        break;
      case "draw":
        this.status.draws++;
        break;
      case "lose":
        this.status.loses++;
        break;
    }
  }
}

class Game {
  constructor() {
    this.optionsImg = document.querySelectorAll('.img');
    this.optionsBtns = document.querySelectorAll('button');
    this.optionsBtns.forEach(option => option.addEventListener('click', this.startGame.bind(this)))

    this.youWins = document.querySelector('.results > .you-win');
    this.draw = document.querySelector('.results > .draw');
    this.PcWins = document.querySelector('.results > .pc-win');

    this.stats = new Stats(0, 0, 0);

    this.render.call(this, this.stats.getStats());
  }

  startGame(e) {
    this.optionsImg.forEach(choice => choice.className = 'img');
    if (this.draw.classList.contains('draw-animation')) {
      this.draw.classList.toggle('draw-animation');
    }


    this.choice = new Choice(e.target.dataset.option);

    const yourChoice = this.choice.getYourChoice(),
      PcChoice = this.choice.getPcChoice();

    if (yourChoice === PcChoice) {
      [...this.optionsImg].find(choice => choice.dataset.option === PcChoice && choice.dataset.option === PcChoice).classList.add('draw-color');
      this.draw.classList.toggle('draw-animation');
    } else {
    [...this.optionsImg].find(choice => choice.dataset.option === yourChoice).classList.add('player-choice');
      [...this.optionsImg].find(choice => choice.dataset.option === PcChoice).classList.add('pc-choice');
    }

    this.stats.refreshStats(Result.whoWin(yourChoice, PcChoice));

    this.render.call(this, this.stats.getStats());
  }

  render(stats) {
    this.youWins.textContent = `Player: ${stats.wins}`;
    this.PcWins.textContent = `PC: ${stats.loses}`;
  }
}

const newGame = new Game();


