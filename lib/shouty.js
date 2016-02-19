module.exports = {
  Network: function Network() {
    this.people = [];

    this.add_to = function  (person) {
      this.people.push(person);
    };

    this.broadcast = function(shout, shouter) {
      this.people.forEach(function  (person) {
        if(Math.abs(person.position - shouter.position) <= 1000) {
          person.heardMessages.push(shout);
        }
      });
    };

    this.getUser = function(personName, position) {
      var user = this.people.filter(function ( obj ) {
        return obj.personName === personName;
      })[0];
      if(user == undefined) {
        user = new SystemUser(this, personName, position);
      }
      return user;
    }

    this.messagesHeardBy = function(personName) {
      var user = this.getUser(personName);
      return user.heardMessages;
    }
  },
};

function SystemUser(network, personName, position) {
  this.heardMessages = [];
  this.position = position;
  this.personName = personName;

  network.add_to(this);

  this.shout = function (shout) {
    network.broadcast(shout, this);
  }
};
