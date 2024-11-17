import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.heading = (text: string, level: number, raw: string) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    const curUrl = `${window.location.origin}${window.location.pathname}`;

    const headingClasses: Map<number, string> = new Map([
      [1, '!text-4xl'],
      [2, '!text-2xl !mt-12'],
      [3, '!text-xl'],
      [4, '!text-lg'],
    ]);

    return `
      <h${level} class="group flex items-center 
        ${headingClasses.get(level)} !font-medium !mb-6"
      >
        <a class="opacity-0 md:group-hover:opacity-70 absolute left-60 p-2 flex"
          id="${escapedText}" href="${curUrl}#${escapedText}"
        >
          <mat-icon class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">link</mat-icon>
        </a>
        ${text}
      </h${level}>`;
  };

  renderer.paragraph = (text: string) => {
    return `<p class="!mb-5">${text}</p>`;
  };

  renderer.code = (code: string, info: string) => {
    const languageClass = info ? `language-${info}` : 'language-none';
    return `<pre class="${languageClass} !my-6" tabIndex="0"><code class="${languageClass}">${encodeHTML(
      code
    )}</code></pre>`;
  };

  renderer.codespan = (text: string) => {
    return `<span class="font-mono text-blue-500">\`${text}\`</span>`;
  };

  renderer.list = (body: string, ordered: boolean, start: number | '') => {
    const commonClasses = 'pl-6 my-2 leading-8';
    const listTag = ordered
      ? `ol class="list-decimal ${commonClasses}" start="${start}"`
      : `ul class="list-disc ${commonClasses}"`;
    return `
      <${listTag}>
        ${body}
      </${listTag}>`;
  };

  renderer.listitem = (text: string, task: boolean) => {
    return `
      <li class="${task ? 'list-none' : ''}">
        ${text}
      </li>`;
  };

  renderer.image = (href: string, title: string | null, text: string) => {
    return `<img class="my-8" src="${href}" alt="${text}" />`;
  };

  renderer.link = (href: string, title: string | null, text: string) => {
    return `<a class="mat-mdc-button !px-0 underline underline-offset-4" href="${href}">${text}</a>`;
  };

  renderer.blockquote = (quote: string) => {
    return `
      <div class="flex italic">
        <span class="border-l-4 opacity-70 mb-5 mr-4"></span>
        "${quote}"
      </div>`;
  };

  renderer.table = (header: string, body: string) => {
    return `
      <table class="table-auto w-full">
        ${header}
        ${body}
      </table>`;
  };

  renderer.tablerow = (content: string) => {
    return `<tr class="text-left border-b border-white/40">${content}</tr>`;
  };

  renderer.tablecell = (
    content: string,
    flags: { header: boolean; align: 'center' | 'left' | 'right' | null }
  ) => {
    return `<td class="py-2 ${flags.header ? 'font-bold' : ''} ${
      flags.align ? `text-${flags.align}` : ''
    }">${content}</td>`;
  };

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
