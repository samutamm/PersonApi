process.env.NODE_ENV = 'test';
const Person = require('./../server/app/models/Person.js');
const expect = require('chai').expect;

describe('Person ',function () {

  const json = {'name': 'n', 'email':'@', 'address':'ad', 'username': 'asfljasu','password':'pasdlkad', 'role':'r'};

  it('is valid with valid params', function () {
    var person = new Person(json);
    expect(person.isValid()).to.equal(true);
  });

  it('is not valid without all required params', function () {
    var copy = JSON.parse(JSON.stringify(json));
    copy.email = undefined;
    var person = new Person(copy);
    expect(person.isValid()).to.equal(false);
  });
});
