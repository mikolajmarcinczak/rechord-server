import 'module-alias/register';
import {addAliases} from 'module-alias';

addAliases({
	'@': `${__dirname}/src`,
	'@controllers': `${__dirname}/controllers`,
	'@models': `${__dirname}/../../rechord-common/models`,
	'@utility': `${__dirname}/utility`,
	'@routes': `${__dirname}/routes`,
});