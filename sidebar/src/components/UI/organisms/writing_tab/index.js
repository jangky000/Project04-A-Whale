import React from 'react';
import ReactMarkdown from 'react-markdown';
import LabelContentTab from '../label_content_tab';
import WriteTextPicture from '../../molecules/write_text_picture';
import PreviewTextPicture from '../../atoms/preview_text_picture';

const WritingTab = ({ placeholder, text, changeText, submitText }) => {
  const form = <WriteTextPicture placeholder={placeholder} text={text} changeText={changeText} />;
  const markdown = text ? <ReactMarkdown source={text} /> : '글을 작성해주세요...';
  const preview = <PreviewTextPicture text={markdown} />;
  const tabs = [
    {
      label: '작성',
      content: form,
    },
    {
      label: '미리보기',
      content: preview,
    },
  ];
  return <LabelContentTab tabs={tabs} text={text} submitText={submitText} />;
};

export default WritingTab;
