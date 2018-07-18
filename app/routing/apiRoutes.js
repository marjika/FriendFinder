var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });


      //A POST routes `/api/friends`. This will be used to handle incoming survey results. 
      //This route will also be used to handle the compatibility logic. 
      app.post("/api/friends", function(req, res) {
        
          res.json(findCompatibility(req.body));
          friendsData.push(req.body);        
      });

      function findCompatibility(input) {
        var tempBFF = friendsData[0];
        var compatibility = 0;
        for (var k = 0; k<friendsData[0].scores.length; k++) {
          var num = Math.abs(input.scores[k] - friendsData[0].scores[k]);
          compatibility = compatibility+num;
        }
        for (var i = 1; i<friendsData.length; i++) {
          var nextComp = 0;
          for (var j = 0; j<friendsData[i].scores.length; j++) {
            var numb = Math.abs(input.scores[j] - friendsData[i].scores[j]);
            nextComp = nextComp+numb;
            }
            if (nextComp < compatibility) {
              compatibility = nextComp;
              tempBFF = friendsData[i];
          }
        }
        return tempBFF;
      }


};