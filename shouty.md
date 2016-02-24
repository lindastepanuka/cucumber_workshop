# Steps

#### Step 0 - clone code and install dependencies

```
$ git clone https://github.com/lindastepanuka/cucumber_workshop.git
$ cd cucumber_workshop
$ npm install
$ npm test
```

#### Step 1 - first feature

Add shouting feature

```cucumber
Scenario: Ann hears Mary
  Given Ann and Mary have accounts
  When Mary shouts "BDD workshop!!!"
  Then Ann should hear "BDD workshop!!!"
```

#### Step 2 - add step definitions

- Run the tests
- Copy the provided definitions to the step definition file
- Run the tests again
- Watch them be pending
- Add code to the first step definition to initialize two people:

```javascript
this.Given(/^Ann and Mary have accounts$/, function (callback) {
  this.Ann  = new Person();
  this.Mary = new Person();

  callback()
});
```


#### Step 3 - add Person constructor to shouty.js:

```javascript
module.exports = {
  Person: function Person() {

  }
};
```

#### Step 4 - add shouting step implementation to shout_steps.js

```javascript
this.When(/^Mary shouts "([^"]*)"$/, function (message, callback) {
  this.Mary.shout(message, callback);
  expect(this.Mary.shoutedMessage).to.equal(message);
});
```

#### Step 5 - add shouting function to Person constructor

```javascript
Person: function Person() {
  this.shoutedMessage = null;

  this.shout = function (message, callback) {
    this.shoutedMessage = message;
  };
}
```

#### Step 6 - add heard message check to the third step implementation

```javascript
this.Then(/^Ann should hear "([^"]*)"$/, function (message, callback) {
  expect(this.Ann.heardMessages).to.include(message);
});
```

#### Step 7 - add to the first step definition to join all the people into a Network

```javascript
var Network = Shouty.Network;

this.Given(/^Ann and Mary have accounts$/, function (callback) {
  this.Network = new Network();

  this.Ann  = new Person(this.Network);
  this.Mary = new Person(this.Network);

  callback()
});
```

#### Step 8 - Implement network and hearing functionalities

```javascript
module.exports = {
  Network: function Network() {
    this.people = [];

    this.add_to = function (person) {
      this.people.push(person);
    }

    this.broadcast = function (message, callback) {
      this.people.forEach(function (person) {
        person.heardMessages.push(message);
      });
      callback()
    }
  },

  Person: function Person(network) {
    this.shoutedMessage = null;
    this.heardMessages = [];

    network.add_to(this);

    this.shout = function (message, callback) {
      network.broadcast(message, callback);
      this.shoutedMessage = message;
    };
  }
};
```

## Milestone 1 - refactor code and pat yourself on the back. :smile:

#### Step 9 - add step for people being below 1000 meters apart

```cucumber
Scenario: Ann hears Mary
  Given Ann and Mary have accounts
  And Ann is 800m from Mary
  When Mary shouts "BDD workshop!!!"
  Then Ann should hear "BDD workshop!!!"
```

#### Step 10 - add people being meters apart step implementation

- Run the tests
- Copy code:

```javascript
this.Given(/^Ann is (\d+)m from Mary$/, function (arg1, callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});
```

- Add to code:

```javascript
this.Given(/^Ann is (\d+)m from Mary$/, function (arg1, callback) {
  this.Ann.position = 0;
  this.Mary.position = meters;

  callback();
});
```

## Milestone 2 - refactor code and pat yourself on the back. :smile:

AS
#### Step 11 - write the negative scenario feature

```cucumber
Scenario: Ann does not hear Mary
  Given Ann and Mary have accounts
  And Ann is 1001m from Mary
  When Mary shouts "BDD workshop!!!"
  Then Ann should not hear "BDD workshop!!!"
```

#### Step 12 - add the missing step and watch the tests fail

```javascript
this.Then(/^Ann should not hear "([^"]*)"$/, function (message, callback) {
  expect(this.Ann.heardMessages).to.not.include(message);

  callback();
});
```

#### Step 13 - implement the position check when shouting the message

```javascript
this.broadcast = function (message, shouter, callback) {
  this.people.forEach(function (person) {
    var distance = Math.abs(shouter.position - person.position);

    if(distance <= 1000) {
      person.heardMessages.push(message);
    }
  });
  callback()
}
```
