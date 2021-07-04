import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addTags } from 'store/ducks';
import { CustomTagsContainer } from './TagsGroup.style';
import { Typography } from 'antd';

const { Title } = Typography;

const CustomTags: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: StoreState) => state.stepsContent.tags);
  const [state, setState] = useState({
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  });

  const handleClose = removedTag => {
    const _tags = tags.filter(tag => tag !== removedTag);
    dispatch(addTags(_tags));
  };

  const showInput = () => {
    setState(_prev => ({ ..._prev, inputVisible: true }));
  };

  const handleInputChange = e => {
    setState(_prev => ({ ..._prev, inputValue: e.target.value }));
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      const _tags = [...tags, inputValue];
      dispatch(addTags(_tags));
    }
    setState(_prev => ({
      ..._prev,
      inputVisible: false,
      inputValue: '',
    }));
  };

  const handleEditInputChange = e => {
    setState(_prev => ({ ..._prev, editInputValue: e.target.value }));
  };

  const handleEditInputConfirm = () => {
    setState(({ editInputIndex, editInputValue, ...rest }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      dispatch(addTags(newTags));
      return {
        ...rest,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  const { inputVisible, inputValue, editInputIndex, editInputValue } = state;

  return (
    <CustomTagsContainer>
      <Title level={5}>Add Custom Tags:</Title>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={node => node?.focus()}
              key={tag}
              size="middle"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag className="edit-tag" key={tag} closable onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={e => {
                setState(_prev => ({ ..._prev, editInputIndex: index, editInputValue: tag }));
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}

      <br />
      <br />
      {inputVisible && (
        <Input
          ref={node => node?.focus()}
          type="text"
          size="middle"
          className="site-tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </CustomTagsContainer>
  );
};

export default CustomTags;
