import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('GravatarImageComponent', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function() {
    await render(hbs`{{gravatar-image}}`);
    assert.ok(this.element.querySelector('img'));
  });
});
