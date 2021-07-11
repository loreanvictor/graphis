import { fromEvent, Subscription } from 'rxjs';

import { copyToClipboard, getRenderer } from '@codedoc/core/transport';
import { funcTransport, onReady } from '@connectv/sdh/transport';
import { Toast } from '@codedoc/core/components';


export function copyGlyphs() {
  const renderer = getRenderer();

  onReady(() => {
    let sub: Subscription;

    const _exec = () => {
      if (sub) sub.unsubscribe();
      sub = new Subscription();

      document.querySelectorAll('.copy-glyph').forEach(el => {
        const text = el.textContent || '';
        sub.add(
          fromEvent(el, 'click').subscribe(() => {
            copyToClipboard(text, () => renderer.render(<Toast>Icon Copied To Clipboard!</Toast>).on(document.body));
          })
        );
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}

export const copyGlyphs$ = /*#__PURE__*/funcTransport(copyGlyphs);