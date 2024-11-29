import { Tokens } from 'marked';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = {
    heading({ tokens, depth }: Tokens.Heading) {
      const text = this.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      const curUrl = `${window.location.origin}${window.location.pathname}`;

      const headingClasses: Map<number, string> = new Map([
        [1, 'text-4xl'],
        [2, 'text-2xl mt-10'],
        [3, 'text-xl mt-8'],
        [4, 'text-lg'],
      ]);

      return `
        <h${depth} class="group flex items-center 
          ${headingClasses.get(depth)} font-medium mb-6"
        >
          <a class="opacity-0 md:group-hover:opacity-70 absolute left-60 p-2 flex"
            id="${escapedText}" href="${curUrl}#${escapedText}"
          >
            <mat-icon class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">link</mat-icon>
          </a>
          ${text}
        </h${depth}>`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      const text = this.parser.parseInline(tokens);
      return `<p class="mb-5">${text}</p>`;
    },
    code({ text, lang }: Tokens.Code) {
      const languageClass = lang ? `language-${lang}` : 'language-none';
      return `<pre class="${languageClass} !my-6" tabIndex="0"><code class="${languageClass}">${encodeHTML(
        text,
      )}</code></pre>`;
    },
    // @ts-ignore: `Codespan` property typo (Duplicate `raw` property and missing `text` property).
    codespan({ text }: Tokens.Codespan) {
      return `<span class="font-mono bg-[--mat-sys-surface-container-highest] text-[--mat-sys-secondary] px-1 rounded">${encodeHTML(
        text,
      )}</span>`;
    },
    list({ items, ordered, start }: Tokens.List) {
      const commonClasses = 'pl-6 leading-8';
      const listTag = ordered
        ? `ol class="list-decimal ${commonClasses}" start="${start}"`
        : `ul class="list-disc ${commonClasses}"`;

      let text = '';
      for (const item of items) {
        text += this.listitem(item);
      }

      return `
        <${listTag}>
          ${text}
        </${listTag}>`;
    },
    listitem({ tokens, task, checked }: Tokens.ListItem) {
      let text = task ? this.checkbox({ checked: !!checked }) : '';
      text += this.parser.parse(tokens).replace('mb-5', '!mb-0');
      return `
        <li class="${task ? 'list-none flex gap-2' : ''}">
          ${text}
        </li>`;
    },
    image({ href, text }: Tokens.Image) {
      return `<img class="my-8" src="${href}" alt="${text}" />`;
    },
    link({ href, text }: Tokens.Link) {
      return `<a class="link !px-0 underline underline-offset-4" href="${href}" target="_blank">${text}</a>`;
    },
    blockquote({ tokens }: Tokens.Blockquote) {
      const text = this.parser.parse(tokens);
      return `
        <div class="flex italic">
          <span class="border-l-4 opacity-70 mb-5 mr-4"></span>
          ${text}
        </div>`;
    },
    table({ header, rows }: Tokens.Table) {
      let text = '';

      let headerText = '';
      for (const cell of header) {
        headerText += this.tablecell(cell);
      }
      text += this.tablerow({ text: headerText });

      for (const row of rows) {
        let rowText = '';
        for (const cell of row) {
          rowText += this.tablecell(cell);
        }
        text += this.tablerow({ text: rowText });
      }

      return `
        <table class="table-auto w-full">
          ${text}
        </table>`;
    },
    tablecell({ tokens, header, align }: Tokens.TableCell) {
      const text = this.parser.parse(tokens).replace('mb-5', '!mb-0');
      return `<td class="py-2 ${header ? 'font-bold' : ''} ${
        align ? `text-${align}` : ''
      }">${text}</td>`;
    },
    tablerow({ text }: Tokens.TableRow) {
      return `<tr class="text-left border-b border-[--mat-sys-outline]">${text}</tr>`;
    },
  } as MarkedRenderer;

  return {
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}

function encodeHTML(str: string): string {
  const charMapping: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;', // For single quotes
  };

  return str.replace(/[&<>"']/g, (char) => charMapping[char]);
}
