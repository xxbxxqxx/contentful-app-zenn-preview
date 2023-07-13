import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { styles } from './ConfigScreen.styles';
import {
  Box, Form, FormControl, Flex, TextInput, Paragraph, Heading
 } from '@contentful/f36-components';

export interface AppInstallationParameters {
  titleFieldName?: string;
  contentFieldName?: string;
}

const ConfigScreen = () => {
  const sdk = useSDK<ConfigAppSDK>();
  const [parameters, setParameters] = useState<AppInstallationParameters>();

  const handleConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();
    return {
      parameters,
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => handleConfigure());
  }, [sdk, handleConfigure]);

  useEffect(() => {
    (async () => {
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();
      currentParameters && setParameters(currentParameters);
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex flexDirection="column" className={styles.container}>
      <Box>
        <Heading as="h2">About Zenn Preview / Zenn Preview について</Heading>
        <Paragraph>
          This is a Contentful App that allows you to preview <a href="https://zenn.dev/">Zenn</a> style output of articles written in a markdown editor.<br />
          It is based on the <a href="https://github.com/zenn-dev/zenn-editor">zenn-editor</a> package and allows you to preview HTML with styling applied, including Zenn's own notation.
          <hr />
          マークダウンエディタで執筆した記事を、<a href="https://zenn.dev/">Zenn</a>風に出力してプレビューできるContentful Appです。<br />
          <a href="https://github.com/zenn-dev/zenn-editor">zenn-editor</a>のパッケージをベースに作られており、
          Zenn独自記法を含むスタイリングが適用されたHTMLをプレビューできます。
        </Paragraph>
      </Box>

      <hr />

      <Form>
        <Heading as="h2">Configuration / 設定</Heading>

        <FormControl isRequired className={styles.formBlock}>
          <FormControl.Label>記事タイトルフィールド (例: <code className={styles.code}>title</code>)</FormControl.Label>
          <TextInput
            value={parameters?.titleFieldName || ""}
            type='text'
            onChange={(e) => setParameters({...parameters, titleFieldName: e.target.value})}
          />
          <FormControl.HelpText>
            記事内で記事タイトルを指すフィールド ID を入力してください。
          </FormControl.HelpText>
        </FormControl>

        <FormControl isRequired className={styles.formBlock}>
          <FormControl.Label>マークダウンエディタフィールド (例: <code className={styles.code}>content</code>)</FormControl.Label>
          <TextInput
            value={parameters?.contentFieldName || ""}
            type='text'
            onChange={(e) => setParameters({...parameters, contentFieldName: e.target.value})}
          />
          <FormControl.HelpText>
            記事内で記事のマークダウンエディタを指すフィールド ID を入力してください。
          </FormControl.HelpText>
        </FormControl>

      </Form>
    </Flex>
  );
};

export default ConfigScreen;