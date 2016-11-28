import _ from 'lodash';


export function outcome(question, session, env) {

  const outcome = {
  };

  return Promise.resolve(outcome);

}

export function model(question, session, env) {
  console.debug('[state] question:', JSON.stringify(question, null, '  '));
  console.debug('[state] session:', JSON.stringify(session, null, '  '));
  console.debug('[state] env:', JSON.stringify(env, null, '  '));

  function lookup(value) {
    var localeKey = env.locale || (question.translations || {}).default_locale || 'en_US';
    var map = ((question.translations || {})[localeKey] || {});
    if (value.indexOf('$') === 0) {
      var key = value.substring(1);
      var out = map[key];
      if (!out) {
        console.warn('not able to find translation for: ' + key);
      }
      return out || value;
    } else {
      return value;
    }
  }

  var base = _.assign({}, _.cloneDeep(question.model));
  base.prompt = lookup(base.prompt);
  base.outcomes = "";

  if (env.mode !== 'gather') {
    base.disabled = true;
  }

  if (env.mode === 'evaluate') {
    var allCorrect = _.includes(question.correctResponse, session.value);
    base.outcomes = allCorrect ? 'correct' : 'incorrect';
    if (!allCorrect) {
      base.correctResponse = question.correctResponse;
    }
  }

  base.env = env;

  var map = {
    black_on_rose: 'black-on-rose',
    white_on_black: 'white-on-black',
    black_on_white: 'default'
  };

  if (env.accessibility && env.accessibility.colorContrast && map[env.accessibility.colorContrast]){
    base.className = map[env.accessibility.colorContrast];
  }

  console.debug('[state] return: ' + JSON.stringify(base, null, '  '));
  return Promise.resolve(base);
}