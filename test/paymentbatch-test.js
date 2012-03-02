/*

 Tests for node-paypal-masspay
 Created By: Matt Walters
 Date: 3/2/2012

 Note: tests require the following environment variables to be set:

  process.env.PAYPAL_PWD - paypal API password (generated by PayPal)
  process.env.PAYPAL_USER - paypal user
  process.env.PAYPAL_SIGNATURE - paypal API signature
  process.env.PAYPAL_EMAILSUBJECT - optional email subject to appear on your outgoing mails

*/

var vows = require('vows'),
    assert = require('assert'),
    _ = require('underscore');

var MassPay = require('../index');

var paymentRequests = [
  {
    email: 'matt@gochime.com'
    , amount: 127.5
    , uniqueId: '12345'
    , note: 'request for matt@gc'
  }
, {
    email: 'tim@gochime.com'
    , amount: 517.0
    , uniqueId: '123456'
    , note: 'request for tim@gc'
  }
];

vows
  .describe('PaymentBatch')
    .addBatch({
        'A MassPay PaymentBatch': {
        topic: new MassPay.PaymentBatch(paymentRequests),
        'When instantiated wih an array of payment requests': {
            topic: function (pb) {
              return pb;
            },
            'prepares a list of params for the PM API': function (pb) {
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_EMAIL0'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_Amt0'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_UNIQUEID0'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_NOTE0'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_EMAIL1'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_Amt1'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_UNIQUEID1'; 
              }));
              assert.isTrue(_.any(_.keys(pb.params), function(item) { 
                return item === 'L_NOTE1'; 
              }));
            }
        }
      }
    })
    .export(module); // Export the Suite