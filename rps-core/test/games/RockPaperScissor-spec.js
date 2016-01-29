//import 'babel-polyfill'
var _ = require('lodash');
var should = require('chai').should();
var expect = require('chai').expect;

import GameResult from './../../src/games/GameResult';
import RockPaperScissorGame from './../../src/games/RockPaperScissorGame';
import GameItems from './../../src/games/GameItems';



describe('Testing RockPaperScissorGame', function () {

	it('should exist', function () {
		should.exist(RockPaperScissorGame);
	});

	it('should not be instantiable', function () {
		should.Throw(function(){
			new RockPaperScissorGame()
		});
	});

	it('should have a static getter called "type"', function () {
		should.exist(RockPaperScissorGame.type);
		should.not.Throw(function(){
			return RockPaperScissorGame.type;
		});
		expect(RockPaperScissorGame.type).to.be.equal("RockPaperScissorGame");
	});

	it('should have a static getter called "symbols"', function () {
		should.exist(RockPaperScissorGame.symbols);
		should.not.Throw(function(){
			return RockPaperScissorGame.symbols;
		});
		expect(RockPaperScissorGame.symbols).to.be.an.array;
	});

	it('should have a static method called "evaluate"', function () {
		should.exist(RockPaperScissorGame.evaluate);
		expect(RockPaperScissorGame.evaluate).to.be.a.function;
		should.Throw(RockPaperScissorGame.evaluate);
	});


	describe('Validating the "evaluate" method', function () {

		describe('throws an error when not using correct symbol.', function () {
			it('1 v 1', function () {
				var test = function(){ RockPaperScissorGame.evaluate(undefined, undefined)};
				should.Throw(test);
			});
			it('null v null', function () {
				var test = function(){ RockPaperScissorGame.evaluate(null, null)};
				should.Throw(test);
			});

			it('GameItems.ROCK v "random"', function () {
				var test = function(){ RockPaperScissorGame.evaluate(GameItems.ROCK, "random")};
				should.Throw(test);
			});
		});

		describe('throws an error when missing rule.', function () {
			it('...instead of trying to remove a rule', function () {});
			describe('...instead of trying to remove a rule, testing all combinations', function () {

				var testFn;
				var symbols = RockPaperScissorGame.symbols;


				_.each(symbols, function(symbolA){

					_.each(symbols, function(symbolB){

						it(symbolA +' v '+symbolB+ ' does not throw, hence has a rule', function () {
							testFn = function () {
								RockPaperScissorGame.evaluate(symbolA, symbolB);
							};
							should.not.Throw(testFn)
						});

					})
				})

			});

		});

		describe('draws (return GameResult.PLAYERS_DRAW) when inputs are equals as in', function () {
			var result;

			it('GameItems.ROCK v GameItems.ROCK', function () {
				result = RockPaperScissorGame.evaluate(GameItems.ROCK, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});

			it('GameItems.PAPER v GameItems.PAPER', function () {
				result = RockPaperScissorGame.evaluate(GameItems.PAPER, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});

			it('GameItems.SCISSOR v GameItems.SCISSOR', function () {
				result = RockPaperScissorGame.evaluate(GameItems.SCISSOR, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYERS_DRAW);
			});
		});

		describe('wins (return GameResult.PLAYER1_WINS) when first input wins over second one', function () {
			var result;

			it('GameItems.ROCK v GameItems.SCISSOR', function () {
				result = RockPaperScissorGame.evaluate(GameItems.ROCK, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});

			it('GameItems.PAPER v GameItems.ROCK', function () {
				result = RockPaperScissorGame.evaluate(GameItems.PAPER, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});

			it('GameItems.SCISSOR v GameItems.PAPER', function () {
				result = RockPaperScissorGame.evaluate(GameItems.SCISSOR, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYER1_WINS);
			});
		});

		describe('loses (return GameResult.PLAYER2_WINS) when second input wins over first one', function () {
			var result;

			it('GameItems.SCISSOR v GameItems.ROCK', function () {
				result = RockPaperScissorGame.evaluate(GameItems.SCISSOR, GameItems.ROCK);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});

			it('GameItems.ROCK v GameItems.PAPER', function () {
				result = RockPaperScissorGame.evaluate(GameItems.ROCK, GameItems.PAPER);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});

			it('GameItems.PAPER v GameItems.SCISSOR', function () {
				result = RockPaperScissorGame.evaluate(GameItems.PAPER, GameItems.SCISSOR);
				expect(result).to.be.equal(GameResult.PLAYER2_WINS);
			});
		});


	})

});


