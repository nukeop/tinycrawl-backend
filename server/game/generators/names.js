import casual from 'casual';
import _ from 'lodash';

class NameGenerator {
  constructor(segments, rules) {
    this.segments = segments;
    this.rules = rules;
  }

  generate() {
    let rule = _.sample(this.rules);
    let result = '';
    _.forEach(rule, part => {
      let subrule = part.split(' ');
      if(Math.random() <= parseFloat(subrule[0])) {
        result += _.sample(this.segments[subrule[1]]);
      }
    });
    return result.trim();
  }
}

export default NameGenerator;
