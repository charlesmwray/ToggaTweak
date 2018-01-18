chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {

		var updateScoreStyles = function() {
			message.add('Loading...');

			setTimeout(function() {
				var stats = Array.prototype.slice.call(
					document.querySelectorAll('team-stats table tbody tr:not(:first-of-type)')
				);

				var replacerObj = {
					AER : {
							label: 'Aerial(s) Won',
							points: {
								GOA: 1,
								DEF: 1,
								MID: .5,
								FOR: .5
							}
						},
					GC  : {
							label: 'Goal(s) Conceded',
							points: {
								GOA: -2,
								DEF: -2,
								MID: 0,
								FOR: 0
							}
						},
					CC  : {
							label: 'Key Passes',
							points: {
								GOA: 6,
								DEF: 2,
								MID: 2,
								FOR: 2
							}
						},
					SCR : {
							label: 'Successful Cross(es)',
							points: {
								GOA: 1,
								DEF: 1,
								MID: 1,
								FOR: 1
							}
						},
					STO : {
							label: 'Successful Dribbles',
							points: {
								GOA: 1,
								DEF: 1,
								MID: 1,
								FOR: 1
							}
						},
					SOT : {
							label: 'Shot(s) on Target',
							points: {
								GOA: 2,
								DEF: 2,
								MID: 2,
								FOR: 2
							}
						},
					DIS : {
							label: 'Dispossessed',
							points: {
								GOA: -1.5,
								DEF: -1.5,
								MID: -1.5,
								FOR: -1.5
							}
						},
					OG  : {
							label: 'Own *Goals',
							points: {
								GOA: -9,
								DEF: -9,
								MID: -9,
								FOR: -9
							}
						},
					CS  : {
							label: 'Clean Sheet',
							points: {
								GOA: 8,
								DEF: 6,
								MID: 1,
								FOR: 0
							}
						},
					SV  : {
							label: 'Saves',
							points: {
								GOA: 2,
								DEF: 0,
								MID: 0,
								FOR: 0
							}
						},
					PS  : {
							label: 'Penalties Saved',
							points: {
								GOA: 8,
								DEF: 0,
								MID: 0,
								FOR: 0
							}
						},
					INT : {
							label: 'Interception(s)',
							points: {
								GOA: 1,
								DEF: 1,
								MID: 1,
								FOR: 1
							}
						},
					TW  : {
							label: 'Tackle(s) Won',
							points: {
								GOA: 1,
								DEF: 1,
								MID: 1,
								FOR: 1
							}
						},
					PS  : {
							label: 'Penalty Saved',
							points: {
								GOA: 10,
								DEF: 20,
								MID: 30,
								FOR: 40
							}
						},
					YC  : {
							label: 'Yellow Card(s)',
							points: {
								GOA: -3,
								DEF: -3,
								MID: -3,
								FOR: -3
							}
						},
					RC  : {
							label: 'Red Card',
							points: {
								GOA: -7,
								DEF: -7,
								MID: -7,
								FOR: -7
							}
						},
					CLR : {
							label: 'Effective Clearance(s)',
							points: {
								GOA: .25,
								DEF: .25,
								MID: 0,
								FOR: 0
							}
						},
					M   : {
							label: 'Minutes Played',
							points: {
								GOA: 0,
								DEF: 0,
								MID: 0,
								FOR: 0
							}
						},
					G   : {
							label: 'Goal(s)',
							points: {
								GOA: 10,
								DEF: 10,
								MID: 9,
								FOR: 9
							}
						},
					A   : {
							label: 'Assist(s)',
							points: {
								GOA: 6,
								DEF: 6,
								MID: 8,
								FOR: 9
							}
						}
				};

				stats.forEach( function(line) {
					var cells = line.querySelectorAll('td');
					var position = cells[0].querySelector('.position').innerHTML.trim()
					var statLine = cells[2].querySelector('.stat-line');
					var scores = [];
					var newScores = '';

					// Only make changes if there are stats
					if (
						statLine &&
						statLine.innerText.search('AM') === -1 &&
						statLine.innerText.search('PM') === -1 &&
						statLine.innerText.search('stats') === -1
					) {
						statLine.innerText.split(', ').forEach( function(item) {
							scores.push( item.split(' ') );
						})

						scores.forEach( function(score) {

							var n = score[0];
							var label = replacerObj[score[1]].label;
							var scores = score[1] !== 'M' ? n * replacerObj[score[1]].points[position] : ''

							newScores += `<div class="sl">
								<span class="n">${n}</span>
								<span class="lbl">${label}</span>
								<span class="score">${scores}</span>
							</div>`;

							// <span class="score">${scores}</span>
						});

						statLine.innerHTML = newScores;
					}
				});

				message.remove();

			}, 3000);

		}

		var message = {
			getMessage: function(copy) {
				var modal = document.createElement("div");
				var message = document.createElement("div");

				message.appendChild(
					document.createTextNode( copy || 'Loading...')
				);

				modal.appendChild( message );

				modal.classList.add('tt-modal');
				message.classList.add('tt-message');

				return modal
			},
			add: function(copy) {
				var target = document.querySelector('.background');

				document.querySelector('body').classList.add('tt-has-modal');

				target.parentNode.insertBefore( this.getMessage(copy), target);
			},
			remove: function() {
				var modal = document.querySelector('.tt-modal');

				document.querySelector('body').classList.remove('tt-has-modal');

				modal && modal.parentNode.removeChild(modal);
			}
		}

		// if (document.readyState === "complete") {
		if ($('team-stats table tbody tr td').length !== 0) {
			clearInterval(readyStateCheckInterval);

            // add event listener to trigger style changes
			document.querySelector('.fa.fa-chevron-left').addEventListener('click', function() { setTimeout(updateScoreStyles, 500) } );
			document.querySelector('.fa.fa-chevron-right').addEventListener('click', function() { setTimeout(updateScoreStyles, 500) } );

			// delay score style changes
			setTimeout(updateScoreStyles, 500);

		} else {
			message.remove();
		}
	}, 10);
});
