import React, { useState } from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';
import { BucketListItemWrapper, BucketTitleTextWrapper } from './style';
import HoverButton from '../../atoms/hover_button';
import ConfirmDialog from '../../organisms/confirm_dialog';
import Text from '../../atoms/text';

const BucketListItem = ({ bucket }) => {
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const changeHidden = (hidden) => {
    setHidden(!hidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHidden(true);
  };

  const handleClick = () => {
    history.push({
      pathname: `/detail/${bucket.no}`,
      state: { bucket },
    });
  };

  const getButton = () => {
    if (bucket.status === 'G') return <HoverButton handleOpen={handleOpen} text="되돌리기" />;
    if (bucket.status === 'O') return <HoverButton handleOpen={handleOpen} text="포기" />;
    return null;
  };

  return (
    <BucketListItemWrapper
      onMouseOver={() => changeHidden(true)}
      onMouseLeave={() => changeHidden(false)}
    >
      <ListAltIcon className="list-icon" />
      <BucketTitleTextWrapper onClick={handleClick}>
        <Text value={bucket.title} fontSize="16px" />
      </BucketTitleTextWrapper>
      {hidden ? null : getButton()}
      <ConfirmDialog open={open} handleClose={handleClose} bucket={bucket} />
    </BucketListItemWrapper>
  );
};

export default BucketListItem;