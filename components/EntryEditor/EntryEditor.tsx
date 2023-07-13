import React, { useState, useEffect }  from 'react';
import Script from 'next/script'
import { EditorAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import markdownHtml from 'zenn-markdown-html';
import { styles } from './EntryEditor.styles';
import {
  Heading, Stack, Box, Badge, TextLink
} from '@contentful/f36-components';
import {
  ExternalLinkIcon
} from '@contentful/f36-icons';

const Entry = () => {
  const sdk = useSDK<EditorAppSDK>();
  const { contentFieldName, titleFieldName } = sdk.parameters.installation;
  const [titlePreview, setTitlePreview] = useState<string>();
  const [contentPreview, setContentPreview] = useState<string>("Content here...");

  useEffect(() => {
    const titleField = sdk.entry.fields[titleFieldName];
    titleField && setTitlePreview(titleField.getValue());
    
    const contentField = sdk.entry.fields[contentFieldName];
    if(contentField){
      const html = markdownHtml(contentField.getValue(), {
        embedOrigin: "https://embed.zenn.studio",
      })
      setContentPreview(html);
    }
  }, [sdk]);

  return (
  <>
    <Script
      src="https://embed.zenn.studio/js/listen-embed-event.js"
      strategy="lazyOnload"
    />

    <Stack
      flexDirection="column"
      alignItems="start"
      padding="spacingM"
      className={styles.container}
    >

      <Heading marginBottom="spacingXl" className={styles.title}>
        {titlePreview}
      </Heading>

      <Box
        className="znc"
        dangerouslySetInnerHTML={{
          __html: contentPreview,
        }}
      />

      <Badge
        variant="primary"
        className={styles.reference}
      >
        <TextLink
            icon={<ExternalLinkIcon />}
            alignIcon="end"
            href="https://zenn.dev/zenn/articles/markdown-guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            Markdown記法一覧
          </TextLink>
      </Badge>
    </Stack>
  </>
  );
};

export default Entry;
