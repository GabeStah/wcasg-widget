import Utility from '@/utility';
import { createStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { DOMValueType } from 'classes/plugin/action';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '20px',
      margin: '2px',
      opacity: '0.5',
      width: '20px'
    }
  })
);

export const HelpIcon = ({
  id,
  text,
  theme
}: {
  id: string | number;
  text?: string | any;
  theme: Theme;
}) => {
  const classes = useStyles(theme);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Positions popover content element above anchor element.
   *
   * Base Material-ui Popover logic refuses to invoke its built-in positioning, always displaying top-left of viewport.
   */
  const attachToAnchor = () => {
    const selected = document.querySelectorAll(`#popover-${id} div`);
    if (anchorEl && selected && selected.length >= 3) {
      const popoverContent = selected[2];
      const { top, left } = anchorEl.getBoundingClientRect();
      const {
        width: popoverWidth,
        height: popoverHeight
      } = popoverContent.getBoundingClientRect();
      Utility.setNodeValue({
        node: popoverContent,
        type: DOMValueType.Style,
        name: 'top',
        value: `${top - popoverHeight * 2 - 5}px`
      });
      Utility.setNodeValue({
        node: popoverContent,
        type: DOMValueType.Style,
        name: 'left',
        value: `${left - popoverWidth + popoverWidth / 2}px`
      });
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? `popover-${id}` : undefined;

  return (
    <Box style={{position: 'absolute', bottom: 0, right: 0 }}>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onRendered={attachToAnchor}
        onClose={handleClose}
        disableScrollLock={true}
        anchorReference='anchorPosition'
        anchorPosition={{ top: 200, left: 400 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {text
          ? text
          : ''}
      </Popover>
      <Button
        id={`popover-button-${id}`}
        aria-describedby={`popover-${id}`}
        onClick={handleClick}
        style={{
          padding: '0'
        }}
      >
        <HelpOutlineIcon classes={{ root: classes.root }} />
      </Button>
    </Box>
  );
};
