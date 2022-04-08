import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike, List } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { CodedocTheme } from '@codedoc/core';

import { GlyphStyle } from './style';


function pick<T>(n: number, list: T[], prev?: T[]): T[] {
  const result: T[] = [];
  const seen: { [key: number]: boolean } = {};

  if (prev) {
    prev.forEach(item => {
      const index = list.indexOf(item);
      if (index !== -1) {
        seen[index] = true;
      }
    });
  }

  while (result.length < n) {
    const index = Math.floor(Math.random() * list.length);
    if (!seen[index]) {
      result.push(list[index]);
      seen[index] = true;
    }
  }
  return result;
}


const GLYPH_COUNT = 10;


export function GlyphHeader(
  this: ThemedComponentThis<CodedocTheme>,
  _: {},
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(GlyphStyle);

  const glyphs = new BehaviorSubject<string[]>([]);
  const sub = new Subscription();

  this.track({
    bind() {
      const all: string[] = [];
      document.querySelectorAll('.copy-glyph').forEach(el => {
        all.push(el.textContent!);
      });

      glyphs.next(pick(GLYPH_COUNT, all));

      sub.add(
        timer(5000, 100).subscribe(() => {
          if (Math.random() > .85) {
            const index = Math.floor(Math.random() * glyphs.value.length);
            const next = [...glyphs.value];
            next[index] = pick(1, all, glyphs.value)[0];
            glyphs.next(next);
          }
        }),
      );
    },

    clear() {
      sub.unsubscribe();
    }
  });

  return <div class={classes.header}>
    <List of={glyphs} each={glyph => <span>{glyph}</span>}/>
  </div>
}


export const GlyphHeader$ = /*#__PURE__*/transport(GlyphHeader);
