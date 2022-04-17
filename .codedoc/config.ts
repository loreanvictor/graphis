
import { configuration,
    DefaultMarkdownCustomComponents,
    DefaultMarkdownCustomInlineComponents,
    DefaultConfig } from '@codedoc/core';

import { Glyph, GlyphHolder } from './components/glyph';
import { copyGlyphs$ } from './components/copy';
import { theme } from './theme';
import { GlyphHeader$ } from './components/glyph-header';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      base: 'graphis'
    }
  },
  markdown: {
    customComponents: {
      ...DefaultMarkdownCustomComponents,
      GlyphHolder,
      GlyphHeader: GlyphHeader$,
    },
    customInlineComponents: {
      ...DefaultMarkdownCustomInlineComponents,
      Glyph,
    },
  },
  bundle: {
    init: [
      ...DefaultConfig.bundle.init,
      copyGlyphs$,
    ]
  },
  misc: {
    github: {
      user: 'loreanvictor',
      repo: 'graphis',
    }
  },
});
