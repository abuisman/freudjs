/*
 * Basic spec for the most simple things. Then again, the plugin is pretty
 * simple in itself ;).
 *
 * Inspired by: https://github.com/tomtomau/jquery-big-youtube
 */

import Freud from '../dist_test/freud.js';
import { expect } from 'chai';

/**
 * Testing top function responses
 */
describe("Freud.register", function(){
  it('calling register with a function adds a behaviour', function() {

    Freud.register(
      function namedFunction(el) {
        this.el = el;
      }
    );

    expect(Freud.behaviours['namedFunction']).to.not.equal(undefined);
  });

  it('calling register without a valid behaviour throws an error', function(){
    function runRegister() {
      Freud.register("Test");
    }

    expect(runRegister).to.Throw("Freud.register called without a behaviour or behaviour type is invalid");
    expect(Freud.behaviours['Test']).to.equal(undefined);
  });

  it('calling register without arguments does not add behaviours', function(){
    var behaviour_count = Object.keys(Freud.behaviours).length;
    expect(function() { Freud.register() }).to.Throw();
    expect(Object.keys(Freud.behaviours).length).to.equal(behaviour_count);
  });
});

describe("Applying behaviours to elements", function(){
  it('First element only has the first behaviour applied', function(){
    let first = document.querySelector('.first_target')

    expect(first.innerText).to.equal('TestBehaviour was applied');
    expect(first.dataset['loaded_behaviour_TestBehaviour']).to.equal('true');
    expect(first.dataset['loaded_behaviour_TestBehaviour2']).to.equal(undefined);
    expect(first.dataset['loaded_behaviour_TestBehaviour3']).to.equal(undefined);
  });

  it('Second element only has both behaviours applied', function(){
    var second = document.getElementById('second_element');

    expect(second.innerText).to.equal('TestBehaviour was applied');
    expect(second.getAttribute('applied')).to.equal('Sigmund was here');
    expect(second.dataset['loaded_behaviour_TestBehaviour']).to.equal('true');
    expect(second.dataset['loaded_behaviour_TestBehaviour2']).to.equal('true');
  });

  it('Third element only has the third behaviour applied', function(){
    var third = document.getElementById('third_element');

    expect(third.innerText).to.equal("Third Time's a Charm");
    expect(third.dataset['loaded_behaviour_TestBehaviour']).to.equal(undefined);
    expect(third.dataset['loaded_behaviour_TestBehaviour2']).to.equal(undefined);
    expect(third.dataset['loaded_behaviour_TestBehaviour3']).to.equal("true");
  });

  it('Uses a custom name when given', function(){
    var different_name = document.getElementById('different_name')
    expect(different_name.innerText).to.equal("My enemies know me as 'Bond'. 'James Bond'");
    expect(different_name.dataset['loaded_behaviour_James']).to.equal("true");
  });

  it('Applies options passed to freud when instantiating and data-attributes', function(){
    expect(options_passed.dataset['loaded_behaviour_OptionsPasser']).to.not.equal(undefined);

    let dataOptions = JSON.parse(options_passed.dataset['optionsPassed']);
    expect(dataOptions['should']).to.equal("Be in options");
    expect(dataOptions['behaviourKey']).to.equal("optionCheck");
    expect(dataOptions['test']).to.equal("option");
  });

  it('Applies behaviours using a custom key', function(){
    var other_key = document.getElementById('other_key');

    expect(other_key.innerText).to.equal('TestBehaviour was applied');
    expect(other_key.getAttribute('applied')).to.equal('Sigmund was here');
    expect(other_key.dataset['loaded_behaviour_TestBehaviour']).to.equal("true");
    expect(other_key.dataset['loaded_behaviour_TestBehaviour2']).to.equal("true");
    expect(other_key.dataset['loaded_behaviour_TestBehaviour3']).to.equal(undefined);
  });

  it('Applies behaviour that was declared as it was given to freud', function(){
    var inline_delcared = document.getElementById('inline_delcared');

    expect(inline_delcared.innerText).to.equal('Transmitted!');
    expect(inline_delcared.dataset['loaded_behaviour_PassedInline']).not.to.equal(undefined);
  });

  it('Applies behaviours set in options.behaviours', function(){
    var apply_directly = document.getElementById('match_me_tender');

    expect(apply_directly.innerText).to.equal('Tenderlove');
    expect(apply_directly.dataset['what']).to.equal('rails');
    expect(apply_directly.dataset['loaded_behaviour_Tender']).to.equal("true");
    expect(apply_directly.dataset['loaded_behaviour_Love']).to.equal("true");
  });

  it('Applies both data behaviours as well as options.behaviours', function(){
    var template = document.createElement('div');
    template.innerHTML = '<div id="secrets" data-behaviours="TestBehaviour">Questions of science</div>';

    var directly_and_data = template.firstChild;
    document.body.appendChild(directly_and_data);

    Freud.init(directly_and_data, { behaviours: ['TheScientist'] });

    expect(directly_and_data.innerText).to.equal('TestBehaviour was applied');
    expect(directly_and_data.dataset['tellme']).to.equal('Your secrets');
    expect(directly_and_data.dataset['loaded_behaviour_TheScientist']).to.equal("true");
    expect(directly_and_data.dataset['loaded_behaviour_TestBehaviour']).to.equal("true");
  });


  it('Grabs targets from a given selector', function() {
    var select_me = document.getElementById('select_me');

    expect(select_me.innerText).to.equal('You have been selected');
    expect(select_me.dataset['loaded_behaviour_Selected']).to.equal("true");
  });
});

