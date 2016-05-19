console.log('Start');
// Get npm modules discord.js
try {
	var Discord = require("discord.js");
	console.log("LIB : discord.js [OK]");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get npm modules request
try {
	var request = require("request");
	console.log("LIB : request [OK]");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get authentication data
try {
	var AuthDetails = require("./auth.json");
	console.log("FILE : auth.json [OK]");
} catch (e){
	console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
	process.exit();
}

// File exists
var fs = require('fs');
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

//  Define & Connect Bot on Discord
try {
	var mybot = new Discord.Client();
	console.log("OBJ : Discord.Client() [OK]");
} catch (e){
	console.log("Error Discord.Client");
	process.exit();
}

// Define message
mybot.on("message", function(message) {
	var input = message.content.toLowerCase().trim();

	// le bloc qui suit permet de charger à la volée des commandes custom
	if (input.startsWith("!")) { // les commandes démarrent avec !
		var command = input.replace("!",""); // je supprime le !
		if (command.indexOf(" ") > -1) { // si il y a un espace c'est qu'il y a une sous commande, donc ne prendre que la commande !commande
			command = command.substring(0, command.indexOf(' ')).trim();
		}

		// Chargement dynamique du module
		var filename = "./message/message_" + command + ".js";
		if (fileExists(filename)){
			console.log(filename + " [load ok]");
			require(filename).message(message, mybot, input);
		}
	}

	// Commande List
	if(input === "!command") {
		mybot.reply(message, "Hey voici la liste des choses que je peux faire : !hello \n !twitter");
	}


// bot function close
});

mybot.on('ready', () => {
	console.log("Bot is ready.");
});

// login Discord
mybot.loginWithToken(AuthDetails.discord.token).then(bot_success).catch(bot_error);

function bot_success(token){
    // handle success
}

function bot_error(error){
    // handle error
		console.log('ERROR');
		console.log(error);
}
