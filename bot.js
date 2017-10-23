const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "vox "

var msg = []
var dispatcher = null
var voice = null

function playSentence(message)
{
    voice = message.member.voiceChannel
    voice.join().then(function(connection){
        dispatcher = connection.playFile("path-to-audio"+msg+".wav/.ogg")
        console.log("Going through words.")
        dispatcher.on('end', function() {
            if(msg[0])
            {
                playSentence(message)
            }else{
                connection.disconnect()
            }
        })
    })
}

client.on("message", function(message) {
    if(message.content.startsWith(prefix))
    {
        if(!message.member.voiceChannel)
        {
            message.channel.sendMessage("NO! I'm not joinning it without you being in it!!!!11!!11!1!!1!111!1")
        }else{
            msg = message.content.split(' ')
            playSentence(message)
        }
    }

})

client.on("ready", function(message) {
    console.log("Ready!");
})

client.login("token")
