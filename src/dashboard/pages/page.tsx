import React, { type FC } from 'react';
import beforeAfterIcon from './before-after-icon.png';
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import { appInstances } from "@wix/app-management";
async function getAppInstance() {
  const response = await appInstances.getAppInstance();
  console.log(response)
  return response
}
let editorHref="https://manage.wix.com/editor/"+(await getAppInstance())?.site?.siteId;

const Index: FC = () => {
  getAppInstance() 
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="FlipView Dashboard Page"
          subtitle="Add management capabilities to your app."
          actionsBar={
            <Button
              onClick={() => window.open(editorHref, '_blank')}
              prefixIcon={<Icons.GetStarted />}
            >
              Go to Editor
            </Button>
          }
        />
        <Page.Content>
          <EmptyState
            image={
              <Image borderRadius={'8px'} width="100px" src={beforeAfterIcon} transparent />
            }
            title="Start editing FlipView app"
            subtitle="Learn how to work with FlipView app and how to add functionality to them using on editor."
            theme="page"
          >
            <TextButton
              as="a"
              href={editorHref}
              target="_blank"
              prefixIcon={<Icons.ExternalLink />}
            >
              Go to Editor
            </TextButton>
          </EmptyState>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
