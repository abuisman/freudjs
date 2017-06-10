/*
 * Basic spec for the most simple things. Then again, the plugin is pretty
 * simple in itself ;).
 *
 * Inspired by: https://github.com/tomtomau/jquery-big-youtube
 */

describe("Basic bootstrapping", function(){
  it("creates global object named Freud", function(){
    expect(typeof window.Freud).to.equal("object")
  });
});

/**
 * Testing top function responses
 */
describe("Freud.register", function(){
  it('calling register does not throw an error', function(){
    function runRegister() {
      Freud.register();
    }

    expect(runRegister).not.to.Throw()
  });
});

