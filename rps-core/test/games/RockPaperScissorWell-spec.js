//import 'babel-polyfill'
var should = require('chai').should();
var expect = require('chai').expect;

import GameResult from './../../src/games/GameResult';
import RockPaperScissorWellGame from './../../src/games/RockPaperScissorWellGame';
import GameItems from './../../src/games/GameItems';



describe('Testing RockPaperScissorWellGame', function () {

	it('should exist', function () {
		should.exist(RockPaperScissorWellGame);
	});

	it('should not be instantiable', function () {
		should.Throw(function(){
			new RockPaperScissorWellGame()
		});
	});


	it('should have a static getter called "type"', function () {
		should.exist(RockPaperScissorWellGame.type);
		should.not.Throw(function(){
			return RockPaperScissorWellGame.type;
		});
		expect(RockPaperScissorWellGame.type).to.be.equal("RockPaperScissorWellGame");
	});

	it('should have a static getter called "symbols"', function () {
		should.exist(RockPaperScissorWellGame.symbols);
		should.not.Throw(function(){
			return RockPaperScissorWellGame.symbols;
		});
		expect(RockPaperScissorWellGame.symbols).to.be.an.array;
		expect(RockPaperScissorWellGame.symbols.length).to.be.equal(4);
		expect(RockPaperScissorWellGame.symbols).to.contain(GameItems.WELL);

		RockPaperScissorWellGame.game
	});


	describe('Validating the "evaluate" method', function () {
	
	
		describe('draws (return GameResult.PLAYERS_DRAW) when inputs are equals as in', function () {
			var result;
	
			it('GameItems.ROCK v GameItems.ROCK', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.ROCK, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});
	
			it('GameItems.PAPER v GameItems.PAPER', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.PAPER, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});
	
			it('GameItems.SCISSOR v GameItems.SCISSOR', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.SCISSOR, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});

			it('GameItems.WELL v GameItems.WELL', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.WELL, GameItems.WELL);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});
		});
	
		describe('wins (return GameResult.PLAYER1_WINS) when first input wins over second one', function () {
			var result;
	
			it('GameItems.ROCK v GameItems.SCISSOR', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.ROCK, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});
	
			it('GameItems.PAPER v GameItems.ROCK', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.PAPER, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});
	
			it('GameItems.SCISSOR v GameItems.PAPER', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.SCISSOR, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});

			it('GameItems.WELL v GameItems.ROCK', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.WELL, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});

			it('GameItems.WELL v GameItems.SCISSOR', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.WELL, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});
		});
	
		describe('loses (return GameResult.PLAYER2_WINS) when second input wins over first one', function () {
			var result;
	
			it('GameItems.SCISSOR v GameItems.ROCK', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.SCISSOR, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});
	
			it('GameItems.ROCK v GameItems.PAPER', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.ROCK, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});
	
			it('GameItems.PAPER v GameItems.SCISSOR', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.PAPER, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});

			it('GameItems.PAPER v GameItems.WELL', function () {
				result = RockPaperScissorWellGame.evaluate(GameItems.WELL, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});
		});
	
	
	})

});


