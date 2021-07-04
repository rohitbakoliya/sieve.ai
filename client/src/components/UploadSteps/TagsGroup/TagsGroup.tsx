import React from 'react';
import { TagsGroupWrapper } from './TagsGroup.style';
import SuggestedTags from './SuggestedTags';
import CustomTags from './CustomTags';

const TagsGroup: React.FC = () => {
  return (
    <TagsGroupWrapper>
      <SuggestedTags />
      <br />
      <CustomTags />
    </TagsGroupWrapper>
  );
};

export default TagsGroup;
