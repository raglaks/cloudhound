var Twit = require('twit')
var express = require('express')
require('./config.js')
var http = require('http');

var t = new Twit({

	consumer_key : CONSUMER_KEY 
	, consumer_secret : CONSUMER_SECRET 
	, access_token: ACCESS_TOKEN
	, access_token_secret: ACCESS_TOKEN_SECRET

})

var	media = [
	'indie_space',
	'indierocks',
	'sabotage_mag',
	'FILTERMexico',
	'rollingstonemx',
	'revistamarvin',
	'lifeboxset',
	'iradiatec',
	'ibero909fm',
	'mexicoindie',
	'tcly',
	'timeoutmexico',
	'8106',
	'rm917fm',
	'los_amateurs',
	'revistapicnic',
	'warpmagazine',
	'sicariotv',
	'noiseymx',
	'rocketsmusik',
	'quarterpress',
	'lapoplife',
	'revistafreim',
	'rawpowerradio',
	'reactor105',
	'kanikanimx',
	'carcomarecords',
	'resistenciadf',
	'everythinglive',
	'tonifrancois',
	'chilangocom',
	'musicachilango',
	'lfanzine',
	'sopitas',
	'RKOpuntoFM',
	'sonidototal',
	'formularockmx',
	'paranoidhominid'
	]

var bannedStrings = [
	'ow.ly/Jp3D4',
	'http://t.co/JXdGJnetFz',
	'pelostiesos',
	]

var bitch = /(vendo|me sobra)/i

//AQUI OCURRE LO CHINGON
//
//
//---------------------------------------------------------------------

var app = express()

app.set('port', (process.env.PORT || 5001))

