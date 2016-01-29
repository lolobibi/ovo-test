//import 'babel-polyfill'
var _ = require('lodash');
var should = require('chai').should();
var expect = require('chai').expect;

import GameResult from './../../src/games/GameResult';
import WinRule from './../../src/rules/WinRule';
import DrawRule from './../../src/rules/DrawRule';
import NumericWinRule from './../../src/rules/NumericWinRule';
import NumericDrawRule from './../../src/rules/NumericDrawRule';

import DuelGame from './../../src/games/DuelGame';
import GameItems from './../../src/games/GameItems';


describe('Testing DuelGame', function () {

	it('should exist', function () {
		should.exist(DuelGame);
	});

	describe('Validating instantiation', function () {

		describe('Throwing error when incorrect parameters passed to constructor', function () {

			it('parameters= ()', function () {
				should.Throw(function () {
					new DuelGame()
				});
			});
			it('parameters= ("sometype")', function () {
				should.Throw(function () {
					new DuelGame("sometype");
				});
			});

			it('parameters= ("sometype", symbols)', function () {
				should.Throw(function () {
					var symbols = [1];
					new DuelGame("sometype", symbols)
				});
			});

			it('parameters= ("sometype", symbols, incorrectRules)', function () {
				should.Throw(function () {
					var symbols = [1];
					var incorrectRules = [1];
					new DuelGame("sometype", symbols, incorrectRules)
				});
			});
		});

		describe('Instantiating correctly', function () {

			var type = '1symbol-1drawrule';
			var symbols = [1];
			var rules = [new DrawRule(1, 1)];

			it('parameters= ("' + type + '", symbols, rules)', function () {
				should.not.Throw(function () {
					new DuelGame(type, symbols, rules)
				});
			});
		});

	});


	describe('Validating an instance."', function () {

		var type, symbols, rules, instance;

		before(function () {
			type = '1symbol-1drawrule';
			symbols = [1];
			rules = [new DrawRule(1, 1)];
			instance = new DuelGame(type, symbols, rules);
		});

		after(function () {
			instance = undefined;
		});

		it('should have a getter called "type"', function () {
			should.exist(instance.type);
			expect(instance.type).to.be.equal(type);
		});

		it('should have a getter called "symbols"', function () {
			should.exist(instance.symbols);
			expect(instance.symbols).to.be.eql(symbols);
		});

		it('should have a getter called "rules"', function () {
			should.exist(instance.rules);
			expect(instance.rules).to.be.eql(rules);
		});

	});


	describe('Validating the "evaluate" method', function () {

		var symbols, rules, instance;
		var result, expected;
		var types = {
			'_1s_1dr': '1 symbol, 1 draw-rule',
			'_2s_2dr_1wr': '2 symbols, 2 draw-rules, 1 win-rule',
			'_2s_3dr': '2 symbols, 3 draw-rules',
			'_3s_3dr_3wr': '3 symbols, 3 draw-rules, 3 win-rules',
			'_4s_1ndr_1nwr': '4 symbols, 1 num-draw-rule, 1 num-win-rule'
		};

		it(types._1s_1dr, function () {
			symbols = [1];
			rules = [new DrawRule(1, 1)];
			instance = new DuelGame(types._1s_1dr, symbols, rules);

			result = instance.evaluate(1, 1);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);
		});

		it(types._2s_2dr_1wr, function () {
			symbols = [1, 2];
			rules = [
				new DrawRule(1, 1),
				new DrawRule(2, 2),
				new WinRule(1, 2)
			];
			instance = new DuelGame(types._2s_2dr_1wr, symbols, rules);

			result = instance.evaluate(1, 1);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);

			result = instance.evaluate(2, 2);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);

			result = instance.evaluate(1, 2);
			expected = GameResult.PLAYER1_WINS;
			result.should.be.equal(expected);

			result = instance.evaluate(2, 1);
			expected = GameResult.PLAYER2_WINS;
			result.should.be.equal(expected);
		});
		
		it(types._2s_3dr, function () {
			symbols = [1, 2];
			rules = [
				new DrawRule(1, 1),
				new DrawRule(2, 2),
				new DrawRule(1, 2)
			];
			instance = new DuelGame(types._2s_3dr, symbols, rules);

			result = instance.evaluate(1, 1);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);

			result = instance.evaluate(2, 2);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);

			result = instance.evaluate(1, 2);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);

			result = instance.evaluate(2, 1);
			expected = GameResult.PLAYERS_DRAW;
			result.should.be.equal(expected);
		});

		describe(types._3s_3dr_3wr, function () {
			symbols = [1, 2, 3];
			rules = [
				new DrawRule(1, 1),
				new DrawRule(2, 2),
				new DrawRule(3, 3),
				new WinRule(1, 2),
				new WinRule(2, 3),
				new WinRule(3, 1)
			];
			var instance = new DuelGame(types._3s_3dr_3wr, symbols, rules);

			testThat(1, 1, GameResult.PLAYERS_DRAW);
			testThat(2, 2, GameResult.PLAYERS_DRAW);
			testThat(3, 3, GameResult.PLAYERS_DRAW);
			testThat(1, 2, GameResult.PLAYER1_WINS);
			testThat(2, 1, GameResult.PLAYER2_WINS);
			testThat(2, 3, GameResult.PLAYER1_WINS);
			testThat(3, 2, GameResult.PLAYER2_WINS);
			testThat(3, 1, GameResult.PLAYER1_WINS);
			testThat(1, 3, GameResult.PLAYER2_WINS);

			function testThat(a, b, expected) {
				var msg = a + ' over ' + b + '  -->>  ' + expected;
				it(msg, function () {
					result = instance.evaluate(a, b);
					result.should.be.equal(expected);
				})
			}
		});

		describe(types._4s_1ndr_1nwr, function () {
			var symbols = [1, 2, 3, 4];
			var rules = [
				new NumericWinRule(),
				new NumericDrawRule()
			];
			var instance = new DuelGame(types._4s_1ndr_1nwr, symbols, rules);

			var i, j;
			for (i = 1; i < 5; i++) {
				testThat(i, i, GameResult.PLAYERS_DRAW);
				for (j = i + 1; j < 5; j++) {
					testThat(i, j, GameResult.PLAYER2_WINS);
					testThat(j, i, GameResult.PLAYER1_WINS);
				}
			}

			function testThat(a, b, expected) {
				var msg = a + ' over ' + b + '  -->>  ' + expected;
				it(msg, function () {
					result = instance.evaluate(a, b);
					result.should.be.equal(expected);
				})
			}
		});

	});


});


