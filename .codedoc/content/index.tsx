import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
import { Page, Meta, ContentNav, Fonts, ToC, GithubSearch$ } from '@codedoc/core/components';

import { config } from '../config';
import { Header } from './header';
import { Footer } from './footer';


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}
          favicon={config.page.favicon}
          meta={<Meta {...config.page.meta}/>}
          fonts={<fragment>
            <Fonts {...config.page.fonts}/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&display=swap"/>
            <link rel="stylesheet" href="https://unpkg.com/graphis/font/graphis.css"/>
          </fragment>}

          scripts={config.page.scripts}
          stylesheets={[
            ...config.page.stylesheets || [],
            <style>{`
              body, button, input {
                font-family: 'graphis', 'Nunito Sans', sans-serif;
              }

              input {
                color: inherit;
                background: inherit;
                border: 1px solid #7C83FD;
                border-radius: 3px;
                padding: 4px;
                outline: none;
              }

              input[type=search]::-webkit-search-cancel-button {
                -webkit-appearance: input-search-cancel;
              }
            `}</style>
          ]}

          header={<Header {...config}/>}
          footer={<Footer {...config}/>}
          toc={
            <ToC search={
                  config.misc?.github ? 
                  <GithubSearch$
                    repo={config.misc.github.repo} 
                    user={config.misc.github.user}
                    root={config.src.base}
                    pick={config.src.pick.source}
                    drop={config.src.drop.source}
                  /> : false
            }>{toc}</ToC>
          }>
      {_content}
      <ContentNav content={_content}/>
    </Page>
  )
}
