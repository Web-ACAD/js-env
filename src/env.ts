import * as dotenv from 'dotenv';


export declare interface EnvSchema
{
	[key: string]: 'string' | 'number' | 'boolean',
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
			if (typeof envParsed[key] === 'undefined') {
				throw new Error(`loadEnv: key ${key} from provided schema does not exists in ${file}`);
			}

			const type = schema[key];
			const value = envParsed[key];

			if (type === 'string') {
				result[key] = value;

			} else if (type === 'number') {
				result[key] = Number(value);

			} else if (type === 'boolean') {
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
