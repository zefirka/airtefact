var fs 		 = require('fs'),
	warden 	 = require('warden.js'),
	join   	 = require('path').join,
	colors   = require('colors');

var compiler = require('../compiler'),
	Scope    = require('../../models/scope'),
	clone    = require('../../../common/utils').clone;

// TODO: remove hardcoding
var ss2Files = {
	'empty' : null,
	'defline': null,
	'defoverwrite': null
};


describe('Module: 2Stula/Compiler'.bold.underline, function () {		
	Object.keys(ss2Files).forEach(function (filename) {
		var s2Path =  join(__dirname, 'tests', filename + '.ss2'),
			code = fs.readFileSync(s2Path, { encoding: 'utf-8' });
		
		var fn = compiler(code),
			jsPath =  join (__dirname, 'results', filename + '.js');

		fs.writeFileSync(jsPath, fn);

		ss2Files[filename] = require(jsPath);
	});

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
			expect(resG).toBe(undefined);
			expect(resE).toBe(undefined);
		});

		it('should not change original object store', function () {
			expect(glob).toEqual(cloneG);
			expect(el).toEqual(cloneE);
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
			expect(resG).toBe(10);
			expect(resE).toBe(10);
		});

		it('should change original value', function () {
			expect(glob.store.get('x')).not.toEqual(cloneG.store.get('x'));
		});

		it('should set a value', function () {
			expect(glob.store.get('x')).toBe(10);
			expect(el.store.get('x')).toBe(10);
		});
	});
});