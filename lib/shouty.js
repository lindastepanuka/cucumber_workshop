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
  },

  SystemUser: function SystemUser(network) {
    this.heardMessages = [];
    this.position = undefined;

    network.add_to(this);

    this.shout = function (shout) {
      network.broadcast(shout, this);
    }
  }
};
