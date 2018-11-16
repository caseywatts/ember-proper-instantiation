### Scenario
Imagine you have a component that you want to test, and it does some or all of these things:
- depends on models' computed properties*
- loads other records through ember-data relationships (hitting the server)
- loads other records through the init hook (or other ways) (hitting the server)

Options include:

- Making an "Application" test (= "acceptance"). That's our go-to currently, but it is heavier than we need.
  - There's a lot more context being loaded than needed.
  - Also, if this component is used in many places in the app, should we test each of those places with a different acceptance test?
- Stubbing things?
- Or -  "Component" tests (= "integration"). If only we could set them up to have what they need! Here's one way 🙂

### How does it work?

To get an ember-data instance from a mirage factory, we have to do four things:

- generate the mirage instance
- pass it through the mirage serializer (in particular to get relationships embedded)
- pass it through `store.normalize()``
- push this into the store - this returns an actual ember-data instance

Here's a shortcut to doing it (this repo). These two files are the main ones to check out:
- [This Test](https://github.com/caseywatts/ember-proper-instantiation/blob/master/tests/integration/components/user-list-test.js) which shows an example of properInstantiation
- [The setupProperInstantiation helper it uses](https://github.com/caseywatts/ember-proper-instantiation/blob/master/tests/helpers/setup-proper-instantiation.js)


#### Usage example
```
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from '../../../initializers/ember-cli-mirage';
import { setupProperInstantiation } from '../../helpers/setup-proper-instantiation';

module('UsersListComponent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
    this.store = this.owner.lookup('service:store');
    this.properInstantiation = setupProperInstantiation(this.server, this.store);
  }),

  hooks.afterEach(function() {
    this.server.shutdown();
  }),

  test('renders', async function(assert) {
    const users = [this.properInstantiation('user', {
      firstName: 'Joe',
      lastName: 'Schmo'
    })];
    this.set('users', users)
    await render(hbs`{{user-list users=users}}`);

    assert.ok(this.element.innerHTML.includes('Joe Schmo'));
  });
});
```

### What if we don't need/want the server?
Sometimes we may be in this situation but we'd like it to be faster by skipping the server setup. In that case, I wish we could somehow use Mirage's factories without spinning up the entire server. Factory Guy as an alternative sorta does that - but then you have a different interface to learn, and an additional set of factories to maintain.
