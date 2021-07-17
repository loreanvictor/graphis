import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike, List } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { CodedocTheme } from '@codedoc/core';
import { GlyphStyle } from './style';


function getSuggestableTags() {
  const mapping: {[key: string]: string[]} = {};
  const result: string[] = [];

  document.querySelectorAll('.copy-glyph').forEach(el => {
    const tags = (el.getAttribute('data-tag') || '').split(' ');
    tags.forEach(tag => (mapping[tag] = mapping[tag] || []).push(el.textContent!));
  });

  Object.keys(mapping)
    .sort((a, b) => mapping[b].length - mapping[a].length)
    .forEach(candidate => {
      if (mapping[candidate].length > 12 || !result.some(tag => {
        const intersection = mapping[tag].filter(glyph => mapping[candidate].includes(glyph));
        return mapping[candidate].length - intersection.length < 6;
      })) {
        result.push(candidate);
      }
    });

  return result
    .filter(tag => mapping[tag].length >= 6)
    .map(tag => tag[0].toUpperCase() + tag.slice(1));
}


export function GlyphSearch(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(GlyphStyle);
  const query = new BehaviorSubject('');
  const suggestions = new BehaviorSubject([] as string[]);

  const sub = new Subscription();

  this.track({
    bind() {
      suggestions.next(getSuggestableTags());
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
    <input list="glyph-search-suggestions" type='text' _state={query} placeholder='🔍 Search ...'/>
    <datalist id="glyph-search-suggestions">
      <List of={suggestions} each={suggestion => <option>{suggestion}</option>}/>
    </datalist>
  </div>;
}


export const GlyphSearch$ = /*#__PURE__*/ transport(GlyphSearch);