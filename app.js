// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: 'fc6ddf05-5e04-4c76-8110-c9272305b9bd', appPassword: 'hV0AnPbUHdDkvHLZYxdis3h' }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


// Create bot dialogs

var instructions = 'AdWords/Yahoo/Facebook/FreakOutの広告について知りたい事を質問して下さい。質問の一覧は左のリストを参考にしてください。...powered by CCI プロトレ';

var bot = new builder.UniversalBot(connector, function (session) {

    var reply = new builder.Message()
        .address(session.message.address);

    var text = session.message.text.toLocaleLowerCase();
    switch (text) {
        case 'show me a hero card':
            reply.text('Sample message with a HeroCard attachment')
                .addAttachment(new builder.HeroCard(session)
                    .title('Sample Hero Card')
                    .text('Displayed in the DirectLine client'));
            break;

        case 'send me a botframework image':
            reply.text('Sample message with an Image attachment')
                .addAttachment({
                    contentUrl: 'https://docs.botframework.com/en-us/images/faq-overview/botframework_overview_july.png',
                    contentType: 'image/png',
                    name: 'BotFrameworkOverview.png'
                });

            break;

        default:
            //reply.text('You said \'' + session.message.text + '\'');
            reply.text('質問： \'' + session.message.text + '\'');
            break;
    }

    session.send(reply);

});


bot.on('conversationUpdate', function (activity) {
    // when user joins conversation, send instructions
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
                var reply = new builder.Message()
                    .address(activity.address)
                    .text(instructions);
                bot.send(reply);
            }
        });
    }
});
/*
bot.dialog('/', function (session) {
    session.send("Hello World");
});
*/
