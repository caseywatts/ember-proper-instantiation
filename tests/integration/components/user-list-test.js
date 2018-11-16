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
