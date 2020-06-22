import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledH5, StyledInput, StyledCheckbox, StyledButton,
} from 'styles/app';

const SharePopover = ({ visible, setSharePopoverVisible }) => {
  const linkInput = useRef(null);
  const passwordInput = useRef(null);

  const [copyState, setCopyState] = useState(false);
  const [checkedState, setCheckedState] = useState(false);

  const shareLink = 'http://loadinsight.org/dashboards/hce';

  const copyToClipboard = (event) => {
    event.preventDefault();
    linkInput.current.select();
    document.execCommand('copy');
    linkInput.current.blur();
    if (!copyState) setCopyState(true);
  };

  const focusPassword = (event) => {
    if (event.target.checked) {
      passwordInput.current.focus();
    } else {
      setCheckedState(false);
    }
  };

  const title = (
    <StyledH5>
      Share this dashboard
      <CloseOutlined onClick={() => setSharePopoverVisible(false)}>Close</CloseOutlined>
    </StyledH5>
  );

  const content = (
    <Space size={25} direction="vertical">
      <div>
        <StyledInput ref={linkInput} value={shareLink} />
        <StyledButton onClick={copyToClipboard}>{copyState ? 'Copied' : 'Copy Link'}</StyledButton>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <StyledCheckbox
          name="password"
          checked={checkedState}
          onChange={focusPassword}
        >
          Password Protect
        </StyledCheckbox>
        <StyledInput
          ref={passwordInput}
          type="password"
          placeholder="Password"
          shape="round"
          onFocus={() => setCheckedState(true)}
        />
      </form>
    </Space>
  );

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      placement="topLeft"
      onVisibleChange={() => setSharePopoverVisible(!visible)}
      getPopupContainer={(trigger) => trigger}
      visible={visible}
    />
  );
};

SharePopover.propTypes = {
  visible: PropTypes.bool.isRequired,
  setSharePopoverVisible: PropTypes.func.isRequired,
};

export default SharePopover;
