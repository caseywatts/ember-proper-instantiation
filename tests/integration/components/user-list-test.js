import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from '../../../initializers/ember-cli-mirage';

module('UsersListComponent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
  }),

  hooks.afterEach(function() {
    this.server.shutdown();
  }),

  test('renders', async function(assert) {
    const users = ['a', 'b'];
    this.set('users', users)
    await render(hbs`{{user-list users=users}}`);
    
    assert.ok(this.element.innerHTML.includes('a'));
    assert.ok(this.element.innerHTML.includes('b'));
  });
});
