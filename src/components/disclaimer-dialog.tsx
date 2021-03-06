import { DialogComponentParams } from '@/types';
import { Link, SvgIcon } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import { ReactComponent as CloseIcon } from 'assets/svg-minified/accessibility-icons/close.svg';
import config from 'config';
import LZString from 'lz-string';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// @ts-ignore
import WcasgDisclaimer from 'WcasgDisclaimer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeIcon: {
      cursor: 'pointer',
      float: 'right',
      fill: theme.palette.text.primary,
      height: '20px',
      width: '20px',
      marginLeft: 'auto'
    },
    headerTypography: {
      color: theme.palette.text.primary
    },
    iframe: {
      minHeight: '500px',
      minWidth: '500px'
    },
    statementTypography: {
      '& h2, & p': {
        color: theme.palette.common.black
      }
    }
  })
);

export const DisclaimerDialog = ({ state, theme }: DialogComponentParams) => {
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  let statementElement;
  if (WcasgDisclaimer) {
    statementElement = (
      <div
        dangerouslySetInnerHTML={{
          // @ts-ignore
          __html: LZString.decompressFromBase64(WcasgDisclaimer)
        }}
      />
    );
  } else {
    statementElement = <p>Disclaimer goes here.</p>;
  }

  return (
    <div style={{ padding: '0 10px' }}>
      <Button onClick={handleClickOpen('paper')}>Disclaimer</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title' disableTypography={true}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant={'h1'} className={classes.headerTypography}>
                Disclaimer
              </Typography>
            </Grid>
            <Grid item xs>
              <SvgIcon
                className={classes.closeIcon}
                component={CloseIcon}
                onClick={handleClose}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            color={'primary'}
            variant={'body2'}
            classes={{ root: classes.statementTypography }}
          >
            {statementElement}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DisclaimerDialog;
