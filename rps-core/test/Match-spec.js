//import 'babel-polyfill'
var should = require('chai').should();
var expect = require('chai').expect;

import GameResult from './../src/games/GameResult';
import RockPaperScissorGame from './../src/games/RockPaperScissorGame';
import Match from './../src/Match';
import GameItems from './../src/games/GameItems';

var mockedGame = {
	evaluate: ()=> {
		return GameResult.PLAYERS_DRAW;
	}
};

describe('Testing Match.', function () {

	it('should exist', function () {
		should.exist(Match);
	});

	it('should be instantiable', function () {
		should.not.Throw(function () {
			new Match(mockedGame)
		});
	});

	describe('Testing on instance. Mocked game.', function () {
		var match = new Match(mockedGame, 1);
		var currentRound, lastRound;
		var value1 = 1, value2 = 1;


		it('"match = new Match(mockedGame, 1)" sould exist', function () {
			should.exist(match);
		});

		it('"match.isPlaying" ... false', function () {
			expect(match.isPlaying).false;
		});

		it('"match.isOver" ... false', function () {
			expect(match.isOver).false;
		});

		it('"match.currentRound" ... does not exist', function () {
			should.not.exist(match.currentRound);
		});

		it('"match.lastRound" ... does not exist', function () {
			should.not.exist(match.lastRound);
		});

		it('"match.start() ... exists, called ...', function () {
			should.exist(match.start);

			should.not.Throw(function(){match.start()});
		});

		it('"match.isPlaying" ... true', function () {
			expect(match.isPlaying).true;
		});

		it('"match.isOver" ... false', function () {
			expect(match.isOver).false;
		});

		it('"match.currentRound" ... exists, stored as "currentRound"', function () {
			should.exist(match.currentRound);
			currentRound = match.currentRound;
		});

		it('"match.lastRound" ... does not exist', function () {
			should.not.exist(match.lastRound);
		});

		it('"match.enterCurrentRoundInputs" ... exists', function () {
			should.exist(match.enterCurrentRoundInputs);
			should.not.Throw(function(){
				match.enterCurrentRoundInputs(value1, value2);
			});
		});

		it('"match.isPlaying" ... false', function () {
			expect(match.isPlaying).false;
		});

		it('"match.isOver" ... true', function () {
			expect(match.isOver).true;
		});

		it('"match.lastRound" ... exists, stored as "lastRound"', function () {
			should.exist(match.lastRound);
			lastRound = match.lastRound;
		});

		it('"currentRound" === "lastRound"', function () {
			expect(currentRound === lastRound).true;
		});

	});

	describe('Testing on instance. RockPaperScissorGame game.', function () {

		var currentRound, lastRound;
		var match = new Match(RockPaperScissorGame, 1);
		var value1 = RockPaperScissorGame.symbols[0], value2 = RockPaperScissorGame.symbols[0];


		it('"match = new Match(mockedGame, 1)" sould exist', function () {
			should.exist(match);
		});

		it('"match.isPlaying" ... false', function () {
			expect(match.isPlaying).false;
		});

		it('"match.isOver" ... false', function () {
			expect(match.isOver).false;
		});

		it('"match.currentRound" ... does not exist', function () {
			should.not.exist(match.currentRound);
		});

		it('"match.lastRound" ... does not exist', function () {
			should.not.exist(match.lastRound);
		});

		it('"match.start() ... exists, called ...', function () {
			should.exist(match.start);
			should.not.Throw(function () {
				match.start()
			});
		});

		it('"match.isPlaying" ... true', function () {
			expect(match.isPlaying).true;
		});

		it('"match.isOver" ... false', function () {
			expect(match.isOver).false;
		});

		it('"match.currentRound" ... exists, stored as "currentRound"', function () {
			should.exist(match.currentRound);
			currentRound = match.currentRound;
		});

		it('"match.lastRound" ... does not exist', function () {
			should.not.exist(match.lastRound);
		});

		it('"match.enterCurrentRoundInputs" ... exists', function () {
			should.exist(match.enterCurrentRoundInputs);
			should.not.Throw(function () {
				match.enterCurrentRoundInputs(value1, value2);
			});
		});

		it('"match.isPlaying" ... false', function () {
			expect(match.isPlaying).false;
		});

		it('"match.isOver" ... true', function () {
			expect(match.isOver).true;
		});

		it('"match.lastRound" ... exists, stored as "lastRound"', function () {
			should.exist(match.lastRound);
			lastRound = match.lastRound;
		});

		it('"currentRound" === "lastRound"', function () {
			expect(currentRound === lastRound).true;
		});

	});

	describe('Testing on instance. RockPaperScissorGame, playing all combinations', function () {

		var game = RockPaperScissorGame;
		var match = new Match(game, Math.pow(game.symbols.length, 2));

		it('before "match.start()"', function () {
			should.exist(match);
			expect(match.isPlaying).false;
			expect(match.isOver).false;
			should.not.exist(match.currentRound);
			should.not.exist(match.lastRound);

			match.start();
		});

		for (let i = 0; i < game.symbols.length; i++) {
			let symbolA = game.symbols[i];
			for (let j = 0; j < game.symbols.length; j++) {
				let symbolB = game.symbols[j];
				let expected = game.evaluate(symbolA, symbolB);
				let message = game.type + ' playing inputs: ' + symbolA + ' + ' + symbolB + ' > ' + expected;

				it(message, function () {
					let currentRound = match.currentRound;
					match.enterCurrentRoundInputs(symbolA, symbolB);
					let lastRound = match.lastRound;
					expect(currentRound).to.be.equal(lastRound);
					expect(currentRound.result).to.be.equal(expected);
				});
			}
		}

		it('after 9 rounds', function () {
			expect(match.isPlaying).false;
			expect(match.isOver).true;
			should.not.exist(match.currentRound);
			should.exist(match.lastRound);
			expect(match.winner).to.be.equal(Match.DRAW);
			expect(match.score.player1).to.be.equal(3);
			expect(match.score.player2).to.be.equal(3);
		});


	});

});