/**
 * Testing top function responses
 */
describe("Freud.init", function(){
  it('raises when supplying something other than a string or DOM element', function() {
    function invalidFreudInit() {
      Freud.init({});
    }

    expect(invalidFreudInit).to.throw('No compatible selector or DOM node given to Freud.init');
  });

  it('does not raise when passing a DOM node', function() {
    function invalidFreudInit() {
      Freud.init(document.createElement('div'));
    }

    expect(invalidFreudInit).not.to.throw();
  });
});

/**
  * Test Behaviour to apply
  */
var TestBehaviour;

TestBehaviour = (function() {
  function TestBehaviour(element) {
    this.element = element;
    this.element.innerText = 'TestBehaviour was applied';
  }

  return TestBehaviour;
})();

Freud.register('TestBehaviour', TestBehaviour);

var TestBehaviour2;

TestBehaviour2 = (function() {
  function TestBehaviour2(element) {
    this.element = element;
    this.element.setAttribute('applied', 'Sigmund was here');
  }

  return TestBehaviour2;
})();

Freud.register('TestBehaviour2', TestBehaviour2);

function TestBehaviour3(element) {
  this.element = element;
  this.element.innerText = "Third Time's a Charm";
};

Freud.register(TestBehaviour3);

function TestBehaviour4(element) {
  this.element = element;
  this.element.innerText = "My enemies know me as 'Bond'. 'James Bond'";
}

Freud.register('James', TestBehaviour4);

var OptionsPasser = function OptionsPasser(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  this.element = element;
  this.element.dataset['optionsPassed'] = JSON.stringify(options);
};

Freud.register(OptionsPasser);

var Tender;

Tender = (function() {
  function Tender(element, options) {
    this.element = element;
    this.element.innerText = 'Tenderlove';
  }

  return Tender;
})();

Freud.register(Tender);

var Love;

Love = (function() {
  function Love(element) {
    this.element = element;
    this.element.dataset['what'] = 'rails';
  }

  return Love;
})();

Freud.register(Love);

var TheScientist;

TheScientist = (function() {
  function TheScientist(element) {
    this.element = element;
    this.element.dataset['tellme'] = 'Your secrets';
  }

  return TheScientist;
})();

Freud.register(TheScientist);

var Selected;

Selected = (function() {
  function Selected(element) {
    this.element = element;
    this.element.innerText = 'You have been selected';
  }

  return Selected;
})();

Freud.register(Selected);

Freud.init(); // Default apply through [data-behaviours];

var optionsPassed = document.getElementById('options_passed');
Freud.init(optionsPassed, { behaviourKey: 'optionCheck', test:'option' });

var otherKey = document.getElementById('other_key');
Freud.init(otherKey, { behaviourKey: 'customKey' });

Freud.register(function PassedInline(element, options) {
  this.element = element;
    if (options == null) {
      options = {};
    }
    this.element.innerText = 'Transmitted!';
});

Freud.init(); // Default apply through [data-behaviours];
Freud.init(document.getElementById('match_me_tender'), { behaviours: ['Tender', 'Love'] });
Freud.init('#select_me', { behaviourKey: 'selected' });
