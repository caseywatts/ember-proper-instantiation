import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from '../../../initializers/ember-cli-mirage';

module('UsersListComponent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
    this.store = this.owner.lookup('service:store');
  }),

  hooks.afterEach(function() {
    this.server.shutdown();
  }),

  test('renders', async function(assert) {
    const users = [server.create('user', {
      first_name: 'Joe',
      last_name: 'Schmo'
    }).attrs];
    this.set('users', users)
    await render(hbs`{{user-list users=users}}`);
    assert.ok(this.element.innerHTML.includes('Joe'));
  });
});
