import { Tag } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { SuggestedTagsContainer } from './TagsGroup.style';

const { Title } = Typography;
const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const SuggestedTags: React.FC = () => {
  const suggestedTags = tagsData;
  // useSelector((state: StoreState) => state.stepsContent.suggestedTags);
  const [selectedTags, setSelectedTags] = useState([...suggestedTags]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <SuggestedTagsContainer>
      {suggestedTags && <Title level={5}>Suggested Tags:</Title>}
      {suggestedTags.map(tag => (
        <Tag
          key={tag}
          className="edit-tag"
          closable
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </Tag>
      ))}
    </SuggestedTagsContainer>
  );
};
export default SuggestedTags;
