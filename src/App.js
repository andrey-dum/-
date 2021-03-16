import { useState, useEffect } from 'react'
import Ping from './components/Ping';
import { getStats } from './util/helper';

let socket = new WebSocket("wss://trade.trademux.net:8800/?password=1234");

function App() {

	const [data, setData] = useState([])
	const [stats, setStats] = useState([])

	useEffect(() => {

		return () => {
			socket.close()
		}
	}, [])


	const start = () => {

		socket.onopen = () => {
			console.log("[open] Соединение установлено");
		};

		socket.onclose = (event) => {
    	console.log('onclose', event);
			socket.close()
  	}

		socket.onerror = function(error) {
			console.log(`[error] ${error.message}`);
			socket.close()
		};

    socket.onmessage = (event) => {
			const response = JSON.parse(event.data);
      setData(prev => [...prev, response]);
    };

  }

	const handleClick = () => {
		getStats(data, stats, setStats)
  }

	const clearStatsTable = () => {
		setStats([])
  }


  return (
    <div className="app">

			<Ping />

			<hr />

			<div className="">
				<div>
					<h1 style={{padding: 40, color: '#666'}}>Нажмите старт для получения данных!</h1>
						<button onClick={start}>Старт</button>
						<button onClick={handleClick} disabled={!data.length}>Статистика</button>
						<button onClick={clearStatsTable} disabled={!stats.length}>Очистить статистику</button>
					</div>

					{ stats.length ?
					<table>
						<thead>
							<tr>
								<th>Среднее значение</th>
								<th>Cтандартное отклонение</th>
								<th>Мода</th>
								<th>Медиана</th>
								<th>Потери</th>
								<th>Время</th>
							</tr>
					</thead>
						<tbody>
							{stats.map((el, i) => (
								<tr key={i}>
									<td>{el.mean.toFixed(3)}</td>
									<td>{el.standardDeviation.toFixed(3)}</td>
									<td>{el.modes}</td>
									<td>{el.med}</td>
									<td>{el.lost}</td>
									<td>{el.duration.toFixed(3)}</td>
								</tr>
							))
							}
						</tbody>
					</table>
					: <h1 style={{padding: 40, color: '#ddd'}}>Статистики пока нет!</h1> }
				</div>
			</div>
  );
}

export default App;




