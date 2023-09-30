import 'module-alias/register';
import {addAliases} from 'module-alias';

addAliases({
	'@': `${__dirname}/src`,
	'@controllers': `${__dirname}/src/controllers`,
	'@models': `${__dirname}/../../rechord-common/models`,
	'@utility': `${__dirname}/src/utility`,
	'@routes': `${__dirname}/src/routes`,
});