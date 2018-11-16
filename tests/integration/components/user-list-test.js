import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('UsersListComponent', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function(assert) {
    const users = ['a', 'b'];
    this.set('users', users)
    await render(hbs`{{user-list users=users}}`);
    
    assert.ok(this.element.innerHTML.includes('a'));
    assert.ok(this.element.innerHTML.includes('b'));
  });
});
