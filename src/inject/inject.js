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


				stats.forEach( function(line) {
					// Wrapper for styling
					line.innerHTML = '<div class="wrapper">' + line.innerHTML + '</div>';

					// Only make changes if there are stats
					if (
						(
							line.innerText.search('AM') === -1 && line.innerText.search('PM') === -1
						) ||
						line.innerText === "No stats recorded."
					) {
						// Remove commas
						line.innerHTML = line.innerHTML.replace( /,/g, '' );

						replacers.forEach( function(rep) {
							line.innerHTML = line.innerHTML.replace( rep[0], ' ' + rep[1] + '<br />' );
						});

						// Remove special characters for replace to work
						line.innerHTML = line.innerHTML.replace( /\*/g, '' );
					}
				})
			}, 3000);


		}
	}, 10);
});
