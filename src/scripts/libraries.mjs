
import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from '@fancyapps/ui';

import panic from 'panic-overlay';
import knex from 'knex-browser';


function libraries ()
{
	// вывод ошибок на экран
	panic.configure();

	// необходимая строка для библиотеки графиков
	Chart.register(...registerables);

	window.knex     = knex;
	window.Grid     = Grid;
	window.Chart    = Chart;
	window.Fancybox = Fancybox;
}

libraries();
