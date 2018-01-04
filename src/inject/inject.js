chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			setTimeout(function() {
				console.log('hi');
				var stats = document.querySelectorAll('.stat-line');

				var replacers = [
					[' AER', '*Aerial(s) Won'],
					[' GC', '*Goal(s) Conceded'],
					[' CC', 'Key Passes'],
					[' SOT', 'Shot(s) on Target'],
					[' SCR', 'Successful Cross(es)'],
					[' STO', 'Successful Dribbles'],
					[' SOT', 'Shot(s) on Target'],
					[' DIS', 'Dispossessed'],
					[' OG', 'Own *Goals'],
					[' CS', 'Clean Sheet'],
					[' SV', 'Saves'],
					[' PS', 'Penalties Saved'],
					[' INT', 'Interception(s)'],
					[' TW', 'Tackle(s) Won'],
					[' PS', 'Penalty Saved'],
					[' YC', 'Yellow Card(s)'],
					[' RC', 'Red Card'],
					[' CLR', 'Effective Clearance(s)'],
					[' M', 'Minutes Played'],
					[' G', 'Goal(s)'],
					[' A', 'Assist(s)']
				];

				var replacerObj = {
					AER : {
							label: 'Aerial(s) Won',
							value: 1
						},
					GC  : {
							label: 'Goal(s) Conceded',
							value: 1
						},
					CC  : {
							label: 'Key Passes',
							value: 1
						},
					SOT : {
							label: 'Shot(s) on Target',
							value: 1
						},
					SCR : {
							label: 'Successful Cross(es)',
							value: 1
						},
					STO : {
							label: 'Successful Dribbles',
							value: 1
						},
					SOT : {
							label: 'Shot(s) on Target',
							value: 1
						},
					DIS : {
							label: 'Dispossessed',
							value: 1
						},
					OG  : {
							label: 'Own *Goals',
							value: 1
						},
					CS  : {
							label: 'Clean Sheet',
							value: 1
						},
					SV  : {
							label: 'Saves',
							value: 1
						},
					PS  : {
							label: 'Penalties Saved',
							value: 1
						},
					INT : {
							label: 'Interception(s)',
							value: 1
						},
					TW  : {
							label: 'Tackle(s) Won',
							value: 1
						},
					PS  : {
							label: 'Penalty Saved',
							value: 1
						},
					YC  : {
							label: 'Yellow Card(s)',
							value: 1
						},
					RC  : {
							label: 'Red Card',
							value: 1
						},
					CLR : {
							label: 'Effective Clearance(s)',
							value: 1
						},
					M   : {
							label: 'Minutes Played',
							value: 1
						},
					G   : {
							label: 'Goal(s)',
							value: 1
						},
					A   : {
							label: 'Assist(s)',
							value: 1
						}
				};


				stats.forEach( function(line) {
					line.innerHTML = line.innerHTML.trim();

					// Only make changes if there are stats
					if (
						line.innerText.search('AM') === -1 &&
						line.innerText.search('PM') === -1 &&
						line.innerText.search('stats') === -1
					) {
						scores = [];
						newScores = '';

						line.innerHTML.split(', ').forEach( function(item) {
							scores.push( item.split(' ') );
						})

						scores.forEach( function(score) {

							var n = score[0];
							var label =      replacerObj[score[1]].label;
							var scores = n * replacerObj[score[1]].value;

							newScores += `<div class="sl">
								<span class="n">${n}</span>
								<span class="lbl">${label}</span>
							</div>`;

							// <span class="score">${scores}</span>
						});

						line.innerHTML = newScores;
					}
				})
			}, 3000);


		}
	}, 10);
});
