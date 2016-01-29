//import 'babel-polyfill'
var should = require('chai').should();
var expect = require('chai').expect;
var sinon = require('sinon');

import {EventEmitter} from 'events';
import Round from './../src/Round';
import GameResult from './../src/games/GameResult';
import GameItems from './../src/games/GameItems';


describe('Testing Round.', function () {

	it('should exist', function () {
		should.exist(Round);
	});

	it('should be instantiable', function () {
		should.not.Throw(function () {
			new Round()
		});
	});

	describe('Testing on instance created with no parameters', function () {
		/**
		 *
		 * @type {Round}
		 */
		var round = new Round();
		var input1 = 1, input2 = 2;
		var result = GameResult.PLAYERS_DRAW, otherResult = GameResult.PLAYER1_WINS;

		var spy_READY_TO_RESOLVE = sinon.spy();
		var spy_RESOLVED = sinon.spy();

		round.addListener(Round.READY_TO_RESOLVE, spy_READY_TO_RESOLVE);
		round.addListener(Round.RESOLVED, spy_RESOLVED);

		it('"round = new Round()" sould exist', function () {
			should.exist(round);
		});

		it('"round" should exist be instance of EventEmitter', function () {
			expect(round instanceof EventEmitter).true;
		});

		it('no events were emitted by "round"', function () {
			expect(spy_READY_TO_RESOLVE.called).false;
			expect(spy_RESOLVED.called).false;
		});

		it('"round.id" ... is defaulted', function () {
			expect(round.id === Round.DEFAULT_ID).true;
		});

		it('"round.isPending" ... false', function () {
			expect(round.isPending).true;
		});

		it('"round.isResolved" ... false', function () {
			expect(round.isResolved).false;
		});

		it('set "round.input1" ... works', function () {
			should.not.Throw(function(){
				round.input1 = input1;
			});
			expect(round.input1).to.be.equal(input1)
		});

		it('set "round.input1" again... does not work', function () {
			should.not.Throw(function(){
				round.input1 = input2;
			});
			expect(round.input1).to.be.equal(input1);
			expect(round.input1).not.to.be.equal(input2);
		});


		it('no events were emitted by "round"', function () {
			expect(spy_READY_TO_RESOLVE.called).false;
			expect(spy_RESOLVED.called).false;
		});

		it('"round.isPending" ... false', function () {
			expect(round.isPending).true;
		});

		it('"round.isResolved" ... false', function () {
			expect(round.isResolved).false;
		});

		it('set "round.input2" ...', function () {
			should.not.Throw(function(){
				round.input2 = input2;
			});
		});

		it('set "round.input2" again... does not work', function () {
			should.not.Throw(function(){
				round.input2 = input1;
			});
			expect(round.input2).to.be.equal(input2);
			expect(round.input2).not.to.be.equal(input1);
		});

		it('"round" emitted Round.READY_TO_RESOLVE', function () {
			expect(spy_READY_TO_RESOLVE.calledOnce).true;
			expect(spy_RESOLVED.called).false;
		});

		it('"round.isPending" ... false', function () {
			expect(round.isPending).false;
		});

		it('"round.isResolved" ... false', function () {
			expect(round.isResolved).false;
		});

		it('set "round.result" ...', function () {
			should.not.Throw(function(){
				round.result = result;
			});
			expect(round.result).to.be.equal(result);
		});

		it('set "round.result" again... does not work', function () {
			should.not.Throw(function(){
				round.result = otherResult;
			});
			console.log('[Round-spec] - round.result() ::  = ', round.result);
			expect(round.result).to.be.equal(result);
			expect(round.result).not.to.be.equal(otherResult);
		});

		it('"round" emitted Round.RESOLVED', function () {
			expect(spy_READY_TO_RESOLVE.calledOnce).true;
			expect(spy_RESOLVED.calledOnce).true;
		});

		it('"round.isPending" ... false', function () {
			expect(round.isPending).false;
		});

		it('"round.isResolved" ... true', function () {
			expect(round.isResolved).true;
		});


	});

});


