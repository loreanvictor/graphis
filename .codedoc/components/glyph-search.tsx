import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike, List, ref } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { CodedocTheme } from '@codedoc/core';
import { GlyphStyle } from './style';
import { Button } from '@codedoc/core/components';


function getSuggestableTags() {
  const mapping: {[key: string]: string[]} = {};
  const result: string[] = [];

  document.querySelectorAll('.copy-glyph').forEach(el => {
    const tags = (el.getAttribute('data-tag') || '').split(' ');
    tags.forEach(tag => (mapping[tag] = mapping[tag] || []).push(el.textContent!));
  });

  Object.keys(mapping)
    .sort((a, b) => a === 'miscellaneous' ? 1 : b === 'miscellaneous' ? -1 : 0)
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
  const input = ref<HTMLInputElement>();

  const holder = ref<HTMLElement>();
  const bold = new BehaviorSubject(false);
  const fontSize = new BehaviorSubject<'small' | 'medium' | 'large'>('medium');

  const sub = new Subscription();

  const toggleWeight = () => {
    bold.next(!bold.value);
    holder.$.parentElement?.classList.toggle('bold', bold.value);
  }

  const toggleSize = () => {
    holder.$.parentElement?.classList.remove(fontSize.value);
    fontSize.next(fontSize.value === 'small' ? 'medium' : fontSize.value === 'medium' ? 'large' : 'small');
    holder.$.parentElement?.classList.add(fontSize.value);
  }

  this.track({
    bind() {
      suggestions.next(getSuggestableTags());
      sub.add(query.pipe(debounceTime(200)).subscribe(query => {
        document.querySelectorAll('.copy-glyph').forEach(el => {
          if (!query) el.removeAttribute('hidden');
          else {
            const tags = (el.getAttribute('data-tag') || '').split(' ');
            const match = tags.some(tag => tag.indexOf(query.toLowerCase()) !== -1);
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

  return <div class={classes.glyphSearch} _ref={holder}>
    <span onclick={() => { query.next(''); input.$.focus(); }}>
      {query.pipe(map(q => !!q ? '❌' : '🔍'))}
    </span>
    <input _ref={input} list="glyph-search-suggestions" type='text' _state={query} placeholder='Search ...'/>
    <datalist id="glyph-search-suggestions">
      <List of={suggestions} each={suggestion => <option>{suggestion}</option>}/>
    </datalist>
    <Button 
      label={bold.pipe(map(b => b ? '𝙱' : '𝔹')) as any}
      onclick={toggleWeight as any}>
    </Button>
    <Button
      label={fontSize.pipe(map(s => s === 'small' ? '⚏' : s === 'medium' ? '⊞' : '☷')) as any}
      onclick={toggleSize as any}>
    </Button>
  </div>;
}


export const GlyphSearch$ = /*#__PURE__*/ transport(GlyphSearch);