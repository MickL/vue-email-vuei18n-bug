import { renderToString } from 'vue/server-renderer';
import type { AllowedComponentProps, Component, VNodeProps } from 'vue';
import { createSSRApp } from 'vue';
import { createI18n } from 'vue-i18n';
import type { Options } from '@vue-email/render';
import { convert } from 'html-to-text';
import { plainTextSelectors, cleanup } from '@vue-email/render';

export type ExtractComponentProps<TComponent> = TComponent extends new () => {
  $props: infer P;
}
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never;

export interface VNode {
  type: string;
  props: {
    style?: Record<string, unknown>;
    children?: string | VNode | VNode[];
    [prop: string]: unknown;
  };
}

export const useRenderEmail = async <T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options?: Options,
) => {
  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const app = createSSRApp(component, props || {});

  const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
      de: {
        hello: 'Hallo Welt!',
      },
      en: {
        hello: 'Hello world!',
      },
    },
  });

  app.use(i18n);

  const markup = await renderToString(app);
  if (options?.plainText) {
    return convert(markup, {
      selectors: plainTextSelectors,
      ...(options?.plainText === true ? options.htmlToTextOptions : {}),
    });
  }

  const doc = `${doctype}${cleanup(markup)}`;

  // TODO: https://github.com/vue-email/vue-email/issues/221
  // if (options && options.pretty) {
  //   return pretty(doc);
  // }

  return doc;
};
