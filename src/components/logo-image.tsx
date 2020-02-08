import { createStyles, Theme } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
// @ts-ignore
import LogoImage from 'assets/images/nasa-CpHNKNRwXps-unsplash.jpg';
import React from 'react';
import { Connector } from 'state/redux/connectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // color: '#fff',
      // minWidth: '200px',
      // width: '100%'
      height: '50%',
      width: '50%'
    }
  })
);

const Component = ({ theme }: { theme?: Theme }) => {
  const styles = useStyles(theme);
  return (
    <Link href={'#'}>
      <img src={LogoImage} alt='Logo' />
    </Link>
  );
};

export default Component;
