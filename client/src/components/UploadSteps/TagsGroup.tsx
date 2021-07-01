import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addTags } from 'store/ducks';
import styled from 'styled-components';

const TagsGroupWrapper = styled.div`
  width: 100%;
  .edit-tag {
    cursor: pointer;
    user-select: none;
    padding: 4px 11px;
    margin-bottom: 8px;
  }
  .tag-input {
    width: 100px;
    vertical-align: top;
    margin-bottom: 8px;
  }
  .site-tag-input {
    width: 100%;
  }
  .site-tag-plus {
    background: #fff;
    border-style: dashed;
    width: 100%;
    text-align: center;
    padding: 4px 11px;
  }
`;

const TagsGroup: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: StoreState) => state.stepsContent.tags);
  const inputRef = useRef<Input | null>(null);
  const editInputRef = useRef<Input | null>(null);
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
    inputRef.current?.focus();
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
    console.log(tags);
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
    <TagsGroupWrapper>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
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
          <Tag className="edit-tag" key={tag} onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={e => {
                console.log('clicked');
                setState(_prev => ({ ..._prev, editInputIndex: index, editInputValue: tag }));
                editInputRef.current?.focus();
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
          ref={inputRef}
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
    </TagsGroupWrapper>
  );
};

export default TagsGroup;
