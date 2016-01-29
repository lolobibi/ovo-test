//import 'babel-polyfill'
var should = require('chai').should();
var expect = require('chai').expect;

import RuleResult from './../../src/rules/RuleResult';
import WinRule from './../../src/rules/WinRule';
import GameItems from './../../src/games/GameItems';


describe('Testing WinRule.', function () {

	it('should exist', function () {
		should.exist(WinRule);
	});

	it('should be instantiable', function () {
		should.not.Throw(function () {
			new WinRule(1,2)
		});
		should.not.Throw(function () {
			new WinRule("asdasd", "xbvbcvb")
		});
	});

	describe('Validating an instance of WinRule.', function () {

		var winRule = new WinRule(1,2);

		it('has a "match" method', function () {
			should.exist(winRule.match);
		});

		it('has a "evaluate" method', function () {
			should.exist(winRule.evaluate);
		});

		describe('Validating the method "match".', function () {

			var winRule, result, expected;

			it('returns true with WinRule(1,2) tested with 1, 2', function () {
				winRule = new WinRule(1,2);
				result = winRule.match( 1, 2);
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with WinRule(1,2) tested with 2, 1', function () {
				winRule = new WinRule(1,2);
				result = winRule.match( 2, 1);
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns false with WinRule(1,2) tested with null, null', function () {
				winRule = new WinRule(1,2);
				result = winRule.match( null, null);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with WinRule(1,2) tested with 0, 1', function () {
				winRule = new WinRule(1,2);
				result = winRule.match( 0, 1);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with WinRule(1,2) tested with 2, 0', function () {
				winRule = new WinRule(1,2);
				result = winRule.match( 2, 0);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns true with WinRule("abc", "def") tested with "abc", "def"', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.match( "abc", "def");
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with WinRule("abc", "def") tested with "def", "abc"  ', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.match( "def", "abc");
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with WinRule("abc", "def") tested with null, null  ', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.match( null, null);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with WinRule("abc", "def") tested with "ghi", "jkl" ', function () {
				winRule = new WinRule("ghi", "jkl");
				result = winRule.match( "def", "def");
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with WinRule("abc", "def") tested with "def", "def" ', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.match( "def", "def");
				expected = false;
				result.should.be.equal(expected);
			});

		})

		describe('Validating the method "evaluate".', function () {

			var winRule, result, expected;

			it('returns RuleResult.WIN with WinRule(1,2) tested with 1, 2', function () {
				winRule = new WinRule(1,2);
				result = winRule.evaluate(1,2);
				expected = RuleResult.WIN;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.LOOSE with WinRule(1,2) tested with 2, 1', function () {
				winRule = new WinRule(1,2);
				result = winRule.evaluate(2,1);
				expected = RuleResult.LOOSE;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with WinRule(1,2) tested with 0, 1', function () {
				winRule = new WinRule(1,2);
				result = winRule.evaluate(0,1);
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with WinRule(1,2) tested with null, null', function () {
				winRule = new WinRule(1,2);
				result = winRule.evaluate(null, null);
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.WIN with WinRule("abc", "def") tested with "abc", "def"', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.evaluate("abc", "def");
				expected = RuleResult.WIN;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.LOOSE with WinRule("abc", "def") tested with "def", "abc"', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.evaluate("def", "abc");
				expected = RuleResult.LOOSE;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with WinRule("abc", "def") tested with "ghi", "def"', function () {
				winRule = new WinRule("abc", "def");
				result = winRule.evaluate("ghi", "def");
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

		})
	})
});


