import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  randCode,
  isValidRoomCode,
  escapeHtml,
  linkify,
  parseRoomCode,
  formatChatExport,
  CODE_CHARSET
} from '../src/chat-utils.mjs';

describe('Local Network Chat - Pure Utilities', () => {
  describe('randCode and isValidRoomCode', () => {
    it('generates a 5-character string from the valid charset', () => {
      for (let i = 0; i < 50; i++) {
        const code = randCode();
        assert.equal(code.length, 5);
        assert.equal(isValidRoomCode(code), true);
        for (const char of code) {
          assert.equal(CODE_CHARSET.includes(char), true);
        }
      }
    });

    it('rejects invalid codes', () => {
      assert.equal(isValidRoomCode(''), false);
      assert.equal(isValidRoomCode('ABCD'), false);
      assert.equal(isValidRoomCode('ABCDEF'), false);
      assert.equal(isValidRoomCode('abcd1'), false); // lowercase
      assert.equal(isValidRoomCode('ABC!2'), false); // special char
      assert.equal(isValidRoomCode('ABCO1'), false); // 'O' is excluded from charset
      assert.equal(isValidRoomCode('ABCI1'), false); // 'I' is excluded from charset
    });
  });

  describe('escapeHtml', () => {
    it('properly escapes dangerous HTML entities', () => {
      assert.equal(escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      assert.equal(escapeHtml("Tom & Jerry's"), 'Tom &amp; Jerry&#39;s');
      assert.equal(escapeHtml(''), '');
      assert.equal(escapeHtml(null), '');
      assert.equal(escapeHtml(undefined), '');
    });
  });

  describe('linkify', () => {
    it('converts HTTP and HTTPS links into secure anchor tags', () => {
      const input = 'Visit https://github.com/pranav-pramod-dwivedi now!';
      const result = linkify(input);
      assert.match(result, /<a href="https:\/\/github\.com\/pranav-pramod-dwivedi" target="_blank" rel="noopener noreferrer">/);
    });

    it('neutralizes malicious scripts while hyperlinking valid URLs', () => {
      const input = '<img src=x onerror=alert(1)> see https://example.com/demo?test=1&foo=2';
      const result = linkify(input);
      assert.equal(result.includes('<img'), false);
      assert.equal(result.includes('&lt;img'), true);
      assert.match(result, /<a href="https:\/\/example\.com\/demo\?test=1&amp;foo=2"/);
    });

    it('leaves text without URLs unchanged except for HTML escaping', () => {
      assert.equal(linkify('Hello world 123'), 'Hello world 123');
    });
  });

  describe('parseRoomCode', () => {
    it('parses raw 5-letter codes', () => {
      assert.equal(parseRoomCode('xyz89'), 'XYZ89');
      assert.equal(parseRoomCode('  ABC23  '), 'ABC23');
    });

    it('extracts room code from URL parameters', () => {
      assert.equal(parseRoomCode('https://example.com/chat?r=k7m9p'), 'K7M9P');
      assert.equal(parseRoomCode('http://localhost:8000/?room=xy34z&other=1'), 'XY34Z');
      assert.equal(parseRoomCode('?R=test1'), 'TEST1');
      assert.equal(parseRoomCode('?ROOM=room2'), 'ROOM2');
    });

    it('strips non-alphanumeric characters', () => {
      assert.equal(parseRoomCode('AB-CD#2'), 'ABCD2');
      assert.equal(parseRoomCode('   '), '');
    });
  });

  describe('formatChatExport', () => {
    it('formats system and user messages with timestamps', () => {
      const messages = [
        { sys: true, text: 'Host started room' },
        { from: 'Pranav', text: 'Welcome everyone!', time: '10:15 AM' },
        { from: 'Guest', text: 'Thanks, glad to be here.', time: '10:16 AM' }
      ];
      const exported = formatChatExport(messages, 'ROOM1');
      assert.match(exported, /# Local Network Chat — Room ROOM1/);
      assert.match(exported, /--- Host started room ---/);
      assert.match(exported, /\[10:15 AM\] Pranav: Welcome everyone!/);
      assert.match(exported, /\[10:16 AM\] Guest: Thanks, glad to be here\./);
    });

    it('handles empty message lists gracefully', () => {
      const exported = formatChatExport([], 'EMPTY');
      assert.match(exported, /# Local Network Chat — Room EMPTY/);
    });
  });
});
