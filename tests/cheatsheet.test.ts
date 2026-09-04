import test from 'node:test';
import assert from 'node:assert';
import { CHEATSHEET_CATEGORIES } from '../src/data/cheatsheet';

test('cheatsheet categories integrity', () => {
  assert.ok(CHEATSHEET_CATEGORIES.length >= 10, 'Expected at least 10 cheatsheet categories');

  const seenIds = new Set<string>();
  for (const cat of CHEATSHEET_CATEGORIES) {
    assert.ok(cat.id && cat.id.length > 0, 'Category ID must not be empty');
    assert.ok(!seenIds.has(cat.id), `Duplicate category ID found: ${cat.id}`);
    seenIds.add(cat.id);

    assert.ok(cat.title && cat.title.length > 0, `Category ${cat.id} must have a title`);
    assert.ok(cat.commands.length > 0, `Category ${cat.id} must have at least one command`);
  }
});

test('cheatsheet commands integrity', () => {
  let totalCommands = 0;
  for (const cat of CHEATSHEET_CATEGORIES) {
    for (const cmd of cat.commands) {
      totalCommands++;
      assert.ok(cmd.keys.length > 0, `Command in ${cat.id} must have at least one key badge`);
      assert.ok(cmd.description && cmd.description.length > 0, `Command in ${cat.id} must have a description`);
      assert.ok(cmd.category && cmd.category.length > 0, `Command in ${cat.id} must have a category name`);
    }
  }
  assert.ok(totalCommands >= 80, `Expected at least 80 commands across categories, got ${totalCommands}`);
});

test('each category has a valid practice snippet for the gym', () => {
  for (const cat of CHEATSHEET_CATEGORIES) {
    assert.ok(
      cat.practiceSnippet && cat.practiceSnippet.trim().length > 20,
      `Category ${cat.id} must have a non-trivial practiceSnippet`,
    );
    const lines = cat.practiceSnippet.split('\n');
    assert.ok(
      lines.length >= 4,
      `Practice snippet for ${cat.id} should have at least 4 lines for editing/navigation`,
    );
  }
});
