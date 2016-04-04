"use strict";
require('must');
var rewire = require('rewire');

describe('library', function () {
  var aws, ec2;
  beforeEach(function () {
    aws = rewire('../');
    ec2 = new aws.EC2();
  });

  it('should promisify functions', function () {
    ec2.describeAccountAttributes().promise()
        .must.have.property('then');
  });
});
