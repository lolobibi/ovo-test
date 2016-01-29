//import 'babel-polyfill'
var should = require('chai').should();
var expect = require('chai').expect;

import RuleResult from './../../src/rules/RuleResult';
import DrawRule from './../../src/rules/DrawRule';
import GameItems from './../../src/games/GameItems';


describe('Testing DrawRule.', function () {

	it('should exist', function () {
		should.exist(DrawRule);
	});

	it('should be instantiable', function () {
		should.not.Throw(function () {
			new DrawRule(1,2)
		});
		should.not.Throw(function () {
			new DrawRule("asdasd", "xbvbcvb")
		});
	});

	describe('Validating an instance of DrawRule.', function () {

		var drawRule = new DrawRule(1,2);

		it('has a "match" method', function () {
			should.exist(drawRule.match);
		});

		it('has a "evaluate" method', function () {
			should.exist(drawRule.evaluate);
		});

		describe('Validating the method "match".', function () {

			var drawRule, result, expected;

			it('returns true with DrawRule(1,2) tested with 1, 2', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.match( 1, 2);
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with DrawRule(1,2) tested with 2, 1', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.match( 2, 1);
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule(1,2) tested with null, null', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.match( null, null);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule(1,2) tested with 0, 1', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.match( 0, 1);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule(1,2) tested with 2, 0', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.match( 2, 0);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns true with DrawRule("abc", "def") tested with "abc", "def"', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.match( "abc", "def");
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with DrawRule("abc", "def") tested with "def", "abc"  ', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.match( "def", "abc");
				expected = true;
				result.should.be.equal(expected);
			});

			it('returns true with DrawRule("abc", "def") tested with null, null  ', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.match( null, null);
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule("abc", "def") tested with "ghi", "jkl" ', function () {
				drawRule = new DrawRule("ghi", "jkl");
				result = drawRule.match( "def", "def");
				expected = false;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule("abc", "def") tested with "def", "def" ', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.match( "def", "def");
				expected = false;
				result.should.be.equal(expected);
			});

		});

		describe('Validating the method "evaluate".', function () {

			var drawRule, result, expected;

			it('returns RuleResult.DRAW with DrawRule(1,2) tested with 1, 2', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.evaluate(1,2);
				expected = RuleResult.DRAW;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.DRAW with DrawRule(1,2) tested with 2, 1', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.evaluate(2,1);
				expected = RuleResult.DRAW;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with DrawRule(1,2) tested with 0, 1', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.evaluate(0,1);
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with DrawRule(1,2) tested with null, null', function () {
				drawRule = new DrawRule(1,2);
				result = drawRule.evaluate(null, null);
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

			it('returns true with DrawRule("abc", "def") tested with "abc", "def"', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.evaluate("abc", "def");
				expected = RuleResult.DRAW;
				result.should.be.equal(expected);
			});

			it('returns false with DrawRule("abc", "def") tested with "def", "abc"', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.evaluate("def", "abc");
				expected = RuleResult.DRAW;
				result.should.be.equal(expected);
			});

			it('returns RuleResult.UNDETERMINED with DrawRule("abc", "def") tested with "ghi", "def"', function () {
				drawRule = new DrawRule("abc", "def");
				result = drawRule.evaluate("ghi", "def");
				expected = RuleResult.UNDETERMINED;
				result.should.be.equal(expected);
			});

		})
	})
});


