import fs from 'fs';
import expect from 'must';

var	join   	 = require('path').join,
	colors   = require('colors');

var compiler = require('../compiler'),
	Scope    = require('../../models/scope');

import {clone} from '../../../common/utils';

// TODO: remove hardcoding
var ss2Files = {
	'empty' : null,
	'defline': null,
	'defoverwrite': null
};

Object.keys(ss2Files).forEach(function (filename) {
	var s2Path =  join(__dirname, 'tests', filename + '.ss2'),
		code = fs.readFileSync(s2Path, { encoding: 'utf-8' });
	
	var fn = compiler(code),
		jsPath =  join (__dirname, 'results', filename + '.js');

	fs.writeFileSync(jsPath, fn);

	ss2Files[filename] = require(jsPath);
});


describe('Module: 2Stula/Compiler'.bold.underline, function () {		
	var getGlob = function(){ 
		return {
			width: 100,
			height: 200,
			store : new Scope()
		};
	}

	var getEl = function(glob){
		return {
			store : new Scope(glob)
		};
	}

	describe('For empty code', function () {
		var glob = getGlob(),
			el   = getEl(glob),
			cloneG = clone(glob),
			cloneE = clone(el);

		var resG = ss2Files.empty(glob),
			resE = ss2Files.empty(el);

		it('return undefined for empty code', function () {
			expect(resG).to.be(undefined);
			expect(resE).to.be(undefined);
		});

		it('should not change original object store', function () {
			expect(glob).to.eql(cloneG);
			expect(el).to.eql(cloneE);
		});
	});

	describe('For simple definition', function () {
		var glob = getGlob(),
			el   = getEl(glob),
			cloneG = getGlob(),
			cloneE = getEl(cloneG);

		var resG = ss2Files.defline(glob),
			resE = ss2Files.defline(el);

		it('should return setn value', function () {
			expect(resG).to.be(10);
			expect(resE).to.be(10);
		});

		it('should change original value', function () {
			expect(glob.store.get('x')).not.to.eql(cloneG.store.get('x'));
		});

		it('should set a value', function () {
			expect(glob.store.get('x')).to.be(10);
			expect(el.store.get('x')).to.be(10);
		});
	});
});