var botToken = 'xoxb-297417220770-bpYXv6GFR0fyjFomRzgi6oWz';

console.log(botToken)



var chatlioBotID = "B8USNDTS9"; 



console.log(chatlioBotID)



var RtmClient = require('@slack/client').RtmClient;

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;



var rtm = new RtmClient(botToken);



//dictionarys 

var firstDict = ['business', 'sweetplan'];

var secondDict = ['security', 'flexability', 'cost'];

var thirdDict = ['schedule', 'call'];

var fourthDict = ['yes']; 

var fifthDict = ['thank you', 'bye'];



//regulars

var regular = [	/[A-Za-z?-??-???]+(\s+[A-Za-z?-??-???]+)/ /*name + secondname*/, 

		/((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ /*phone*/,

		/((\d{2}|\d{1}):\d{2})+\s+(am|pm)/ /*time*/];



//day of weeks

var days = ['monday','tuesday', 'wednesday','thursday','friday','saturday',

'sunday','today','tomorrow','yesterday','fortnight'];



//global

var name, phone, time, day ;



rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

	console.log('I\'ve got a message');

	

	//first message (about Sweetplan)

	if(containAND(message.text, firstDict)){

		rtm.sendMessage('Sure! Here is the link to Sweetplan offering details. What are the most important qualities you look for in choosing solution for your business?', message.channel);

		

	}



	//second message (qualities)

	if(containOR(message.text, secondDict)){

		//get qualities and save it into the mail (?)

		rtm.sendMessage('Great! I could send you some solution details and case studies, and I could organize an appointment for a specialist to get in touch with you directly.', message.channel);

		

	}



	//third message (about recall)

	if(containAND(message.text, thirdDict)){

		rtm.sendMessage('I just need to collect some information: could you please provide your full name and contact number?', message.channel);

	}



	//fourth message (parsing name and phone)

	if(message.text.match(regular[0]) && message.text.match(regular[1])){

		name = message.text.match(regular[0])[0];

		phone = message.text.match(regular[1])[0];



		rtm.sendMessage('We captured your contact information. Is there a convenient time that would work well for you?', message.channel);



		console.log(name);

		console.log(phone);

	}



	//fifth message (parsing date)

	if(containOR(message.text, days) && containOR(message.text, fourthDict)){

		day = extractDay(message.text, days);

		time = message.text.match(regular[2])[0];



		console.log(time);

		console.log(day);

		

		rtm.sendMessage('Great, our specialist will contact you at ' + day + ' ' + time + '. Is there anything else I can help you with today?', message.channel); //mage printf for this response

	}

	

	if(containOR(message.text,fifthDict)){

		rtm.sendMessage('You\'re welcome! Have a nice day!', message.channel);

	}

	//after the dialog we need to send data?

});



function containAND(str, dict){

	var bool = 1;	

	for(var i = 0; i < dict.length; i++){

		if(!(str.toLowerCase().indexOf(dict[i]) + 1)){

			bool = 0;

		}

	}

	return bool;

}



function containOR(str, dict){

	var bool = 0;	

	for(var i = 0; i < dict.length; i++){

		if(str.toLowerCase().indexOf(dict[i]) + 1){

			bool = 1;

		}

	}

	return bool;

}



function extractDay(str, days){

	var res;

	for (var i = 0; i < days.length; i++) {

		if(str.toLowerCase().indexOf(days[i]) + 1){

			res = days[i][0].toUpperCase() + days[i].substring(1, days[i].length);

			return res;

		}

	}

	return null;

}



rtm.start();

