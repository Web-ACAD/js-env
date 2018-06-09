import * as dotenv from 'dotenv';


export declare interface EnvSchema
{
	[key: string]: {
		type?: 'string' | 'number' | 'boolean',
		required?: boolean,
		default?: any,
	},
}


export function loadEnv<T = any>(file: string, schema?: EnvSchema): T
{
	const envData = dotenv.config({
		path: file,
	});

	if (envData.error) {
		throw envData.error;
	}

	const envParsed = <any>envData.parsed;

	if (typeof schema === 'undefined') {
		return <T>envParsed;
	}

	const result: T = <any>{};

	for (let key in schema) {
		if (schema.hasOwnProperty(key)) {
			const conf = schema[key];

			if (typeof conf.type === 'undefined') {
				conf.type = 'string';
			}

			if (typeof conf.required === 'undefined') {
				conf.required = false;
			}

			if (typeof envParsed[key] === 'undefined') {
				if (typeof conf.default !== 'undefined') {
					envParsed[key] = conf.default;

				} else {
					if (conf.required) {
						throw new Error(`loadEnv: key ${key} from provided schema does not exists in ${file}`);
					}

					result[key] = undefined;
					continue;
				}
			}

			let value = envParsed[key];

			if (typeof value !== 'string') {
				value = value.toString();
			}

			if (conf.type === 'string') {
				result[key] = value;

			} else if (conf.type === 'number') {
				result[key] = Number(value);

			} else if (conf.type === 'boolean') {
				if (value.toLowerCase() === 'false') {
					result[key] = false;

				} else if (value.toLowerCase() === 'true') {
					result[key] = true;

				} else {
					result[key] = !!value;
				}
			}
		}
	}

	return result;
}
