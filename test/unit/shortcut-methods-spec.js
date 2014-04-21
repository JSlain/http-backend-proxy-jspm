'use strict';

var HttpBackend = require('../lib/http-backend-protractor-proxy');

describe('Shortcut Method JavaScript Generation', function(){

	var browser;
	var proxy;

	beforeEach(function () {

		browser = { executeScript: function(){} };
		spyOn(browser, 'executeScript');

		proxy = new HttpBackend(browser);

	});

	//GET, HEAD and DELETE all have the same signature so use the same tests
	['GET', 'HEAD', 'DELETE'].forEach(function(method){
		(function(method){

			describe('the when' + method + ' method', function () {

				var methodName = ['when' + method]
				var methodUnderTest;

				beforeEach(function () {
					methodUnderTest = proxy[methodName];
				});

				it('should generate the correct JavaScript when called with a url only.', function () {
					methodUnderTest('/url').passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url").passThrough();');
				});

				it('should generate the correct JavaScript when called with a url function.', function () {
					methodUnderTest(function(url){return url.indexOf('/api') == 0;}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '(function (url){return url.indexOf(\'/api\') == 0;}).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url regex.', function () {
					methodUnderTest(/\/url/i).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '(/\\/url/i).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url and headers', function () {
					methodUnderTest('/url', {header:'value'}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url", {"header":"value"}).passThrough();');
				});

			});

		})(method);
	});

	//POST, PUT and PATCH all have the same signature so use the same tests
	['POST', 'PUT', 'PATCH'].forEach(function(method){
		(function(method){

			describe('the when' + method + ' method', function () {

				var methodName = ['when' + method]
				var methodUnderTest;

				beforeEach(function () {
					methodUnderTest = proxy[methodName];
				});

				it('should generate the correct JavaScript when called with a url only.', function () {
					methodUnderTest('/url').passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url").passThrough();');
				});

				it('should generate the correct JavaScript when called with a url function.', function () {
					methodUnderTest(function(url){return url.indexOf('/api') == 0;}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '(function (url){return url.indexOf(\'/api\') == 0;}).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url regex.', function () {
					methodUnderTest(/\/url/i).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '(/\\/url/i).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url and data object.', function () {
					methodUnderTest('/url', {key:'value'}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url", {"key":"value"}).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url and data regex.', function () {
					methodUnderTest('/url', /pattern/g).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url", /pattern/g).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url, data and headers object.', function () {
					methodUnderTest('/url', 'string data', {header:'value'}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url", "string data", {"header":"value"}).passThrough();');
				});

				it('should generate the correct JavaScript when called with a url, data and headers function.', function () {
					methodUnderTest('/url', 'string data', function(headers){return !!headers.my-header;}).passThrough();
					expect(browser.executeScript).toHaveBeenCalledWith(
						'window.$httpBackend.' + methodName + '("/url", "string data", function (headers){return !!headers.my-header;}).passThrough();');
				});

			});

		})(method);
	})

	describe('the whenJSONP method', function () {

		it('should generate the correct JavaScript when called with a url only.', function () {
			proxy.whenJSONP('/url').passThrough();
			expect(browser.executeScript).toHaveBeenCalledWith(
				'window.$httpBackend.whenJSONP("/url").passThrough();');
		});

		it('should generate the correct JavaScript when called with a url function.', function () {
			proxy.whenJSONP(function(url){return url.indexOf('/api') == 0;}).passThrough();
			expect(browser.executeScript).toHaveBeenCalledWith(
				'window.$httpBackend.whenJSONP(function (url){return url.indexOf(\'/api\') == 0;}).passThrough();');
		});

		it('should generate the correct JavaScript when called with a url regex.', function () {
			proxy.whenJSONP(/\/url/i).passThrough();
			expect(browser.executeScript).toHaveBeenCalledWith(
				'window.$httpBackend.whenJSONP(/\\/url/i).passThrough();');
		});

	});

});