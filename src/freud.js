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

class Freud {
  constructor() {
    this.behaviours = {}
  }

  init(selector_or_dom = null, options = {}) {
    var options = Object.assign({}, default_options, options);
    var target_attr = `data-${options['behaviourKey']}`;
    var targets = document.querySelectorAll(`[${target_attr}]`);

    targets.forEach((target) => {
      var el_behaviours = normalize_behaviours(target.dataset[options['behaviourKey']])

      el_behaviours.forEach((behaviour_name) => {
        if(!target.dataset[`loaded_behaviour_${behaviour_name}`]) {
          target.dataset[`loaded_behaviour_${behaviour_name}`] = true;

          if(this.behaviours[behaviour_name]) {
            new this.behaviours[behaviour_name](target);
          }
        }
      });
    })

    return targets;
  }

  register(behaviour_or_name, behaviour = null) {
    if (typeof behaviour_or_name == 'function') {
      var name = behaviour_or_name.name;
      var behaviour = behaviour;
    } else {
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
