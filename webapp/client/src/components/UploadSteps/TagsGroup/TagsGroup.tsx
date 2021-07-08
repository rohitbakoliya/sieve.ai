import React from 'react';
import { TagsGroupWrapper } from './TagsGroup.style';
import CustomTags from './CustomTags';

const TagsGroup: React.FC = () => {
  return (
    <TagsGroupWrapper>
      <CustomTags />
    </TagsGroupWrapper>
  );
};

export default TagsGroup;
