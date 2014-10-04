/*jslint node: true*/
/*globals describe, it, Character*/

describe.only('UsersModel', function () {

  describe('#find()', function () {
    it('should check find function', function (done) {
      Character.find()
        .then(function (results) {
          // some tests
          console.log(results);
          done();
        })
        .catch(done);
    });
  });

});