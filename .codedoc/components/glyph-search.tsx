import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { CodedocTheme } from '@codedoc/core';
import { GlyphStyle } from './style';


export function GlyphSearch(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(GlyphStyle);
  const query = new BehaviorSubject('');

  const sub = new Subscription();

  this.track({
    bind() {
      sub.add(query.pipe(debounceTime(200)).subscribe(query => {
        document.querySelectorAll('.copy-glyph').forEach(el => {
          if (!query) el.removeAttribute('hidden');
          else {
            const tags = (el.getAttribute('data-tag') || '').split(' ');
            const match = tags.some(tag => tag.indexOf(query.toLowerCase()) !== -1);
            console.log(tags + '  ' + query + ' --> ' + match);
            if (match) el.removeAttribute('hidden');
            else el.setAttribute('hidden', '');
          }
        });
      }));
    },
    clear() {
      sub.unsubscribe();
    }
  });

  return <div class={classes.glyphSearch}>
    <input type='text' _state={query} placeholder='🔍 Search ...'/>
  </div>;
}


export const GlyphSearch$ = /*#__PURE__*/ transport(GlyphSearch);