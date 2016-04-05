// taken from https://github.com/taskcluster/taskcluster-queue/blob/0dd2b45b860836a2ef6c651c5499c9abfb5670ad/utils/aws-sdk-promise.js
var aws = require('aws-sdk');

// XXX: This is a terrible hack but it should not break anything in horrible
// ways.
aws.Request.prototype.promise = function() {
  var Prom = aws.Promise || Promise || require('promise');
  return new Prom(function(accept, reject) {
    this.on('complete', function(response) {
      if (response.error) {
        reject(response.error);
      } else {
        accept(response);
      }
    });
    this.send();
  }.bind(this));
};

if (aws.Promise) {
  throw new Error('Refusing to overwrite aws library property');
} else {
  aws.Promise = undefined;
}

module.exports = aws;
