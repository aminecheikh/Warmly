
			/* JS comes here */
			const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
			const apiUrl = 'https://api.yepic.ai/v1/videos';
			const url = proxyUrl + 'https://crossorigin.me/' + apiUrl;
			let B = false ; 
						
		    function runSpeechRecognition() {
				B= false
		        // get output div reference
		        var output = document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("action");


                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            
                // This runs when the speech recognition service starts
				recognition.onstart = function() {
					action.innerHTML = "<p><small>listening, please speak...</small></p>";
				};

				recognition.onspeechend = function() {
					action.innerHTML = "<p><small>stopped listening, hope you are done...</small></p>";
					recognition.stop();
				};

              
                // This runs when the speech recognition service returns result
				
                recognition.onresult = function(event) {
					const StopButton = document.getElementById('StopButton');
                    var transcript = event.results[0][0].transcript;
                    var confidence = event.results[0][0].confidence;
                    var output = document.getElementById("transcript-output");
					output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
					


					function responseAI(response){
						var text = ""
						for (var res in response['choices']) {
							text += response['choices'][res]['text'];
						}
						console.log(text)
						let speech = new SpeechSynthesisUtterance();
						speech.lang = "en-US";
						
						speech.text = text;
						speech.volume = 1;
						speech.rate = 1;
						speech.pitch = 1;
						
						window.speechSynthesis.speak(speech);

						
					}
					fetch('https://api.openai.com/v1/completions', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer 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',
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ "model": "text-davinci-003", "prompt": transcript, "max_tokens": 1000 })
					})
					.then(response => response.json())
					.then((response) => {
						const apiKey = '509cf5af-1e3f-4a81-8589-6f36e0e1eb57';

						const data = ({
							videoFormat: 'mp4',
							voiceId: 'en-US-TonyNeural',
							avatarId: 'c7ba1ea8-1047-463c-b498-1d0197a0e01e',
							script: response.choices[0].text,
							videoName: 'test'
						})

						const options = {
							method: 'POST',
							headers: {
								accept: 'application/json',
								'content-type': 'application/json',
								'X-API-Key': 'b2bde18d-90a5-4178-a45e-4452678c19a9'
							},
							body: JSON.stringify(data)
						};
						console.log(data.script); 

						fetch('https://fast-video-api-vktictsuea-nw.a.run.app/api/v1/videos', options)
							.then(response => {
								if (!response.ok) {
									throw new Error('Network response was not ok');
								}
								return response.json();
							})
							.then(data => {
								const videoUrl = data.videoUrl;
								console.log(videoUrl)
								// var player = videojs('my-video', {
								// controls: true,
								// sources: [{
								// 	src: videoUrl,
								// 	type: 'video/mp4'
								// }]
								// });

								setTimeout(function() {
									var video = document.getElementById("generated-videos");
									var AItext = document.getElementById("AItext");
								
									video.src = videoUrl;
									video.play();
								
									AItext.textContent = data.script;
								}, 1500);
								
				

								//player.play();

							})
							.catch(error => {
								console.error('Error:', error);
							});
					})
					.catch(error => {
						console.error('Error:', error);
					});
                };
                 // start recognition
                 recognition.start();

				B=true ; 
	        }
		
			
			  


					/*fetch('https://api.openai.com/v1/completions', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer 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',
							'Accept': 'application/json',
        					'Content-Type': 'application/json',
						},
						body: JSON.stringify({ "model": "text-davinci-003", "prompt": transcript, "max_tokens": 1000 })
					})
					.then(response => response.json())
					/*.then((response) => {
						responseAI(response) ; 
					})*/
					
                
					/*const apiKey = '509cf5af-1e3f-4a81-8589-6f36e0e1eb57';

					const data = ({
							videoFormat: 'mp4',
							voiceId: 'af-ZA-AdriNeural',
							avatarId: 'f1365f5c-945f-4091-990c-c731ba5ac0f2',
							script: 'martin you the best',
							videoName: 'test'
						})
					
					const options = {
						method: 'POST',
						headers: {
							accept: 'application/json',
							'content-type': 'application/json',
							'X-API-Key': 'b2bde18d-90a5-4178-a45e-4452678c19a9'
						},
						body: JSON.stringify(data)
						};

					fetch('https://fast-video-api-vktictsuea-nw.a.run.app/api/v1/videos', options)
						.then(response => {
							if (!response.ok) {
								throw new Error('Network response was not ok');
							}
							return response.blob();
						})
						.then(blob => {
							const videoUrl = URL.createObjectURL(blob);
							const videoElement = document.createElement('video');
							videoElement.src = videoUrl;
							document.body.appendChild(videoElement);

							// Do something with the video URL, such as displaying it in a video element or downloading it
						})
						.catch(error => {
							console.error('Error:', error);
						});

						/*
					fetch(url, {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer 509cf5af-1e3f-4a81-8589-6f36e0e1eb57',
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data)
						})
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.blob();
					})
					.then(blob => {
						const videoUrl = URL.createObjectURL(blob);
						const videoElement = document.createElement('video');
						videoElement.src = videoUrl;
						document.body.appendChild(videoElement);

						// Do something with the video URL, such as displaying it in a video element or downloading it
					})
					.catch(error => {
						console.error('Error:', error);
					});*/
