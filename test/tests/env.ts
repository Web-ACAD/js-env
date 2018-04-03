import {loadEnv, EnvSchema} from '../../lib';
import {expect} from 'chai';
import * as path from 'path';


const env = path.resolve(__dirname, '..', 'data', 'test.env');


describe('loadEnv()', () => {

	it('should load env file without schema', () => {
		expect(loadEnv(env)).to.be.eql({
			STRING_VALUE: 'Hello world',
			NUMBER_VALUE: '42',
			BOOLEAN_LOWERCASE_VALUE: 'false',
			BOOLEAN_UPPERCASE_VALUE: 'TRUE',
			BOOLEAN_NUMERIC_VALUE: '1',
		});
	});

	it('should throw an error if key from schema does not exists in env file', () => {
		const schema: EnvSchema = {
			UNKNOWN_KEY: {
				type: 'string',
			},
		};

		expect(() => {
			loadEnv(env, schema);
		}).to.throw(Error, `loadEnv: key UNKNOWN_KEY from provided schema does not exists in ${env}`);
	});

	it('should load env file with schema', () => {
		const schema: EnvSchema = {
			STRING_VALUE: {
				type: 'string',
			},
			NUMBER_VALUE: {
				type: 'number',
			},
			BOOLEAN_LOWERCASE_VALUE: {
				type: 'boolean',
			},
			BOOLEAN_UPPERCASE_VALUE: {
				type: 'boolean',
			},
			BOOLEAN_NUMERIC_VALUE: {
				type: 'boolean',
			},
		};

		expect(loadEnv(env, schema)).to.be.eql({
			STRING_VALUE: 'Hello world',
			NUMBER_VALUE: 42,
			BOOLEAN_LOWERCASE_VALUE: false,
			BOOLEAN_UPPERCASE_VALUE: true,
			BOOLEAN_NUMERIC_VALUE: true,
		});
	});

	it('should include only values from schema', () => {
		const schema: EnvSchema = {
			NUMBER_VALUE: {
				type: 'number',
			},
		};

		expect(loadEnv(env, schema)).to.be.eql({
			NUMBER_VALUE: 42,
		});
	});

});
