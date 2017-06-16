const default_options = {
  behaviourKey: 'behaviours',
};

var normalize_behaviours = (behaviours) => {
  if(!behaviours) {
    return [];
  }

  try {
    behaviours = JSON.parse(behaviours)
  } catch(e) {
    behaviours = behaviours

    if(typeof behaviours != 'object') {
      behaviours = [behaviours]
    }
  }
  return behaviours;
};

function getBehaviours(element, options) {
  var behaviours = normalize_behaviours(element.dataset[options['behaviourKey']]);

  if(options['behaviours']) {
    behaviours = (behaviours||[]).concat(options['behaviours']);
  }

  return behaviours;
}

function getTargets(selector_or_dom, options) {
  var targets;

  if(selector_or_dom == null) {
    var target_attr = `data-${options['behaviourKey']}`;
    targets = document.querySelectorAll(`[${target_attr}]`);
  } else if(selector_or_dom instanceof HTMLElement) {
    targets = [selector_or_dom];
  }
  else if(typeof selector_or_dom == 'string') {
    var targets = document.querySelectorAll(selector_or_dom);
  }
  else {
    throw 'No compatible selector or DOM node given to Freud.init';
  }

  return targets;
}

class Freud {
  constructor() {
    this.behaviours = {}
  }

  init(selector_or_dom = null, options = {}) {
    var options = { ...default_options, ...options };
    var targets = getTargets(selector_or_dom, options) || [];

    targets.forEach((target) => {
      var el_behaviours = getBehaviours(target, options);
      var target_options = {...options, ...target.dataset};

      el_behaviours.forEach((behaviour_name) => {
        if(this.behaviours[behaviour_name]) {
          if(!target.dataset[`loaded_behaviour_${behaviour_name}`]) {
            target.dataset[`loaded_behaviour_${behaviour_name}`] = true;
            new this.behaviours[behaviour_name](target, target_options);
          }
        }
      });
    })

    return targets;
  }

  register(behaviour_or_name, behaviour = null) {
    if(!behaviour_or_name) {
      throw("Freud.register called without a behaviour or name");
    }

    if (typeof behaviour_or_name == 'function') {
      var name = behaviour_or_name.name;
      var behaviour = behaviour_or_name;
    } else {
      if(!behaviour || (typeof behaviour != 'function') ) {
        throw("Freud.register called without a behaviour or behaviour type is invalid");
      }
      var name = behaviour_or_name;
      var behaviour = behaviour;
    }

    this.behaviours[name] = behaviour;
  }

  ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
}

export default new Freud;
