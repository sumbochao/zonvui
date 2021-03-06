var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var BaseGameCommand = require('BaseGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);
            var params = notification.getBody();
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (tableVO.myId !== tableVO.ownerId) return;

            var data = {
                cmd: SFSSubMesseage.SEND_SOLD_BET,
                params: params
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendSoldBetXocdiaCommand"
    }
);
