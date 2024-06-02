
import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from '@fancyapps/ui';

export function libraries ()
{
	Chart.register(...registerables);

	window.Grid     = Grid;
	window.Chart    = Chart;
	window.Fancybox = Fancybox;
}

libraries();
