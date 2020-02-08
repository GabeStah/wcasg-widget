import { createStyles, Theme } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
// @ts-ignore
import LogoIcon from 'assets/svg-minified/logo.svg';
import React from 'react';
import { Connector } from 'state/redux/connectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // color: '#fff',
      // minWidth: '200px',
      // height: '50%',
      // width: '50%'
    }
  })
);

const Component = ({ theme }: { theme?: Theme }) => {
  const styles = useStyles(theme);
  return (
    <Link href={'#'}>
      <SvgIcon
        classes={{ root: styles.root }}
        component={LogoIcon}
        color={'primary'}
      />
    </Link>
  );
};

export default Component;
