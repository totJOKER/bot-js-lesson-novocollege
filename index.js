const telegramApi = require('node-telegram-bot-api');
const {gameOption, againOption} = require('./option.js')
const token = '5952105227:AAGv8h5L7Zbckbi0ZjA1ufjVc75v4q8KhHU'

const bot = new telegramApi(token, {polling: true});

const user = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 3 - твоя задача отгадать')
    const randNumber = Math.floor(Math.random() * 3)
    user[chatId] = randNumber;
    await bot.sendMessage(chatId, 'Отгадай', gameOption);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'description comand'},
        {command: '/time', description: 'description comand'},
        {command: '/info', description: 'description comand'},
        {command: '/game', description: 'description comand'},
    ])
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/34e/da8/34eda890-7edf-4492-93ff-f8a20619b292/192/8.webp')
            return bot.sendMessage(chatId, `Ты написал мне, вау, только не пиши /cum`)
        }
        if (text === '/cum') {
            return bot.sendMessage(chatId, `Одобряю - ${text}`)
        }
        if (text === '/infoUser') {
            return bot.sendMessage(chatId, `Ты - ${msg.from.first_name + " " + msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я ничего не понял, давай по новой')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data == '/again') {
            return startGame(chatId);
        }
        if (data == user[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю ты угадал и выбрал число ${data}`, againOption)
        } else {
            return await bot.sendMessage(chatId, `Ты проиграл, ты выбрал ${data}, а число было ${user[chatId]}`, againOption)
        }
    })
}
start();