app.get('/', function(request, response) {
  response.send("<style>body{background-color:#ffcbc0; text-align: center; font-family: helvetica}</style><h1>"+eventos+"</h1>");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

console.log(eventos)
narcoListen(generateParameterArray(eventos))


//---------------------------------------------------------------------//
//---------------------------------------------------------------------//

function generateParameterArray (keyword){
	var paramArray = [];
	var i = 0;
	while(i < keyword.length){
		paramArray = paramArray.concat(generateWordList(keyword[i]));
		i++;
	}
		return paramArray;
	}

function generateWordList (keyword){
	var wordlist = [
	 	keyword + ' boletos',
		keyword + ' boleto',	
		keyword + ' regalaremos',
		keyword + ' regale',
		keyword + ' regalare',
		keyword + ' regalar',
		keyword + ' pendientes',
		keyword + ' pase',
		keyword + ' pases',
		keyword + ' ganar',
		keyword + ' abono',
		keyword + ' entradas',
		keyword + ' entrada',
		keyword + ' tengo',
		keyword + ' tenemos',
		keyword + ' cortesia',
		keyword + ' cortesias',
		keyword + ' accesos',
		keyword + ' acceso',
		keyword + ' sortear',
		keyword + ' sortearemos',
		keyword + ' invitacion',
		keyword + ' invitaciones',
		keyword + ' pulsera',
		keyword + ' pulseras',
		keyword + ' rifa',
		keyword + ' pendientes redes',
		keyword + ' pendiente redes',
		keyword + ' quiere',
		keyword + ' quieres',
		keyword + ' gratis',
		keyword + ' rifar',
		keyword + ' rifare',
		keyword + ' rifaremos',
		keyword + ' sencillo',
		keyword + ' sencilla',
		keyword + ' sorpresa',
		keyword + ' sorpresas',
		keyword + ' dinámica',
		keyword + ' trivia',
		'tortapuerca'
		]

		return wordlist;
	}

function vowelTest(s) {
  return (/^[aeiou]$/i).test(s);
}

function vvowelTest(c){
	return ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I','O', 'U'].indexOf(c) !== -1
}

function pasateDeVerga(text){
	var pasada = ""

	for(i = 0; i < text.length; i++){
		console.log(text[i])
		if(vowelTest(text[i]))
			continue
		else
			pasada += text[i]
	}

	console.log(pasada)
	return pasada
}
	
function filterString(text){
	for(i = 0; i < bannedStrings.length; i++){
		console.log(bannedStrings[i] + ' ' + text)
		if(text.search(bannedStrings[i]) < 0)
			return false;
		else
			return true;		
	}
}

function isThisRelevant(text, keywords){
	for(i = 0; i < keywords.length; i++){
		if(text.search(keywords[i]) < 0)
			return false;
		else
			return true;
	}
}

function filterUsers(user)
{
	switch(user)
	{
		case 'tecavaret':
			return 1;
			break;
		case 'zafiroperu':
			return 1;
			break;
		default:
			return 0;
			break;
	}
}

function isThisRT(tuit){
	if(tuit.indexOf("RT ") == 0)
		return true;
	else
		return false;
	}

function isThisMedia(screen_name)
{
	var i = 0
	while(i++ < media.length)
		if(screen_name == media[i])
			return true
	return false
}

function isThisRevendedor(tuit){
	console.log("OYEME WE")
	if(tuit.search("vendo") > 0)
		return true;
	else if(tuit.search("me sobra") > 0)
		return true;
	else if(tuit.search("Vendo") > 0)
		return true;
	else
		return false;
	}

function doesItLookLikeABitch(tuit){

}

function printTweet(tweet){
	console.log(
	'\nUser: @' + tweet.user.screen_name
	+ '\nText: ' + tweet.text
	+ '\nid: ' + tweet.id
	+ '\nid_str: ' + tweet.id_str
	+ '\nHora: ' + tweet.created_at
	+ '\n\n'
	);
	}

function createStatus(tweet)
{
		var status = 	tweet.user.screen_name
			+	' '
			+	tweet.user.followers_count
			+	' @'
			+	DM_RECEIVER
			+	' https://twitter.com/'
			+	tweet.user.screen_name
			+	'/status/'
			+	tweet.id_str
			+ 	' '
			+ 	tweet.user.description
			;
		return status;
}

function sendSMS(text){
	var client = require('twilio')(TWILIO_SID, TWILIO_TOKEN);
		client.messages.create({
		body: text,
		to: TWILIO_TO,
		from: TWILIO_FROM
		}, function(err, message) {
			if(err)
				console.log("Twilio error: " + err);
		console.log("Twilio SID: " + message.sid);
		});
}

function createTweetURL(tweet){
	return 'https://twitter.com/'
			+	tweet.user.screen_name
			+	'/status/'
			+	tweet.id_str;
}

function createSMStext(tweet){
	return tweet.user.screen_name + ' ' + createTweetURL(tweet)
}

function itsOn(){
	//sendSMS("que pedo wero");

	 t.post('statuses/update',
                {
					status: 'que pedo wero @'
					+ DM_RECEIVER
					+ ' '
					+ Date().toString()
                },
                function(err,reply){}
                )

}

function sendDM(text){
	t.post("direct_messages/new",
	{
		screen_name: DM_RECEIVER,
		text: text
	},function(err,reply){
		if(err)
			console.log(err);
	});
}

function set_dm_metadata(tweet){
	var metadata = tweet.user.screen_name
		+ ' '
		+ createTweetURL(tweet)
		+ ' '
		+ tweet.created_at;

	return metadata;
}

function getUserId(screen_name){
	var id = 2;
	t.get('users/show',
		{ screen_name: screen_name },
		function(err,reply){
			if(err)
				console.log(err)
			else{
				//console.log(id)
				id = reply.id;
			}
		}
	)
	console.log(id)
	return id;
}

function narcoTrack(user, regex){
	var stream = t.stream('statuses/filter',{
		follow: user
	})

	stream.on('tweet', function(tweet){
		printTweet(tweet)
		if(tweet.user.id == user){
			var smsText = createSMStext(tweet)

			if(regex.test(tweet.test)){
				sendSMS(pasateDeVerga(tweet.text))
				"!! ".concat(smsText)
			}

			sendSMS(smsText)

			sendDM(smsText)
			sendDM(tweet.text)

			t.post('statuses/update',
                {
					status: createStatus(tweet)
                },
                function(err,reply){
                	console.log(err)
                }
                )
		}
	})

	stream.on('limit', function(m){
		console.log(m)
	})

	stream.on('disconnect', function(m){
		console.log(m)
	})

	stream.on('warning', function(m){
		console.log(m)
	})


	stream.on('direct_message', function(m){
		console.log(m)
	})

	console.log('narcotracking: '+user)
}

function narcoListen(keywords){
	//console.log(keywords)
	var stream = t.stream('statuses/filter',{
		track: keywords 
	 })

	stream.on('tweet', function(tweet)
		{
			printTweet(tweet);
  			if( filterString(tweet.text) || filterUsers(tweet.user.screen_name) || tweet.retweet_count > 0 || isThisRT(tweet.text) || isThisRevendedor(tweet.text))
  				console.log('no procede')
        	
        	else
        	{
        		if(isThisMedia(tweet.user.screen_name)){
        			console.log("Este we es cacagrande");
        			sendDM(tweet.text);
        			sendDM(set_dm_metadata(tweet));
        		}

                t.post('statuses/update',
                {
					status: createStatus(tweet)
                },
                function(err,reply){
                	console.log(err)
                }
                )

                suspects = suspects.concat(tweet.user.screen_name + "\n " + tweet.text + "\n " + tweet.created_at + "\n https://twitter.com/"+tweet.user.screen_name+"/status/"+tweet.id_str+"\n");
        }

		})
}

