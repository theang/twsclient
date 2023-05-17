import { h } from 'preact';
import Chart from 'components/chart'
import style from './style.css';
import { TickerDropdown } from 'components/dropdown/custom';

const Home = () => {
	return (
		<div class={style.home}>
			<a href="http://localhost:8080">
				<img src="../../assets/tws-logo.svg" alt="TWS Logo" height="160" width="160" />
			</a>
			<h1>TWS</h1>
			<TickerDropdown />
		</div>
	);
};

interface ResourceProps {
	title: string;
	description: string;
	link: string;
}

const Resource = (props: ResourceProps) => {
	return (
		<a href={props.link} class={style.resource}>
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
};

export default Home;
